import ExpenseAdder from "./ExpenseAdder";
import ExpenseTable from "./ExpenseTable";
import "./style.css"
export default function Dashboard(){
    return (
    <>
    <div className="dashboard-container">
    <ExpenseAdder/>
    </div>
   
    </>
    )
}