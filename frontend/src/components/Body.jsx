// // import "../App.css";
// // import { useState, useEffect } from "react";
// // import { Routes, Route } from "react-router-dom";
// // import ExpenseAdder from "./ExpenseAdder";
// // import Dashboard from "../components/Dashboard";
// // import BankDetails from "./BankDetails";
// // import RecurringExpense from "./RecurringExpense";
// // import BudgetPlanner from "./BudgetPlanner";
// // import Reports from "./Reports";
// // import Categories from "./Categories";
// // import BillReminders from "./Billreminders";
// // import MainSection from "../../pages/MainSection";

// // export default function Body() {
// //   const [userName, setUserName] = useState();

// //   useEffect(() => {
// //     const user = localStorage.getItem("username");
// //     console.log(user);
// //     setUserName(user);
// //   }, []);

// //   return (
// //     <div className="body">
// //       <div className="main-body">
// //         <Routes>
// //           <Route path="/dashboard" element={<Dashboard />} />
// //           <Route path="/add-expense" element={<ExpenseAdder />} />
// //           <Route path="/bank-details" element={<BankDetails />} />
// //           <Route path="/reports" element={<Reports />} />
// //           <Route path="/budget-planner" element={<BudgetPlanner />} />
// //           <Route path="/bill-reminders" element={<BillReminders />} />
// //           <Route path="/categories" element={<Categories />} />
// //           <Route path="/recurring-expenses" element={<RecurringExpense />} />
// //         </Routes>
// //       </div>
// //     </div>
// //   );
// // }
// import "../App.css";
// import { useState, useEffect } from "react";
// import { Routes, Route, useNavigate } from "react-router-dom";
// import ExpenseAdder from "./ExpenseAdder";
// import Dashboard from "../components/Dashboard";
// import BankDetails from "./BankDetails";
// import RecurringExpense from "./RecurringExpense";
// import BudgetPlanner from "./BudgetPlanner";
// import Reports from "./Reports";
// import Categories from "./Categories";
// import BillReminders from "./Billreminders";

// export default function Body() {
//   const navigate = useNavigate();
//   const [userName, setUserName] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const user = storedUser ? JSON.parse(storedUser) : null;
//     console.log(user);

//     if (!user) {
//       // No user? Redirect to signin
//       navigate("/signin");
//     } else {
//       setUserName(user.name || user.username); // adjust according to your stored object
//     }
//   }, [navigate]);

//   return (
//     <div className="body">
//       <div className="main-body">
//         <Routes>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/add-expense" element={<ExpenseAdder />} />
//           <Route path="/bank-details" element={<BankDetails />} />
//           <Route path="/reports" element={<Reports />} />
//           <Route path="/budget-planner" element={<BudgetPlanner />} />
//           <Route path="/bill-reminders" element={<BillReminders />} />
//           <Route path="/categories" element={<Categories />} />
//           <Route path="/recurring-expenses" element={<RecurringExpense />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "../superbaseClient.js"; 

import ExpenseAdder from "./ExpenseAdder";
import Dashboard from "../components/Dashboard";
import BankDetails from "./BankDetails";
import RecurringExpense from "./RecurringExpense";
import BudgetPlanner from "./BudgetPlanner";
import Reports from "./Reports";
import Categories from "./Categories";
import BillReminders from "./Billreminders";

export default function Body() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      console.log(user);

      if (!user) {
        navigate("/signin");
      } else {
        setUserName(user.email); // or user.user_metadata.name if you stored name
      }
    };

    getUser();
  }, [navigate]);

  return (
    <div className="body">
      <div className="main-body">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-expense" element={<ExpenseAdder />} />
          <Route path="/bank-details" element={<BankDetails />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/budget-planner" element={<BudgetPlanner />} />
          <Route path="/bill-reminders" element={<BillReminders />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/recurring-expenses" element={<RecurringExpense />} />
        </Routes>
      </div>
    </div>
  );
}

