import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import BlogForm from "../components/BlogForm";
import BlogCard from "../components/BlogCard";

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("blog-summarizer-kohl.vercel.app
");
      setBlogs(res.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleNewBlog = (newBlog) => {
    setBlogs((prev) => [newBlog, ...prev]);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <BlogForm onBlogCreated={handleNewBlog} />
      <h2 className="text-2xl font-bold border-b pb-2">Your Blogs</h2>
      <div className="space-y-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <p>No blogs yet. Start by writing one!</p>
        )}
      </div>
    </div>
  );
}

