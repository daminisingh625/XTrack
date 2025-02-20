import "../App.css";
import { Link } from "react-router-dom";
import { CiSun } from "react-icons/ci";
import { FaRegMoon } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";

export default function Navbar() {
  return(
    <>
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
            </div>
        </div>
    </>
  )
}