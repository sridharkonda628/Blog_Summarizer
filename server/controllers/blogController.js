import Blog from "../models/Blog.js";

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

export const createBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newBlog = await Blog.create({ title, content });
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ error: "Failed to create blog" });
  }
};
