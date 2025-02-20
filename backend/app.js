require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const session = require("express-session")
const passport = require("passport");
const userAuth = require("./routes/userAuth")
const addExpense = require("./routes/addExpense")


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/ExpenseTracker");
}
main()
.then(()=>{
    console.log("MongoDB connected successfully!!");
})
.catch((e) => {
    console.log(e);
})

const port = 3000;

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(
    session({
      secret: "your_secret_key", // Change this to a strong secret
      resave: false,
      saveUninitialized: false,
    })
  );
 
app.use(passport.initialize());
app.use(passport.session());

app.use("/", userAuth)
app.use("/user", addExpense )

app.get("/test", (req, res) => {
    res.json({message: "This is the message"})
})
app.listen(port, () =>{
    console.log("App is listening on port :", port);
})
