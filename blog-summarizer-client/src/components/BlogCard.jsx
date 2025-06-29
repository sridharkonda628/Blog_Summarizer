import { useState } from "react";
import axios from "axios";
import React from "react";

export default function BlogCard({ blog }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/ai/summarize", {
        content: blog.content,
      });
      setSummary(res.data.summary);
      console.log(res.data);
    } catch (err) {
      console.error("Error summarizing blog:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-white shadow-md p-4 border border-base-300">
      <h3 className="text-xl font-bold">{blog.title}</h3>
      <p className="text-sm text-gray-600 mb-2">Posted on: {new Date(blog.createdAt).toLocaleDateString()}</p>
      <p className="text-gray-800 mb-4">{blog.content}</p>

      <button onClick={handleSummarize} className="btn btn-outline btn-sm mb-2">
        {loading ? "Summarizing..." : "Summarize with AI"}
      </button>

      {summary && (
        <div className="mt-2 p-3 bg-base-200 rounded">
          <strong>Summary:</strong>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}
