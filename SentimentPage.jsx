import React, { useState } from "react";
import "../styles/Sentiment.css";

export default function SentimentPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeSentiment = async () => {
    if (!text.trim()) {
      alert("Please enter some text");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setResult(data);

      // 🔥 VERY IMPORTANT: UPDATE DASHBOARD COUNTS
      window.dispatchEvent(new Event("updateStats"));

    } catch (error) {
      console.error(error);
      alert("FastAPI server is not running!");
    }

    setLoading(false);
  };

  return (
    <div className="sentiment-wrapper">
      <h1>AI Sentiment Analyzer</h1>

      <textarea
        className="textarea-box"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="analyze-btn" onClick={analyzeSentiment} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div className="result-box">
          <h2
            style={{
              color:
                result.sentiment === "positive"
                  ? "green"
                  : result.sentiment === "negative"
                  ? "red"
                  : "orange",
            }}
          >
            {result.sentiment.toUpperCase()}
          </h2>

          <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}
