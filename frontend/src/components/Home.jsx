import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../views/Home.css"

export default function Home() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        if (!currentUser) {
            console.log(currentUser)
            navigate("/signin"); // Redirect to signin if user is not logged in
        } else {
            setUser(currentUser);
        }
    }, [navigate]);

    return (
        <div className="home-container">
            <h1>Welcome, {user?.username || "User"}</h1>
            <button className="home-button">Setup Your Account</button>
            {/* Add other user-specific content here */}
        </div>
    );
}
