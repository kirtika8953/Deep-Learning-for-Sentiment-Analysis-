// Basic rule-based sentiment analyzer
export function analyzeSentiment(text) {
  const t = text.toLowerCase();

  const positiveWords = ["good", "great", "excellent", "happy", "love", "nice", "fantastic"];
  const negativeWords = ["bad", "sad", "angry", "terrible", "worst", "poor", "hate"];

  let score = 0;

  positiveWords.forEach((word) => {
    if (t.includes(word)) score++;
  });

  negativeWords.forEach((word) => {
    if (t.includes(word)) score--;
  });

  if (score > 0) return "Positive 😀";
  if (score < 0) return "Negative 😞";
  return "Neutral 😐";
}
