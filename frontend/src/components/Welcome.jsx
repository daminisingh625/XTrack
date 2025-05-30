 import '../views/welcome.css';
import Navbar from './Navbar.jsx';
import welcomeimg from '../assets/welcomeimg.png';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../superbaseClient.js';


 export default function Welcome() {

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);



  const handleNavigation = () => {
        if (isAuthenticated) {
          navigate('/dashboard');
        } else {
          navigate('/login');
        }
      };
    return (
      <>
       {/* <Navbar /> */}
     
      <div className="content">

         <section className="welcome-section">

         <div className="welcome-left">
          <h1 className='welcome-heading'>Welcome to XTrack</h1>
          <p className='welcome-para'> Ever wondered where all your money mysteriously disappears by the end of the month? 🧐 Well, say hello to XTrack – your ultimate money sidekick!</p>
          <div className="welcome-button"> <button onClick={handleNavigation}>Start Tracking</button></div>
          </div>
      
         {/* <div className="welcome-button"> <button onClick={handleNavigation}>Start Tracking</button></div> */}
      
         <div className="welcome-right">
           <div className="welcome-img">
           <img src={welcomeimg} alt="Welcome" className="welcome-image" />
           </div>
         </div>


        </section> 
      </div>


      </>
       );
 }



// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../superbaseClient.js';
// import Navbar from './Navbar.jsx'; 
// import '../views/welcome.css';

// export default function Welcome() {
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       setIsAuthenticated(!!session);
//     };

//     checkAuth();

//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//       setIsAuthenticated(!!session);
//     });

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []);

//   const handleNavigation = () => {
//     if (isAuthenticated) {
//       navigate('/dashboard');
//     } else {
//       navigate('/login');
//     }
//   };

//   return (
//     <>
//     <Navbar />
//     <div className="welcome-container">
//       <div className="welcome-heading">
//         <h1>Welcome to XTrack</h1>
//       </div>
//       <div className="welcome-text">
//         <p>
//           Ever wondered where all your money mysteriously disappears by the end of the month? 🧐 Well, say hello to
//           XTrack – your ultimate money sidekick!
//         </p>
//       </div>
//       <button onClick={handleNavigation}>Plan your budget</button>
//     </div>
//     </>
//   );
  
// }
