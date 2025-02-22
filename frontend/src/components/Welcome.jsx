import { useEffect } from "react";
import "../views/welcome.css"
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
export default function Welcome(){
    const navigate = useNavigate();
    
    const handleSubmit = () => {
        const isAuthenticated = localStorage.getItem("authtoken");
        
        if(!isAuthenticated){
            navigate("/signin");
        }else{
            navigate("/budget-planner");
        }
    }
    return (
        <>
            <div className="welcome-container">
                <div className="welcome-heading">
                    <h1>Welcome to XTrack </h1>
                </div>
                <div className="welcome-text">
                <p>Ever wondered where all your money mysteriously disappears by the end of the month? 🧐 Well, say hello to 
                XTrack – your ultimate money sidekick! </p>
                </div>
                <button onClick={handleSubmit}>Plan your budget</button>
            </div>
        </>

    )
}