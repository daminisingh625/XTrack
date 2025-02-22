import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../views/Home.css";

export default function Dashboard() {
    const [user, setUser] = useState(null); // Moved outside JSX
    const navigate = useNavigate(); // Moved outside JSX

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        if (!currentUser) {
            console.log("No user found, redirecting...");
            navigate("/signin"); // Redirect to signin if user is not logged in
        } else {
            setUser(currentUser);
        }
    }, [navigate]);

    return (
        <div className="dashboard-container">
            <div className="home-container">
                <h1>Welcome, {user?.username || "User"}</h1>
                <button className="home-button">Setup Your Account</button>
                {/* Add other user-specific content here */}
            </div>
        </div>
    );
}
