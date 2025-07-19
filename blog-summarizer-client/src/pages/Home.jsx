import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import BlogForm from "../components/BlogForm";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // axios.get("http://localhost:5000/api/blogs").then((res) => {
    //   setBlogs(res.data);
    // });
    axios.get("https://blog-summarizer-kohl.vercel.app/api/blogs").then((res) => {
      setBlogs(res.data);
    });
  }, []);

  const handleNewBlog = (newBlog) => {
    setBlogs((prev) => [newBlog, ...prev]);
  };

  const filtered = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-5 max-w-5xl mx-auto">
      <BlogForm onBlogCreated={handleNewBlog} />

      <div className="mb-4">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Search blogs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Home;
