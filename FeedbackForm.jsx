import React, { useState } from "react";
import "../styles/Feedback.css";

export default function Feedback() {
  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !department || !email || !message) {
      setError("All fields are required.");
      return;
    }

    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, department, email, message }),
      });

      if (response.ok) {
        alert("Feedback submitted successfully!");

        setFullName("");
        setDepartment("");
        setEmail("");
        setMessage("");

        // 🔥 IMPORTANT — TELL DASHBOARD TO UPDATE FEEDBACK COUNT
        window.dispatchEvent(new Event("updateStats"));

      } else {
        alert("Error submitting feedback.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error.");
    }
  };

  return (
    <div className="feedback-wrapper">
      <div className="feedback-card">
        <h1 className="feedback-title">Employee Feedback</h1>
        <p className="feedback-subtitle">Share your experience with us.</p>

        <form className="feedback-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-box"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="text"
            className="input-box"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />

          <input
            type="email"
            className="input-box"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            className="textarea-box"
            placeholder="Write your feedback..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {error && <p className="error-text">❗ {error}</p>}

          <button type="submit" className="submit-btn">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
