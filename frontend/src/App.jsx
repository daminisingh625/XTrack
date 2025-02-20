import { useState } from "react";
import {Routes, Route} from 'react-router-dom';
import Signup from "./components/Signup";
import Login from "./components/Login"
import "./App.css";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar"

function App() {
  return (
    <>
      <div>
        <header>
        <Navbar/>
        </header>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login/>}/>
        </Routes>
        <footer>

        </footer>
      </div>
    
    </>
  );
}

export default App;
