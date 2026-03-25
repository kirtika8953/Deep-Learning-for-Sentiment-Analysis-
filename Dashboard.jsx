import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalFeedback: 0,
    positive: 0,
    neutral: 0,
    negative: 0,
  });

  const loadStats = () => {
    fetch("http://127.0.0.1:8000/stats")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.log("Stats error:", err));
  };

  useEffect(() => {
    loadStats();
    window.addEventListener("updateStats", loadStats);

    return () => window.removeEventListener("updateStats", loadStats);
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="welcome-heading">Welcome to Dashboard 👋</h1>
      <p className="dashboard-subtitle">
        Monitor employee feedback & analyze sentiment using AI.
      </p>

      {/* ---------------- TOP THREE CARDS ---------------- */}
      <div className="stats-wrapper">
        <div className="stat-card">
          <div className="stat-emoji">😊</div>
          <div className="stat-number">{stats.positive}</div>
          <div className="stat-label">Positive</div>
        </div>

        <div className="stat-card">
          <div className="stat-emoji">😐</div>
          <div className="stat-number">{stats.neutral}</div>
          <div className="stat-label">Neutral</div>
        </div>

        <div className="stat-card">
          <div className="stat-emoji">😞</div>
          <div className="stat-number">{stats.negative}</div>
          <div className="stat-label">Negative</div>
        </div>
      </div>

      {/* ---------------- BOTTOM TWO FEATURE CARDS ---------------- */}
      <div className="sections-wrapper">
        <div className="section-card">
          <div className="section-emoji">📝</div>
          <h2>Employee Feedback</h2>
          <p>Submit feedback to help improve workplace culture.</p>
          <button
            className="section-btn"
            onClick={() => navigate("/feedback")}
          >
            Give Feedback
          </button>
        </div>

        <div className="section-card">
          <div className="section-emoji">🧠</div>
          <h2>Sentiment Analyzer</h2>
          <p>Analyze your message sentiment using AI.</p>
          <button
            className="section-btn"
            onClick={() => navigate("/sentiment")}
          >
            Analyze Sentiment
          </button>
        </div>
      </div>
    </div>
  );
}
