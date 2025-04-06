import RecentExpenses from "./RecentExpenses";
import Overview from "./Overview";
import "../views/dashboard.css";
import PieReport from "./PieReport";

export default function Dashboard(){
    return <>
    <div className="main-dashboard">
    <Overview/>
    <RecentExpenses/>
    <PieReport/>
    </div>
   
    
    </>
}