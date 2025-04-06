// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../src/components/Sidebar";
// import Body from "../src/components/Body";
// import "../src/views/Home.css";

// export default function MainSection() {
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (!storedUser) {
//             console.log("No user found, redirecting...");
//             navigate("/login"); // ✅ Corrected here
//         } else {
//             setUser(JSON.parse(storedUser));
//         }
//     }, [navigate]);

//     return (
//         <div className="dashboard-container">
//             <div className="app-body">
//                 <div className="App-sidebar">
//                     <Sidebar />
//                 </div>
//                 <div className="App-body">
//                     <Body />
//                 </div>
//             </div>
//         </div>
//     );
// }
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../src/components/Sidebar";
import Body from "../src/components/Body";
import "../src/views/Home.css";
import { supabase } from "../src/superbaseClient"; // ✅ Import supabase

export default function MainSection() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                console.log("No user session found, redirecting...");
                navigate("/login");
            } else {
                setUser(session.user);
            }
        };

        checkAuth();
    }, [navigate]);

    return (
        <div className="dashboard-container">
            <div className="app-body">
                <div className="App-sidebar">
                    <Sidebar />
                </div>
                <div className="App-body">
                    <Body />
                </div>
            </div>
        </div>
    );
}
