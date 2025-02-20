import { useState } from "react";
import {Routes, Route} from 'react-router-dom';
import Signup from "./components/Signup";
import Login from "./components/Login"
import "./App.css";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "react-toastify";

function App() {
  return (

      <div>
        <header>
        <Navbar/>
        </header>
        
        <Sidebar/>
           
           <div className="page-content">
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login/>}/>
        </Routes>
      
        
        <footer>
        </footer>
      </div>
    
   </div>
  );
}

export default App;
