import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";   // Using same theme for consistent UI

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleRegister() {
    if (!name || !email || !password) {
      setError("Please fill all fields before continuing.");
      return;
    }

    // Successful validation
    setError("");
    navigate("/login");
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <h1 className="login-title">Create Your Account</h1>
        <p className="login-subtitle">
          Start your BERT-powered sentiment analysis experience.
        </p>

        {/* ERROR MESSAGE */}
        {error && <p className="error-text">{error}</p>}

        <div className="input-group">
          <input
            type="text"
            placeholder="Full Name"
            className={error && !name ? "error-input" : ""}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email address"
            className={error && !email ? "error-input" : ""}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className={error && !password ? "error-input" : ""}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" onClick={handleRegister}>
          Create Account
        </button>

        <div className="text-links">
          <Link to="/login" className="text-link">
            Already have an account? Login
          </Link>
        </div>

      </div>
    </div>
  );
}
