from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()

# Allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load AI model
sentiment_model = pipeline(
    "sentiment-analysis",
    model="cardiffnlp/twitter-roberta-base-sentiment-latest"
)

# COUNTERS (LIVE INCREMENT)
stats = {
    "positive": 0,
    "neutral": 0,
    "negative": 0
}

class InputText(BaseModel):
    text: str

@app.post("/analyze")
def analyze_sentiment(data: InputText):
    global stats
    result = sentiment_model(data.text)[0]

    label = result["label"].lower()
    score = float(result["score"])

    # Normalizing label (model labels = positive/neutral/negative)
    if label in stats:
        stats[label] += 1

    return {
        "sentiment": label,
        "confidence": score
    }

@app.get("/stats")
def get_stats():
    total = stats["positive"] + stats["neutral"] + stats["negative"]
    return {
        "totalFeedback": total,
        "positive": stats["positive"],
        "neutral": stats["neutral"],
        "negative": stats["negative"]
    }
