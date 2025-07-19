import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import BlogForm from "../components/BlogForm";
import BlogCard from "../components/BlogCard";

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      // const res = await axios.get("https://blog-summarizer-b8zdup7go-sridhars-projects-fd687d12.vercel.app/api/blogs");
      const res = await axios.get("https://blog-summarizer-kohl.vercel.app/api/blogs");
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

// import { useState } from "react";
// import { FaSpinner, FaRegCopy, FaRobot, FaFileAlt, FaCheck } from "react-icons/fa";
// import { BiSparkles } from "react-icons/bi";
// // import axios from "axios"; // Assuming axios is available in your project
// import React from "react";
// // import toast from "react-hot-toast"; // Assuming react-hot-toast is available in your project

// // Mock toast for demo purposes
// const toast = {
//   error: (message) => console.log(`Error: ${message}`),
//   success: (message) => console.log(`Success: ${message}`)
// };

// // Demo blog data for the artifact
// const demoBlog = {
//   title: "The Future of Artificial Intelligence in Content Creation",
//   content: "Artificial Intelligence has revolutionized the way we approach content creation, offering unprecedented opportunities for automation, personalization, and efficiency. From generating blog posts to creating visual content, AI tools are becoming indispensable for content creators, marketers, and businesses alike. The technology continues to evolve at a rapid pace, with new models and capabilities emerging regularly. As we look toward the future, we can expect AI to become even more sophisticated in understanding context, tone, and audience preferences, ultimately enabling more nuanced and effective content generation strategies."
// };

// const BlogCard = ({ blog = demoBlog }) => {
//   const [summary, setSummary] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [copied, setCopied] = useState(false);

//   const handleSummarize = async () => {
//     setLoading(true);
//     try {
//       // Replace with your actual axios implementation
//       const axios = { post: () => Promise.resolve({ data: { summary: "This is a sample AI-generated summary of the blog content. In your actual implementation, this would be the real summarized content returned from your API." } }) };
//       const res = await axios.post("https://blog-summarizer-kohl.vercel.app/api/summarize", {
//       // const res = await axios.post("http://localhost:5000/api/summarize", {
//         content: blog.content,
//       });
//       setSummary(res.data.summary);
//     } catch (err) {
//       console.error("Error summarizing blog:", err);
//       toast.error("Summarization failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const copySummary = () => {
//     navigator.clipboard.writeText(summary);
//     setCopied(true);
//     toast.success("Summary copied to clipboard!");
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 mb-8 overflow-hidden transition-all duration-300 hover:-translate-y-1">
//       {/* Header with gradient */}
//       <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-6 border-b border-gray-100">
//         <div className="flex items-start gap-3">
//           <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl shadow-md flex-shrink-0">
//             <FaFileAlt className="h-4 w-4 text-white" />
//           </div>
//           <div className="flex-1 min-w-0">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
//               {blog.title}
//             </h2>
//           </div>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="p-6">
//         <div className="mb-6">
//           <div className="flex items-center gap-2 mb-3">
//             <FaFileAlt className="h-4 w-4 text-gray-500" />
//             <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Original Content</span>
//           </div>
//           <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
//             <p className="text-gray-700 leading-relaxed text-base line-clamp-6 hover:line-clamp-none transition-all duration-300">
//               {blog.content}
//             </p>
//           </div>
//         </div>

//         {/* Divider with AI Icon */}
//         <div className="flex items-center gap-4 my-6">
//           <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
//           <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
//             <FaRobot className="h-4 w-4 text-blue-600" />
//             <span className="text-sm font-semibold text-gray-700">AI Summary</span>
//             <BiSparkles className="h-4 w-4 text-purple-600" />
//           </div>
//           <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
//         </div>

//         {/* Summarize Button */}
//         <div className="mb-6">
//           <button
//             onClick={handleSummarize}
//             disabled={loading}
//             className={`group/btn relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3 ${
//               loading ? 'animate-pulse' : ''
//             }`}
//           >
//             <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
//             <div className="relative flex items-center gap-3">
//               {loading ? (
//                 <>
//                   <FaSpinner className="animate-spin h-4 w-4" />
//                   <span>Summarizing with AI...</span>
//                 </>
//               ) : (
//                 <>
//                   <FaRobot className="h-4 w-4" />
//                   <span>Summarize with AI</span>
//                   <BiSparkles className="h-4 w-4 opacity-75" />
//                 </>
//               )}
//             </div>
//           </button>
//         </div>

//         {/* Summary Section */}
//         {summary && (
//           <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl border border-emerald-200 p-6 animate-in slide-in-from-bottom-4 duration-500">
//             <div className="flex justify-between items-center mb-4">
//               <div className="flex items-center gap-2">
//                 <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-2 rounded-lg shadow-sm">
//                   <BiSparkles className="h-4 w-4 text-white" />
//                 </div>
//                 <span className="font-bold text-gray-800 text-lg">AI Generated Summary</span>
//               </div>
//               <button 
//                 onClick={copySummary} 
//                 className={`group/copy flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 ${
//                   copied 
//                     ? 'bg-green-100 text-green-700 border border-green-200' 
//                     : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
//                 }`}
//               >
//                 {copied ? (
//                   <>
//                     <FaCheck className="h-3 w-3" />
//                     <span className="text-sm">Copied!</span>
//                   </>
//                 ) : (
//                   <>
//                     <FaRegCopy className="h-3 w-3 group-hover/copy:scale-110 transition-transform duration-200" />
//                     <span className="text-sm">Copy</span>
//                   </>
//                 )}
//               </button>
//             </div>
//             <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm">
//               <p className="text-gray-800 leading-relaxed text-base font-medium">
//                 {summary}
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogCard;