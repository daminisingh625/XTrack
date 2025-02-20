const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const customExpense = Schema({
    expenseName: {
        type: String,
        required: true
    },
    expenseAmount:{
        type: Number,
        required: true
    },
    expenseCategory:{
        type: String,
        required: true
    },
    expenseDate: {
        type: Date,
        required: true,
    }
})

module.exports = mongoose.model("customExpense", customExpense);