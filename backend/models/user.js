const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//not used not 
const userSchema = new Schema({
    username: {
        required: true,
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
      },
    password: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model("User", userSchema);