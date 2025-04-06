// const express = require("express")
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const User = require("../models/user"); // Ensure you have a User model
// const bcrypt = require("bcrypt");
// const {checkExistingUser, isLoggedIn} = require("../middleware")
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// const supabase = require("@supabase/supabase-js").createClient(
//   process.env.SUPABASE_URL, 
//   process.env.SUPABASE_ANON_KEY
// );


// passport.use(
//     new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
//       try {
//         // Find user in the database
//         const user = await User.findOne({ email });
  
//         // If user not found
//         if (!user) {
//           return done(null, false, { message: "User not found" });
//         }
  
//         // Check password (assuming passwords are hashed using bcrypt)
//         const isMatch = await bcrypt.compare(password, user.password);
  
//         if (!isMatch) {
//           return done(null, false, { message: "Incorrect password" });
//         }
  
//         // If credentials are correct, return the user
//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     })
//   );
//   passport.serializeUser((user, done) => {
//     done(null, user.id); // Store only the user ID in the session
//   });
  
//   passport.deserializeUser(async (id, done) => {
//     try {
//       const user = await User.findById(id);
//       done(null, user); // Retrieve full user data using ID
//     } catch (error) {
//       done(error, null);
//       console.log(error)
//     }
//   });


// //routes setup
// router.get("/test", (req, res) => {
//   res.json({message: "Hey this one typically works"})
// })

// router.post("/signup", checkExistingUser, async (req, res) => {
//   try {
//     const { username, email, password} = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10); // ✅ Add 'await'
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword, // ✅ Fix field name from 'passport' to 'password'
//     });
    
//     await newUser.save(); // ✅ Ensure `await` is used

//     res.status(201).json({ message: "User created successfully" });
//   } catch (err) {
//     console.error("Signup error:", err); // ✅ Log actual error
//     res.status(500).json({ message: "Internal Server Error", error: err.message });
//   }
// });

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find the user in the database
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Generate a JWT
//     const token = jwt.sign(
//       { id: user._id, email: user.email }, // Payload
//       process.env.JWT_SECRET, // Secret key from .env
//       { expiresIn: process.env.JWT_EXPIRES_IN || "2h" } // Token expiration
//     );
//     //supabase setup
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password
//     });

//     if (error) {
//       console.error("Supabase login error:", error.message);
//       return res.status(500).json({ message: "Supabase auth failed", error: error.message });
//     }
//     // Respond with the token and user info
//     res.json({
//       message: "Login successful",
//       token,
//       supabaseSession: data.session, 
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// });
// router.get("/logout", (req, res) => {
//   req.logout();
//   res.json({ message: "Logged out successfully" });
// });

// module.exports = router; 
const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

// Load environment variables
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Supabase URL or Key is missing. Check your .env file.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const router = express.Router();

// Passport Strategy for Supabase
passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) return done(null, false, { message: "Invalid credentials" });

      return done(null, data.user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const { data, error } = await supabase.auth.getUser(id);
    if (error) return done(error, null);
    done(null, data.user);
  } catch (error) {
    done(error, null);
  }
});

// Test Route
router.get("/test", (req, res) => res.json({ message: "Hey, this works with Supabase!" }));

//Signup Route (Supabase Only)
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error("Supabase signup error:", error.message);
      return res.status(500).json({ message: "Supabase signup failed", error: error.message });
    }

    res.status(201).json({ message: "User created successfully in Supabase", user: data.user });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Login Route (Supabase Only)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error("Supabase login error:", error.message);
      return res.status(401).json({ message: "Invalid credentials", error: error.message });
    }

    res.json({ message: "Login successful", user: data.user, session: data.session });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

//  Logout Route
router.post("/logout", async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
      return res.status(500).json({ message: "Logout failed", error: error.message });
    }

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
