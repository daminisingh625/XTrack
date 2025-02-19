const express = require("express")
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user"); // Ensure you have a User model
const bcrypt = require("bcrypt");
const {checkExistingUser, isLoggedIn} = require("../middleware")
const router = express.Router();
const jwt = require("jsonwebtoken")


passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        // Find user in the database
        const user = await User.findOne({ email });
  
        // If user not found
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
  
        // Check password (assuming passwords are hashed using bcrypt)
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password" });
        }
  
        // If credentials are correct, return the user
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id); // Store only the user ID in the session
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user); // Retrieve full user data using ID
    } catch (error) {
      done(error, null);
      console.log(error)
    }
  });


//routes setup
router.get("/test", (req, res) => {
  res.json({message: "Hey this one typically works"})
})

router.post("/signup", checkExistingUser, async (req, res) => {
  try {
    const { username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // ✅ Add 'await'
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // ✅ Fix field name from 'passport' to 'password'
    });
    
    await newUser.save(); // ✅ Ensure `await` is used

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err); // ✅ Log actual error
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ email });
    // console.log(user)
    // If user not found
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT
    const token = jwt.sign(
      { id: user._id, email: user.email }, // Payload
      process.env.JWT_SECRET, // Secret key from .env
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" } // Token expiration
    );

    // Respond with the token and user info
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});


module.exports = router; 