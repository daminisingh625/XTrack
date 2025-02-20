import { useState } from 'react';
import axios from "axios";
import "../views/authentication.css";

export default function Login() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: formData.email,
        password: formData.password
      });
      console.log(response);
    } catch (err) {
      console.log("There is an error", err);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login to XTrack</h2>
        <input 
          type="email" 
          placeholder="Enter your email" 
          name="email" 
          onChange={handleChange} 
          required
        />
        <input 
          type="password" 
          placeholder="Enter your password"  
          name="password" 
          onChange={handleChange} 
          required
        />
        <button className="login-button">Login</button>
        <a href="/signup">Don't have an account?</a>
      </form>
    </div>
  );
}
