import { MdDashboard, MdCommentBank, MdCategory } from "react-icons/md";
import '../views/sidebar.css'
import { FaMoneyBillWave,  FaCalendarAlt} from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { FaReceipt } from "react-icons/fa6";
import { TiArrowLoopOutline } from "react-icons/ti";

export default function Sidebar() {
    return(
        <div className='sidebar'>
            <div className='sidebar_manu'>
                <ul>

             
             <li>
                <a href="#"><MdDashboard size={20}/>
                Dashboard
                </a>
            </li>
                      
                <li><a href='#'><FaMoneyBillWave size={20} />Add Expance</a></li>

                <li><a href="#"><MdCommentBank size={20}/>Bank Details</a></li> 
               <li><a href="#"><TbReportAnalytics size={20}/>Reports & Analytics</a></li>
               <li><a href="#"><FaCalendarAlt size={20}/>Budget Planner</a></li>
               <li><a href="#"><FaReceipt size={20}/>Bill Reminders</a></li>
                <li><a href="#"><MdCategory size={20}/>Categories</a></li>
                <li><a href="#"><TiArrowLoopOutline size={20}/>Recurring Expenses</a></li>
                </ul>
            </div>
        </div>
    );
}