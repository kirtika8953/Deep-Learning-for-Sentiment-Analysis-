import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";   // same theme as Login & Register

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      setError("Please enter your registered email.");
      return;
    }

    setError("");
    setSuccess("If this email exists, a password reset link has been sent.");

    // Auto redirect after 2 seconds
    setTimeout(() => navigate("/login"), 2000);
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <h1 className="login-title">Reset Password</h1>
        <p className="login-subtitle">
          Enter your email to receive a password reset link.
        </p>

        {/* ERROR MESSAGE */}
        {error && <p className="error-text">{error}</p>}

        {/* SUCCESS MESSAGE */}
        {success && <p className="success-text">{success}</p>}

        <form className="input-group" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className={error && !email ? "error-input" : ""}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="login-btn" type="submit">
            Send Reset Link
          </button>
        </form>

        <div className="text-links">
          <Link to="/login" className="text-link">
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}
