import { useState } from "react";
import { FaSpinner, FaRegCopy } from "react-icons/fa";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const BlogCard = ({ blog }) => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      // const res = await axios.post("http://localhost:5000/api/ai", {
      const res = await axios.post("https://blog-summarizer-kohl.vercel.app/api/blogs", {
        content: blog.content,
      });
      setSummary(res.data.summary);
    } catch (err) {
      console.error("Error summarizing blog:", err);
      toast.error("Summarization failed. Please try again.");

    } finally {
      setLoading(false);
    }
  };

  const copySummary = () => {
    navigator.clipboard.writeText(summary);
  };

  return (
    <div className="card bg-base-100 shadow-lg border border-base-300 mb-5">
      <div className="card-body">
        <h2 className="card-title text-lg">{blog.title}</h2>
        <p className="text-sm text-gray-700">{blog.content}</p>

        <div className="divider">AI Summary</div>

        <button
          onClick={handleSummarize}
          disabled={loading}
          className="btn btn-outline btn-sm"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <FaSpinner className="animate-spin" /> Summarizing...
            </span>
          ) : (
            "Summarize with AI"
          )}
        </button>

        {summary && (
          <div className="mt-4 p-3 bg-base-200 rounded text-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Summary:</span>
              <button onClick={copySummary} className="btn btn-xs btn-outline">
                <FaRegCopy /> Copy
              </button>
            </div>
            <p>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
