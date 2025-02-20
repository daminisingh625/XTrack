// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function ExpenseTable() {
//     const [expenses, setExpenses] = useState([]);

//     // Fetch expenses from the backenda
//     const fetchExpenses = async () => {
//         try {
//             const response = await axios.get("http://localhost:3000/user/expenses"); // Update URL as needed
//             setExpenses(response.data); // Assuming response.data contains the expenses array
//         } catch (error) {
//             console.error("Error fetching expenses:", error);
//         }
//     };

//     // Fetch expenses initially and set up polling for real-time updates
//     useEffect(() => {
//         fetchExpenses(); // Fetch data initially
//         const interval = setInterval(() => {
//             fetchExpenses(); // Fetch data every 5 seconds
//         }, 5000);

//         return () => clearInterval(interval); // Clean up the interval on component unmount
//     }, []);

//     return (
//         <>
//             <div className="expense-table-container">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Description</th>
//                             <th>Amount</th>
//                             <th>Date</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {expenses.length > 0 ? (
//                             expenses.map((expense) => (
//                                 <tr key={expense.id}>
//                                     <td>{expense.id}</td>
//                                     <td>{expense.description}</td>
//                                     <td>{expense.amount}</td>
//                                     <td>{new Date(expense.date).toLocaleDateString()}</td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="4">No expenses found</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

export default function ExpenseTable() {
  const [expenses, setExpenses] = useState([]); // State to hold the expenses

  // Fetch expenses from the backend
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/expenses"); // Fetch data from the backend
        setExpenses(res.data); // Set the fetched expenses to state
        console.log("The response data:", res.data);
      } catch (error) {
        console.error("There was an error fetching the expenses!", error);
      }
    };

    fetchExpenses(); // Call the function to fetch the expenses
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <>
      <div className="expense-table">
        <table>
          <thead>
            <tr>
              <th>Expense Name</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense._id}> {/* Use unique id from the expense */}
                <td>{expense.expenseName}</td>
                <td>{expense.expenseAmount}</td>
                <td>{expense.expenseCategory}</td>
                <td>{new Date(expense.expenseDate).toLocaleDateString()}</td>
                <td><button>Delete</button></td> {/* Add delete button if needed */}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-amount">
          <strong>Total:</strong> &#8377;{" "}
          {expenses.reduce((total, expense) => total + expense.expenseAmount, 0)}
        </div>
      </div>
      <div className="filter">
        <label htmlFor="filter-category">Filter by Category:</label>
        <select id="filter-category" className="expense-category">
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Bill">Bill</option>
          <option value="Rent">Rent</option>
          <option value="Clothing">Clothing</option>
          <option value="Health">Health</option>
          <option value="Insurance">Insurance</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </>
  );
}
