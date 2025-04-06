import { useState, useEffect } from "react";
import { supabase } from "../src/supabaseClient"; 
import Navbar from "../src/components/Navbar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Function to check the current session
    const checkAuth = async () => {
      console.log("Hey! I'm checking the auth");
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(!!session);
      }
    };

    checkAuth(); // Run once on mount

    // Listen for authentication state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <header>
        <Navbar isAuthenticated={isAuthenticated} />
      </header>
      <div className="app-root-container">
        {/* Define your Routes here */}
      </div>
    </div>
  );
}

export default App;
