import "../App.css"
import {Routes, Route} from 'react-router-dom'
import Dashboard from "./Dashboard"
import ExpenseAdder from "./ExpenseAdder"
import BankDetails from "./BankDetails"
import RecurringExpense from "./RecurringExpense"
import BudgetPlanner from "./BudgetPlanner"
import Reports from "./Reports"
import Categories from "./Categories"
import BillReminders from "./Billreminders"
export default function Body(){
    return (
        <div className="body">
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="add-expense" element={<ExpenseAdder/>}/>
                <Route path="bank-details" element={<BankDetails/>}/>
                <Route path="/reports" element={<Reports/>}/>
                <Route path="/budget-planner" element={<BudgetPlanner/>}/>
                <Route path="/bill-reminders" element={<BillReminders/>}/>
                <Route path="/categories" element={<Categories/>}/>
                <Route path="/recurring-expenses" element={<RecurringExpense/>}/>

            </Routes>
            <button>Dude</button>
        </div>
    )
}