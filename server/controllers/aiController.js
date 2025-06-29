import axios from "axios";

export const summarizeBlog = async (req, res) => {
  const { content } = req.body;

  if (!content || content.length < 10) {
    return res.status(400).json({ error: "Content is too short or missing." });
  }

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        inputs: content,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    const summary = response.data?.[0]?.summary_text;
    if (!summary) throw new Error("Failed to get summary");

    res.json({ summary });
  } catch (error) {
    console.error("Hugging Face Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to summarize using Hugging Face." });
  }
};
