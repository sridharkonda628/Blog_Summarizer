import { Link } from "react-router-dom";
import React from "react";


export default function Navbar() {
  return (
    <div className="navbar bg-primary text-primary-content px-4">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold">Blog Summarizer</Link>
      </div>
      <div className="flex-none gap-2">
        <Link to="/dashboard" className="btn btn-secondary">Dashboard</Link>
      </div>
    </div>
  );
}
