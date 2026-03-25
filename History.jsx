import axios from "axios";
import { useEffect, useState } from "react";

export default function History() {
  const [feedback, setFeedback] = useState([]);
  const token = localStorage.getItem("token");

  async function loadFeedback() {
    const res = await axios.get("http://localhost:5000/api/feedback", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.success) setFeedback(res.data.data);
  }

  useEffect(() => {
    loadFeedback();
  }, []);

  return (
    <div className="main">
      <h1>Feedback History 📝</h1>

      <div className="feedback-list">
        {feedback.map((f) => (
          <div className="feedback-card" key={f._id}>
            <p>{f.text}</p>
            <span>{f.sentiment}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
