import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios";
import "../views/authentication.css";

export default function Login() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

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
      const {token, user} = response.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("token:", token)
      console.log("User:", user)

      toast.success("Sign in successful!")
      navigate("/home")
    } catch (err) {
      console.log("There is an error", err);
      toast.error("Oops! Something went wrong.")
    }
  };

  return (
    <>
    <ToastContainer/>
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
    </>
  );
}
