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
      console.log("user found");

      if (!user) {
        navigate("/login");
      } else {
        setUserName(user.email); 
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

