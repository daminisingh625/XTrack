import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../src/superbaseClient.js";
import { toast } from "react-toastify";
import "../src/views/authentication.css";
import myloginGif from "../src/assets/myloginGif.gif";
function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Signup successful! Please verify your email.");
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    }
  };

  return (
<<<<<<< HEAD
     <div className="login-container">
          {/* <section className="login-section"> */}
    
          <div className="login-left">
          <form className="login-form" onSubmit={handleLogin}>
            <h2>Sign Up</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="login-button">
              Sign Up
            </button>
          </form>
                </div>
                
                <div className="login-right">
                 <div className="login-img">
                 <img className="mylogin" src={myloginGif} alt="loading animation" />
                    {/* <img src={welcomeimg} alt="Welcome" className="login-image" /> */}
                 </div>
                </div>
    
          {/* </section> */}
          
        </div>
    // <div className="signup-container">
    //   <form className="signup-form" onSubmit={handleSignup}>
    //     <h2>Sign Up</h2>
    //     <input
    //       type="email"
    //       name="email"
    //       placeholder="Email"
    //       value={formData.email}
    //       onChange={handleChange}
    //       required
    //     />
    //     <input
    //       type="password"
    //       name="password"
    //       placeholder="Password"
    //       value={formData.password}
    //       onChange={handleChange}
    //       required
    //     />
    //     <button type="submit" className="signup-button">
    //       Sign Up
    //     </button>
    //   </form>
    // </div>
=======
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="signup-button" onSubmit={handleSignup}>
          Sign Up
        </button>
      </form>
    </div>
>>>>>>> 7e97943d210b3bd0d0c21ab371d30d16f6c74e80
  );
}

export default Signup;
