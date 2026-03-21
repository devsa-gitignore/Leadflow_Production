import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="py-6 bg-transparent">
      <div className="container mx-auto px-5 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2.5 font-sans font-extrabold text-2xl text-black">
          <div className="w-6 h-6 bg-black rounded" />
          <span>LeadFlow</span>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="hidden md:flex gap-8">
            <li><a href="#overview" className="font-medium text-muted hover:text-primary text-sm transition-colors">Overview</a></li>
            <li><a href="#plans" className="font-medium text-muted hover:text-primary text-sm transition-colors">Plans</a></li>
            <li><a href="#support" className="font-medium text-muted hover:text-primary text-sm transition-colors">Support</a></li>
          </ul>
          <div className="flex gap-4">
            <Link to="/login" className="bg-primary/10 text-primary px-5 py-2 rounded-lg hover:bg-primary/20 transition-all text-sm font-semibold shadow-sm border border-primary/20">Log In</Link>
            <Link to="/signup" className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-[#0a3d37] transition-all text-sm font-semibold shadow-sm">Sign Up</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
