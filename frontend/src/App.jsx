import { useState } from "react";
import {Routes, Route} from 'react-router-dom';
import Signup from "./components/Signup";
import Login from "./components/Login"
import "./App.css";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </div>
    
    </>
  );
}

export default App;
