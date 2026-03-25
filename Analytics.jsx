import { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function Analytics() {
  const [feedback, setFeedback] = useState([]);

  const token = localStorage.getItem("token");

  async function loadData() {
    const res = await axios.get("http://localhost:5000/api/feedback", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.success) setFeedback(res.data.data);
  }

  useEffect(() => {
    loadData();
  }, []);

  // Count sentiments
  const counts = {
    positive: feedback.filter((f) => f.sentiment === "positive").length,
    negative: feedback.filter((f) => f.sentiment === "negative").length,
    neutral: feedback.filter((f) => f.sentiment === "neutral").length,
  };

  return (
    <div className="analytics">
      <h1>Sentiment Analytics</h1>

      <div className="chart-row">
        <div className="chart-card">
          <h3>Sentiment Distribution</h3>
          <Pie
            data={{
              labels: ["Positive", "Negative", "Neutral"],
              datasets: [
                {
                  data: [counts.positive, counts.negative, counts.neutral],
                  backgroundColor: ["#34d399", "#f87171", "#60a5fa"],
                },
              ],
            }}
          />
        </div>

        <div className="chart-card">
          <h3>Sentiment Comparison</h3>
          <Bar
            data={{
              labels: ["Positive", "Negative", "Neutral"],
              datasets: [
                {
                  label: "Count",
                  data: [counts.positive, counts.negative, counts.neutral],
                  backgroundColor: ["#34d399", "#f87171", "#60a5fa"],
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}
