import React from 'react';

const Navbar = () => {
  return (
    <nav className="py-6 bg-transparent">
      <div className="container mx-auto px-5 flex justify-between items-center">
        <div className="flex items-center gap-2.5 font-sans font-extrabold text-2xl text-black">
          <div className="w-6 h-6 bg-black rounded" />
          <span>LeadFlow</span>
        </div>
        <ul className="flex gap-8">
          <li><a href="#overview" className="font-medium text-muted hover:text-primary text-sm transition-colors">Overview</a></li>
          <li><a href="#plans" className="font-medium text-muted hover:text-primary text-sm transition-colors">Plans</a></li>
          <li><a href="#support" className="font-medium text-muted hover:text-primary text-sm transition-colors">Support</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
