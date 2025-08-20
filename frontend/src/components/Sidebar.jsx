import { MdDashboard, MdCommentBank, MdCategory } from "react-icons/md";
import '../views/sidebar.css';
import { FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { FaReceipt } from "react-icons/fa6";
import { TiArrowLoopOutline } from "react-icons/ti";
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebar_menu'>
                <ul>

                    <div className="link_space">
                        <Link to="/dashboard">
                            <li><MdDashboard size={20} /> Dashboard</li>
                        </Link>
                    </div>

                    <div className="link_space">
                        <Link to="/add-expense">
                            <li><FaMoneyBillWave size={20} /> Add Expense</li>
                        </Link>
                    </div>

                    <div className="link_space">
                        <Link to="/bank-details">
                            <li><MdCommentBank size={20} /> Bank Details</li>
                        </Link>
                    </div>

                    <div className="link_space">
                        <Link to="/reports">
                            <li><TbReportAnalytics size={20} /> Reports & Analytics</li>
                        </Link>
                    </div>

                    <div className="link_space">
                        <Link to="/budget-planner">
                            <li><FaCalendarAlt size={20} /> Budget Planner</li>
                        </Link>
                    </div>

                    <div className="link_space">
                        <Link to="/bill-reminders">
                            <li><FaReceipt size={20} /> Bill Reminders</li>
                        </Link>
                    </div>

                    <div className="link_space">
                        <Link to="/categories">
                            <li><MdCategory size={20} /> Categories</li>
                        </Link>
                    </div>

                    <div className="link_space">
                        <Link to="/recurring-expenses">
                            <li><TiArrowLoopOutline size={20} /> Recurring Expenses</li>
                        </Link>
                    </div>

                </ul>
            </div>
        </div>
    );
}
