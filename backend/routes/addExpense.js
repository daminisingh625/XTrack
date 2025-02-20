const express = require("express");
const router = express.Router();
const {isLoggedIn} = require("../middleware")
const customExpense = require("../models/customExpense");
const { rawListeners } = require("../models/user");

router.get("/expenses", async (req, res) => {
    try {
      // Fetch all expenses from the database
      const expenses = await customExpense.find();
      console.log(expenses);  // Debugging
      if (!expenses) {
        return res.status(404).json({ message: "No expenses found" });
      }
      res.status(200).json(expenses);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      res.status(500).json({ message: "Error fetching expenses from the database", error: error.message });
    }
});

  

router.post("/addexpense",async(req, res) =>{
    const {expenseName, expenseAmount, expenseCategory, expenseDate} = req.body;
    const newExpense = new customExpense({
        expenseName,
        expenseAmount, 
        expenseCategory, 
        expenseDate 
    })
    await newExpense.save();
    res.status(200).send("Expense saved successfully");
})
module.exports = router;