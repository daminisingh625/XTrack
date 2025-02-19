import { useState } from 'react';
import axios from "axios"
export default function Login(){
    const [formData, setFormData] = useState({});

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const handleSubmit =async (e) =>{
        e.preventDefault();
        try{
        const response = await axios.post("http://localhost:3000/login", {email: formData.email, password: formData.password});
        console.log(response);
        }catch(err){
           console.log("There is an error", err);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Enter your email" name="email" onChange={handleChange}/>
            <input type="password" placeholder="Enter your password"  name="password" onChange={handleChange}/>
            <button>Login</button>
        </form>
    )
}