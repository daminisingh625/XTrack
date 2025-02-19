
const User = require("./models/user"); // Make sure the path is correct

// Middleware to check if the user already exists
async function checkExistingUser(req, res, next) {
    try {
        const { email } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        next(); // Move to the next middleware or route handler
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err });
    }
}

// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: "Unauthorized: Please log in" });
}

module.exports = { checkExistingUser, isLoggedIn };
