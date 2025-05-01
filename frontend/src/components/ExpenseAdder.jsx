import "./style.css";
import { useState, useEffect } from "react";
import { supabase } from "../superbaseClient";
import {ToastContainer, toast}  from "react-toastify"

const ExpenseAdder = () => {
    const [expense, setExpense] = useState({
        expenseName: "",
        expenseAmount: "",
        expenseCategory: "",
        expenseDate: "",
        expenseNote: "",
    });

    const [userId, setUserId] = useState("");

    // ✅ Get user_id from Supabase session
    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const response = await supabase.auth.getSession();
            console.log("hehe:",response)
            if (session?.user) {
                console.log("Supabase User ID:", session.user.id);
                setUserId(session.user.id);
            } else {
                console.log("User is not authenticated");
                // toast.error("User not authenticated!");
            }
        };

        getUser();
    }, []);

    const handleChange = (event) => {
        setExpense({ ...expense, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            console.log("User ID is missing!");
            return;
        }

        try {
            console.log("Adding expense:", expense);

            const newExpense = {
                user_id: userId,
                name: expense.expenseName,
                amount: parseFloat(expense.expenseAmount),
                category: expense.expenseCategory,
                note: expense.expenseNote || "",
                created_at: new Date().toISOString(),
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

            console.log("Expense added successfully!");
            // toast.success("Expense added successfully!");
            toast.success("Expense added sucessfully!")
        } catch (err) {
            console.error("Error adding expense:", err.message);
            console.log("Oops! There was some error")
            // toast.error("Failed to add expense.");
        }
    };

    return (
        <div className="container">
            <ToastContainer/>
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
                <input type="date" name="expenseDate" value={expense.expenseDate} onChange={handleChange}/>
                <input type="text" name="expenseNote" placeholder="Optional Note" value={expense.expenseNote} onChange={handleChange} />
                <button type="submit">Add Expense</button>
            </form>
        </div>
    );
};

export default ExpenseAdder;
