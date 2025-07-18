import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import React from "react";

const BlogForm = ({ onBlogAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Please enter both title and content.");
      return;
    }

    try {
      setLoading(true);

      // const response = await axios.post("http://localhost:5000/api/blogs", {
      const response = await axios.post("https://blog-summarizer-kohl.vercel.app/api/blogs", {
        title,
        content,
      });

      const newBlog = response.data;

      // ✅ Confirm backend responded
      if (newBlog && newBlog._id) {
        onBlogAdded(newBlog); // Add to list
        toast.success("Blog posted successfully!");
        setTitle("");
        setContent("");
      } else {
        toast.error("Unexpected server response.");
      }

    } catch (err) {
      console.error("Blog post error:", err.message);
      toast.error("Failed to post blog. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-base-100 shadow-md p-4 mb-6 border border-base-300"
    >
      <h2 className="text-xl font-semibold mb-3">Create New Blog</h2>

      <input
        className="input input-bordered w-full mb-3"
        type="text"
        placeholder="Blog title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="textarea textarea-bordered w-full mb-3"
        rows="4"
        placeholder="Write your blog content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
        {loading ? "Posting..." : "Post Blog"}
      </button>
    </form>
  );
};

export default BlogForm;
