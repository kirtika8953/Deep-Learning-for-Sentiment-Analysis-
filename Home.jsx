import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <div className="home-left">
        <h1 className="main-title">
          Empowering <br />
          Workplaces <br />
          Through <span className="highlight">BERT-based</span> <br />
          Sentiment Analysis
        </h1>

        <p className="sub-text">
          Transform employee voices into meaningful insights with advanced AI sentiment analysis.
          Improve engagement, identify concerns early, and build a happier workplace.
        </p>

        <div className="btn-row">
          <button className="primary-btn" onClick={() => navigate("/register")}>
            Get Started
          </button>

          <button className="secondary-btn" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      </div>

      <div className="home-right">
        {/* Soft animated gradient shape */}
        <div className="soft-circle"></div>
      </div>
    </div>
  );
}
