import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { CiSun } from "react-icons/ci";
import { FaRegMoon, FaRegBell } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import xtrack from "../assets/xtrack.jpg";
import { supabase } from "../superbaseClient.js";




export default function Navbar() {

//creation on dark mode and light mode
const[state , setState] = useState("light-mode");

const change = () => {
  if(state === "light-mode"){
    setState("dark-mode")
  }else{
    setState("light-mode")
  }
}


useEffect(()=>{
  document.body.className = state;
},[state])

const toggleMode = () => {
  setState((prev) => (prev === "light-mode" ? "dark-mode" : "light-mode"));
};

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Function to check the current session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };

    checkUser();

    // Listen for authentication state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    // Cleanup subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      navigate("/");

      console.log("User logged out successfully.");
      toast.success("Signed out successfully!");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("There was an error!");
    }
  };

  return (
    <>
      <ToastContainer />
      <div id="navbar">
        <div className="logo-container">
        <img src={xtrack} alt="Logo" style={{width:'9rem'}}/>
          
        </div>
        <div className="nav-links">
          <div className="icons">
            <button className="nav-icons"><FaRegBell /></button>
            <button className="nav-icons"><CiSun /></button>
            <button className="nav-icons" onClick={change}><FaRegMoon /></button>

          </div>
          {!isLoggedIn ? (
            <Link to="/login">
              <button>Log in</button>
            </Link>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </>
  );
}
