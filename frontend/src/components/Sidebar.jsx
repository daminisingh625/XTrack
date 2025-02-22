import { MdDashboard, MdCommentBank, MdCategory } from "react-icons/md";
import '../views/sidebar.css'
import { FaMoneyBillWave,  FaCalendarAlt} from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { FaReceipt } from "react-icons/fa6";
import { TiArrowLoopOutline } from "react-icons/ti";
import {Link} from 'react-router-dom'

export default function Sidebar() {
    return(
        <div className='sidebar'>
            <div className='sidebar_manu'>
                <ul>

             <Link to="/">
             <li>
                <a href="#"><MdDashboard size={20}/>
                Dashboard
                </a>
            </li>
             </Link>
             
                      
                <Link to="add-expense">
                <li>
                    <a href='#'><FaMoneyBillWave size={20} />
                    Add Expance
                    </a>
                </li>
                </Link>

                <Link to="/bank-details">
                <li>
                    <a href="#"><MdCommentBank size={20}/>
                    Bank Details
                    </a>
                </li> 
                </Link>
               <Link to="/reports">
               <li>
                   <a><TbReportAnalytics size={20}/>
                    Reports & Analytics
                   </a>
                </li>
               </Link>
                <Link to="/budget-planner">
                <li>
                   <a><FaCalendarAlt size={20}/>
                   Budget Planner
                   </a>
                </li>
                </Link>
                <Link to="bill-reminders">
                <li>
                    <a href="#"><FaReceipt size={20}/>
                    Bill Reminders
                    </a>
                </li>
                </Link>
                <Link to="/categories">
                <li>
                    <a href="#"><MdCategory size={20}/>
                    Categories
                    </a>
                </li>
                </Link>
                <Link to="/recurring-expenses">
                <li>
                    <a href="#"><TiArrowLoopOutline size={20}/>
                    Recurring Expenses
                    </a>
                </li>
                </Link>

                </ul>
            </div>
        </div>
    );
}