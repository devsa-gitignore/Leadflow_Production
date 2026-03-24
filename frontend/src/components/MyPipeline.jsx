import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentUser } from '../utils/auth';
import DashboardLayout from './DashboardLayout';

const MyPipeline = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const [lists, setLists] = useState({
    newLead: [
      { id: 'nl1', company: 'Acme Corp Expansion', value: '$45,000', tag: 'HIGH PRIORITY' },
      { id: 'nl2', company: 'Global Logistics Portal', value: '$12,500', tag: 'INQUIRY' },
      { id: 'nl3', company: 'TechSolutions', value: '$28,000', tag: 'MEDIUM PRIORITY' },
      { id: 'nl4', company: 'Global Dynamics', value: '$55,000', tag: 'HIGH PRIORITY' },
      { id: 'nl5', company: 'FinTech Corp', value: '$18,200', tag: 'LOW PRIORITY' },
    ],
    contacted: [
      { id: 'c1', company: 'Stark Industries CRM', value: '$85,000', tag: 'FOLLOW-UP' },
      { id: 'c2', company: 'SolarEnergy Systems', value: '$62,000', tag: 'HIGH PRIORITY' },
      { id: 'c3', company: 'RetailLink', value: '$9,500', tag: 'LOW PRIORITY' },
      { id: 'c4', company: 'GreenLogistics', value: '$34,000', tag: 'MEDIUM PRIORITY' },
    ],
    negotiation: [
      { id: 'n1', company: 'Wayne Enterprises SaaS', value: '$120,000', tag: 'REVIEW' },
      { id: 'n2', company: 'BlueSky Media', value: '$210,000', tag: 'HIGH PRIORITY' },
      { id: 'n3', company: 'Quantum Leap', value: '$42,000', tag: 'MEDIUM PRIORITY' },
      { id: 'n4', company: 'Pioneer Labs', value: '$15,000', tag: 'LOW PRIORITY' },
    ],
    closedLost: [
      { id: 'cl1', company: 'CloudNine Inc', value: '$88,000', tag: 'WON' },
      { id: 'cl2', company: 'Cyberdyne Systems', value: '$30,000', tag: 'LOST' },
      { id: 'cl3', company: 'Ironworks', value: '$12,000', tag: 'WON' },
      { id: 'cl4', company: 'Swift Delivery', value: '$5,000', tag: 'LOST' },
    ]
  });

  const handleDragEnd = (event, info, listKey, cardId) => {
    const trashBin = document.getElementById('trash-bin');
    if (trashBin) {
      const rect = trashBin.getBoundingClientRect();
      const trashCenterX = rect.left + rect.width / 2;
      const trashCenterY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(info.point.x - trashCenterX, 2) + 
        Math.pow(info.point.y - trashCenterY, 2)
      );

      if (distance < 80) {
        setLists(prev => ({
          ...prev,
          [listKey]: prev[listKey].filter(c => c.id !== cardId)
        }));
      }
    }
  };

  const getTagColor = (tag) => {
    switch (tag) {
      case 'HIGH PRIORITY': return 'text-slate-500';
      case 'MEDIUM PRIORITY': return 'text-blue-500';
      case 'LOW PRIORITY': return 'text-orange-500';
      case 'INQUIRY': return 'text-slate-400';
      case 'FOLLOW-UP': return 'text-blue-500';
      case 'REVIEW': return 'text-yellow-500';
      case 'WON': return 'text-green-500';
      case 'LOST': return 'text-red-400';
      default: return 'text-gray-500';
    }
  };

  const renderCard = (card, listKey) => (
    <motion.div
      key={card.id}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      drag
      dragSnapToOrigin
      onDragEnd={(e, info) => handleDragEnd(e, info, listKey, card.id)}
      whileDrag={{ scale: 1.05, zIndex: 100, opacity: 0.85, cursor: 'grabbing' }}
      className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100 flex flex-col justify-between h-24 cursor-grab transition-shadow relative bg-clip-padding touch-none z-10"
    >
      <div className="font-extrabold text-[#0e4d46] text-sm truncate pointer-events-none">{card.company}</div>
      <div className="flex justify-between items-end pointer-events-none">
        <span className="text-slate-400 text-xs font-bold">{card.value}</span>
        <span className={`text-[9px] font-extrabold tracking-widest uppercase ${getTagColor(card.tag)}`}>
          {card.tag}
        </span>
      </div>
    </motion.div>
  );
const currentUser=getCurrentUser();
  return (
    
    <DashboardLayout 
    
      role={currentUser?.role}
      userName={user?.fullName || "Sales Representative"} 
      userRole={user?.role?.replace('_', ' ') || "Representative"}
    >
      <div className="relative z-10 min-h-0">
        <h2 className="text-[11px] text-[#5a827d] font-extrabold uppercase tracking-widest mb-6 px-1">Deal Pipeline</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start relative z-10">
          
          {/* Column: New Lead */}
          <div className="bg-[#f0f7f6] rounded-3xl p-5 border border-teal-50 min-h-[150px]">
            <div className="flex justify-between items-center mb-5 px-1">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                <span className="font-extrabold text-[#0e4d46] text-sm">New Lead</span>
                <span className="bg-slate-200 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-md min-w-[24px] text-center transition-all">
                  {lists.newLead.length}
                </span>
              </div>
              <button className="text-slate-400 font-bold hover:text-slate-600 tracking-widest leading-none">...</button>
            </div>
            <div className="space-y-3 relative">
              <AnimatePresence>
                {lists.newLead.map(card => renderCard(card, 'newLead'))}
              </AnimatePresence>
            </div>
          </div>

          {/* Column: Contacted */}
          <div className="bg-[#f0f7f6] rounded-3xl p-5 border border-teal-50 min-h-[150px]">
            <div className="flex justify-between items-center mb-5 px-1">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span className="font-extrabold text-[#0e4d46] text-sm">Contacted</span>
                <span className="bg-slate-200 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-md min-w-[24px] text-center transition-all">
                  {lists.contacted.length}
                </span>
              </div>
              <button className="text-slate-400 font-bold hover:text-slate-600 tracking-widest leading-none">...</button>
            </div>
            <div className="space-y-3 relative">
              <AnimatePresence>
                {lists.contacted.map(card => renderCard(card, 'contacted'))}
              </AnimatePresence>
            </div>
          </div>

          {/* Column: Negotiation */}
          <div className="bg-[#f0f7f6] rounded-3xl p-5 border border-teal-50 min-h-[150px]">
            <div className="flex justify-between items-center mb-5 px-1">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <span className="font-extrabold text-[#0e4d46] text-sm">Negotiation</span>
                <span className="bg-slate-200 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-md min-w-[24px] text-center transition-all">
                  {lists.negotiation.length}
                </span>
              </div>
              <button className="text-slate-400 font-bold hover:text-slate-600 tracking-widest leading-none">...</button>
            </div>
            <div className="space-y-3 relative">
              <AnimatePresence>
                  {lists.negotiation.map(card => renderCard(card, 'negotiation'))}
              </AnimatePresence>
            </div>
          </div>

          {/* Column: Closed / Lost */}
          <div className="bg-[#f0f7f6] rounded-3xl p-5 border border-teal-50 min-h-[150px]">
            <div className="flex justify-between items-center mb-5 px-1">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="font-extrabold text-[#0e4d46] text-sm">Closed / Lost</span>
                <span className="bg-slate-200 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-md min-w-[24px] text-center transition-all">
                  {lists.closedLost.length}
                </span>
              </div>
              <button className="text-slate-400 font-bold hover:text-slate-600 tracking-widest leading-none">...</button>
            </div>
            <div className="space-y-3 relative">
              <AnimatePresence>
                {lists.closedLost.map(card => renderCard(card, 'closedLost'))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
      
      {/* Trash Bin */}
      <div 
        id="trash-bin"
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex justify-center items-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-[2px] border-dashed border-red-300 transition-all duration-300 z-[100] group overflow-hidden"
      >
        <div className="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <svg className="w-5 h-5 text-red-500 relative pointer-events-none group-hover:rotate-[20deg] transition-all duration-300 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </div>
    </DashboardLayout>
  );
};

export default MyPipeline;
