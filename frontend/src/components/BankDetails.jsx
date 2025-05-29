// import React from 'react';
import '../views/BankDetails.css';  // Import the CSS file

export default function BankDetails() {
  return (
    <div className="bank-details-container">
      <h1>Bank Details</h1>
      <div className="bank-info">
        <p><strong>Account Holder:</strong> John Doe</p>
        <p><strong>Account Number:</strong> 1234 5678 9012 3456</p>
        <p><strong>Bank Name:</strong> ABC National Bank</p>
        <p><strong>Branch:</strong> Downtown Branch</p>
        <p><strong>IFSC Code:</strong> ABCD0123456</p>
        <p><strong>Account Type:</strong> Savings</p>
      </div>
    </div>
  );
}
