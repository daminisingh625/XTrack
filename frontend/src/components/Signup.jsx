import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function Signup() {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:3000/signup", formData);
            toast.success(response.data.message || "Signup Successful");
        } catch (error) {
            console.error("Signup error:", error.response?.data || error);
            toast.error(error.response?.data?.message || "Signup Failed");
        }
    };
    
    return (
        <div className="signup form">
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" onChange={handleChange} placeholder="Enter your username" required />

                <input type="email" name="email" onChange={handleChange} placeholder="Enter your email" required />

                <input type="password" name="password" onChange={handleChange} placeholder="Enter your password" required />

                <button type="submit">Signup</button>
            </form>
        </div>
    );
}
