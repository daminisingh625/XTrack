 import "./style.css";
import { useState, useEffect } from "react";
import { supabase } from "../superbaseClient"; // Ensure correct import
import "react-toastify/dist/ReactToastify.css";

const ExpenseAdder = () => {
    const [expense, setExpense] = useState({
        expenseName: "",
        expenseAmount: "",
        expenseCategory: "",
        expenseDate: "",
        expenseNote: "",
    });

    const [userId, setUserId] = useState("");

    // Get user_id from localStorage when component loads
    useEffect(() => {
        const storedUserId = localStorage.getItem("user_id");
        console.log("User ID:", storedUserId);
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            console.log("User is not authenticated")
            // toast.error("User not authenticated!");
        }
    }, []);

    const handleChange = (event) => {
        setExpense({ ...expense, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            // toast.error("User ID is missing!");
            return;
        }

        try {
            console.log("Adding expense:", expense);

            const newExpense = {
                user_id: userId, // ✅ Ensuring user_id is included
                name: expense.expenseName, // ✅ Matching input field names
                amount: parseFloat(expense.expenseAmount), // Convert to number
                category: expense.expenseCategory,
                note: expense.expenseNote || "",
                created_at: new Date().toISOString(), // ✅ Correct timestamp
            };

            const { data, error } = await supabase
                .from("Expenses") 
                .insert([newExpense]);

            if (error) throw error;

            setExpense({
                expenseName: "",
                expenseAmount: "",
                expenseCategory: "",
                expenseDate: "",
                expenseNote: "",
            });

            // toast.success("Expense added successfully!");
        } catch (err) {
            console.error("Error adding expense:", err.message);
            // toast.error("Failed to add expense.");
        }
    };

    return (
        <div className="container">
            <h1>Add Expense</h1>
            <form id="expense-form" method="POST" onSubmit={handleSubmit}>
                <input type="text" placeholder="Expense Name" name="expenseName" value={expense.expenseName} onChange={handleChange} required />
                <input type="number" name="expenseAmount" placeholder="Amount" value={expense.expenseAmount} onChange={handleChange} required />
                <select name="expenseCategory" value={expense.expenseCategory} onChange={handleChange} required>
                    <option value="" disabled>Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Bill">Bill</option>
                    <option value="Rent">Rent</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Health">Health</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Others">Others</option>
                </select>
                <input type="date" name="expenseDate" value={expense.expenseDate} onChange={handleChange} required />
                <input type="text" name="expenseNote" placeholder="Optional Note" value={expense.expenseNote} onChange={handleChange} />
                <button type="submit" onSubmit={handleSubmit}>Add Expense</button>
            </form>
        </div>
    );
};

export default ExpenseAdder;
