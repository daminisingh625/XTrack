import "../App.css";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { CiSun } from "react-icons/ci";
import { FaRegMoon } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

export default function Navbar() {
    const navigate = useNavigate();
    const handleLogout= async() => {
        try {
            // Optionally call the backend route to logout (if needed)
            await axios.get("http://localhost:5173/user/logout");
      
            // Clear the localStorage to remove the token and user
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
      
            // Navigate to the login page
            navigate("/signin");
      
            console.log("User logged out successfully.");
            toast.success("Signed out successfully!")
          } catch (error) {
            console.error("Error logging out:", error);
            toast.error("There was an error!")
          }
    }
  return(
    <>
    <ToastContainer/>
        <div id="navbar">
            <div className="logo-container">
                <p>XTrack</p>
            </div>
            <div className="nav-links">
                <div className="icons">
                <button className="nav-icons"><FaRegBell/></button>
            <button className="nav-icons"><CiSun/></button>
            <button className="nav-icons"><FaRegMoon/></button>
                </div>
             <Link to="/signin"><button>Sign in</button></Link>
             <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </>
  )
}