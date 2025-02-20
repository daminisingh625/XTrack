import "./style.css";
import axios from "axios";
import { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExpenseTable from "./ExpenseTable";
const ExpenseAdder = () => {
    const [expense, setExpense] = useState({});
    const handleChange = (event) =>{
        event.preventDefault();
        setExpense({...expense, [event.target.name]: event.target.value});
    }
   
    const handleSubmit = (e)=>{
        e.preventDefault();
        try{
            console.log("I am triggered:" , expense);
        const res = axios.post("http://localhost:3000/user/addexpense", expense);
        toast.success("Hey!! your expense was added")
        }catch(err){
            console.log("There was an error while adding the expense to database:", err)
            toast.failure("There was a problem in adding the expense")
        }
    }
    return (
        <div className="container">
            <h1>Expense Tracker</h1>
            <form id="expense-form" method="POST" onSubmit={handleSubmit}>
                <input type="text" id="expense-name" placeholder="Expense Name" name="expenseName" onChange={handleChange} required />
                <input type="number" id="expense-amount" className="expense-category" name="expenseAmount" placeholder="Amount" onChange={handleChange} required />
                <select id="expense-category" name="expenseCategory" onChange={handleChange} value={expense.expenseCategory || ""} required>
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
         </select>

               <input type="date" id="expense-date" name="expenseDate" onChange={handleChange} required />
                <button type="submit">Add Expense</button>
            </form>
            <ExpenseTable/>
        </div>
    );
}

export default ExpenseAdder;
