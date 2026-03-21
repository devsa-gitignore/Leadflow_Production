import React, { useState } from 'react';

const Navbar2 = ({ userName, userRole, profileImage, placeholder }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Standard "Find on Page" functionalitity
    // This will find the text and scroll to it automatically
    const found = window.find(searchQuery, false, false, true, false, true, false);
    
    if (!found) {
      // If not found from current position, search from the beginning
      // We reset the selection by collapsing it
      window.getSelection().collapse(document.body, 0);
      const foundFromStart = window.find(searchQuery, false, false, true, false, true, false);
      if (!foundFromStart) {
        console.log('Text not found on page');
      }
    }
  };

  return (
    <header className="flex justify-between items-center mb-8">
      <form onSubmit={handleSearch} className="relative w-96">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder || "Search leads, team members, or reports..."} 
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0e4d46]/10 text-sm shadow-sm"
        />
        <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0e4d46] transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-400 hover:text-[#0e4d46] transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold text-[#0e4d46]">{userName}</p>
            <p className="text-[10px] font-semibold text-[#5a827d] uppercase tracking-wider">{userRole}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
            {profileImage ? (
              <img src={profileImage} alt={userName} className="w-full h-full object-cover" />
            ) : (
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar2;
