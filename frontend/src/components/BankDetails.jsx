// // import React from 'react';
// import '../views/BankDetails.css';  // Import the CSS file

// export default function BankDetails() {
//   return (
//     <div className="bank-details-container">
//       <h1>Bank Details</h1>
//       <div className="bank-info">
//         <p><strong>Account Holder:</strong> John Doe</p>
//         <p><strong>Account Number:</strong> 1234 5678 9012 3456</p>
//         <p><strong>Bank Name:</strong> ABC National Bank</p>
//         <p><strong>Branch:</strong> Downtown Branch</p>
//         <p><strong>IFSC Code:</strong> ABCD0123456</p>
//         <p><strong>Account Type:</strong> Savings</p>
//       </div>
//     </div>
//   );
// }
import { useEffect } from "react";

function FastLinkComponent({ accessToken }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.yodlee.com/fastlink/v4/initialize.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const launchFastLink = () => {
    window.fastlink.open(
      {
        fastLinkURL: "https://sandbox.fastlink.yodlee.com", // or production
        accessToken: "Bearer " + accessToken,
        params: {
          configName: "Aggregation"
        },
        onSuccess: (data) => {
          console.log("Link success", data);
        },
        onError: (error) => {
          console.error("Error", error);
        },
        onClose: (data) => {
          console.log("User closed FastLink", data);
        },
        onEvent: (data) => {
          console.log("Event", data);
        }
      },
      "fastlink-container"
    );
  };

  return (
    <>
      <button onClick={launchFastLink}>Link Bank Account</button>
      <div id="fastlink-container" style={{ height: "600px" }}></div>
    </>
  );
}

export default FastLinkComponent;
