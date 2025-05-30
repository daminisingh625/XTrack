import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {useState, useEffect} from "react";
import { supabase } from "../src/superbaseClient.js";
import { toast } from "react-toastify";
// import welcomeimg from '../src/assets/welcomeimg.png';
import "../src/views/authentication.css";
import myloginGif from "../src/assets/myloginGif.gif"

function Login() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // Check for an existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        navigate("/dashboard");
      }
    });

    // Listen for changes to authentication state
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (event === "SIGNED_IN") {
          navigate("/dashboard");
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Login successful!");
    }
  };

  return (
    // <div className="login-container">
    //   <form className="login-form" onSubmit={handleLogin}>
    //     <h2>Login</h2>
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
    //     <button type="submit" className="login-button">
    //       Login
    //     </button>
    //   </form>
    // </div>

    <div className="login-container">
      {/* <section className="login-section"> */}

      <div className="login-left">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
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
          Login
        </button>
       <Link to="/signup">Don't have an account</Link>
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
  );
}

export default Login;
   