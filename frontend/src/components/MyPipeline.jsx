import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentUser } from '../utils/auth';
import DashboardLayout from './DashboardLayout';

const MyPipeline = () => {
  const [user, setUser] = useState(null);
  const [isOverTrash, setIsOverTrash] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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

  const checkTrashProximity = (info) => {
    const trashBin = document.getElementById('trash-bin');
    if (trashBin) {
      const rect = trashBin.getBoundingClientRect();
      const trashCenterX = rect.left + rect.width / 2;
      const trashCenterY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(info.point.x - trashCenterX, 2) + 
        Math.pow(info.point.y - trashCenterY, 2)
      );

      setIsOverTrash(distance < 80);
      return distance < 80;
    }
    return false;
  };

  const handleDragEnd = (event, info, listKey, card) => {
    const isOver = checkTrashProximity(info);
    setIsOverTrash(false);

    if (isOver) {
      setItemToDelete({ ...card, listKey });
    }
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setLists(prev => ({
        ...prev,
        [itemToDelete.listKey]: prev[itemToDelete.listKey].filter(c => c.id !== itemToDelete.id)
      }));
      setItemToDelete(null);
    }
  };

  const cancelDelete = () => {
    setItemToDelete(null);
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
      onDrag={(e, info) => checkTrashProximity(info)}
      onDragEnd={(e, info) => handleDragEnd(e, info, listKey, card)}
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
      <motion.div 
        id="trash-bin"
        animate={{ 
          scale: isOverTrash ? 1.3 : 1,
          x: isOverTrash ? [-1, 1, -1, 1, 0] : 0,
        }}
        transition={{
          x: { repeat: Infinity, duration: 0.2 },
          scale: { type: "spring", stiffness: 300, damping: 20 }
        }}
        className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex justify-center items-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-[2.5px] border-dashed transition-colors duration-300 z-[100] group overflow-hidden ${isOverTrash ? 'border-red-500 bg-red-50' : 'border-red-300'}`}
      >
        <div className={`absolute inset-0 bg-red-100 transition-opacity ${isOverTrash ? 'opacity-40' : 'opacity-0'}`}></div>
        <svg className={`w-6 h-6 relative pointer-events-none transition-all duration-300 z-10 ${isOverTrash ? 'text-red-600 rotate-12 scale-110' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </motion.div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {itemToDelete && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={cancelDelete}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex justify-center items-center mb-6">
                  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h3 className="text-xl font-extrabold text-[#0e4d46] mb-2">Delete Lead?</h3>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                  Are you sure you want to delete <span className="font-bold text-[#0e4d46]">"{itemToDelete.company}"</span>? This action cannot be undone.
                </p>
                <div className="flex gap-3 w-full">
                  <button
                    onClick={cancelDelete}
                    className="flex-1 px-6 py-3.5 rounded-xl border border-gray-200 text-slate-600 font-bold text-sm hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 px-6 py-3.5 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 shadow-lg shadow-red-200 transition-all active:scale-95"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default MyPipeline;
