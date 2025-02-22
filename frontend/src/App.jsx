import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Welcome from "./components/Welcome";
import BudgetPlanner from "./components/BudgetPlanner";
import Body from "./components/Body";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      setIsAuthenticated(!!token);
      console.log("Token found:", token);
    };
  
    checkAuth(); // Run once on component mount
  
    // Listen for storage changes
    window.addEventListener("storageChange", checkAuth);
  
    return () => {
      window.removeEventListener("storageChange", checkAuth);
    };
  }, []);
  

  return (
    <div>
      <header>
        <Navbar />
      </header>
       
       <div className="app-body">
        {/*App sidebar */}
    
       {isAuthenticated ? <Sidebar className="App-sidebar" /> : null}
       {/*main content */}
       <Body className="App-body"/>
       </div>

      <footer>

      </footer>
    </div>
  );
}

export default App;
{/* <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/budget-planner" element={<BudgetPlanner />} />
        </Routes> */}
