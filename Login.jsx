import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // If validation passes, you move to dashboard
    setError("");
    navigate("/dashboard");
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">
          Sign in to continue your BERT-powered sentiment analysis journey.
        </p>

        {/* ERROR MESSAGE */}
        {error && <p className="error-text">{error}</p>}

        <div className="input-group">
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

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <div className="text-links">
          <Link to="/forgot-password" className="text-link">
            Forgot your password?
          </Link>

          <Link to="/register" className="text-link">
            New here? Create an account
          </Link>
        </div>

      </div>
    </div>
  );
}
