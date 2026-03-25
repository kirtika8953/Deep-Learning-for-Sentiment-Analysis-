import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import SentimentPage from "./pages/SentimentPage";
import FeedbackForm from "./pages/FeedbackForm";
import "./App.css";


export default function App() {
  const location = useLocation();

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="logo">SentimentX</Link>
        </div>

        <div className="nav-right">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>

          {location.pathname === "/dashboard" && (
            <button className="logout-btn" onClick={logout}>Logout</button>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Important pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sentiment" element={<SentimentPage />} />
        <Route path="/feedback" element={<FeedbackForm />} />
      </Routes>
    </>
  );
}
