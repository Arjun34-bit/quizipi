import React from "react";
import { Link } from "react-router-dom";
import "../styles/Thankyou.css";

function ThankYou() {
  return (
    <div className="thank-you-container">
      <h1>🎉 Thank You! 🎉</h1>
      <p>Your response has been submitted successfully.</p>
      <Link to="/" className="home-button">
        Go Back to Home
      </Link>
    </div>
  );
}

export default ThankYou;
