import { useState } from "react";
import axios from "axios";
import React from "react";

export default function BlogForm({ onBlogCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/blogs", {
        title,
        content,
      });
      onBlogCreated(res.data);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card bg-base-200 p-4 shadow-md space-y-4">
      <h2 className="text-xl font-bold">Create New Blog</h2>
      <input
        type="text"
        placeholder="Title"
        className="input input-bordered w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Write your blog content..."
        className="textarea textarea-bordered w-full h-32"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-primary w-full">
        Post Blog
      </button>
    </form>
  );
}
