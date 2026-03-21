import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Calendar from './Calendar';
import Navbar2 from './Navbar2';

const ManagerDash = () => {
  const stats = [
    { label: 'TOTAL PIPELINE VALUE', value: '$1.2M', trend: '+6%', positive: true },
    { label: 'TOTAL REVENUE', value: '$450k', trend: '+8%', positive: true },
    { label: 'TEAM CONVERSION', value: '24%', trend: '-2%', positive: false },
    { label: 'OVERDUE FOLLOW-UPS', value: '12', trend: '5%', positive: true },
    { label: 'DEALS CLOSING', value: '8', trend: '+4%', positive: true },
  ];

  const teamData = [
    { name: 'Arjun', deals: 14, revenue: '$120,000', conv: '28%', followUps: 5 },
    { name: 'Priya', deals: 12, revenue: '$105,000', conv: '24%', followUps: 3 },
    { name: 'Rohan', deals: 10, revenue: '$95,000', conv: '22%', followUps: 8 },
    { name: 'Ananya', deals: 9, revenue: '$85,000', conv: '21%', followUps: 4 },
  ];

  const [todoItems, setTodoItems] = useState([
    { id: 1, task: 'Review Q3 performance with Arjun', due: 'Due today, 4:00 PM', completed: false },
    { id: 2, task: 'Approve discount for Enterprise deal - Rohan', due: 'Due tomorrow, 10:00 AM', completed: false },
    { id: 3, task: 'Prepare weekly regional report', due: 'Due in 2 days', completed: false },
    { id: 4, task: 'Team sync: Pipeline strategy', due: 'Due in 3 days', completed: false },
  ]);
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [newTodo, setNewTodo] = useState({ task: '', due: '' });

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodo.task.trim()) return;
    const newTask = {
      id: Date.now(),
      ...newTodo,
      completed: false
    };
    setTodoItems([newTask, ...todoItems]);
    setNewTodo({ task: '', due: '' });
    setShowAddTodo(false);
  };

  const toggleTodo = (id) => {
    setTodoItems(todoItems.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteTodo = (id) => {
    setTodoItems(todoItems.filter(item => item.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-[#e8f3f1]">
      <Sidebar role="sales_manager" />
      
      <main className="flex-1 ml-64 p-8">
        <Navbar2 
          userName="Anshika Rawat" 
          userRole="Sales Manager" 
        />

        <div className="flex gap-8">
          {/* Left Column (Main Content) */}
          <div className="flex-1 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-5 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <p className="text-[10px] font-bold text-[#5a827d] mb-2 tracking-wider">{stat.label}</p>
                  <div className="flex items-end justify-between">
                    <span className="text-2xl font-extrabold text-[#0e4d46]">{stat.value}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${stat.positive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                      {stat.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Team Overview Table */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-[#0e4d46]">Team Overview</h2>
                <button className="text-xs font-bold text-[#5a827d] hover:text-[#0e4d46] transition-colors">View Full Report</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[10px] font-bold text-[#5a827d] uppercase tracking-wider border-b border-gray-50">
                    <th className="pb-4">Sales Executive</th>
                    <th className="pb-4">Deals Won</th>
                    <th className="pb-4">Revenue</th>
                    <th className="pb-4">Conv %</th>
                    <th className="pb-4 text-center">Follow-ups</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {teamData.map((exec, i) => (
                    <tr key={i} className="group">
                      <td className="py-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#f0f7f6] flex items-center justify-center text-[10px] font-bold text-[#0e4d46]">
                          {exec.name[0]}
                        </div>
                        <span className="text-sm font-bold text-[#0e4d46]">{exec.name}</span>
                      </td>
                      <td className="py-4 text-sm font-semibold text-[#5a827d]">{exec.deals}</td>
                      <td className="py-4 text-sm font-bold text-[#0e4d46]">{exec.revenue}</td>
                      <td className="py-4 text-sm font-semibold text-[#5a827d]">{exec.conv}</td>
                      <td className="py-4 text-center">
                         <span className="text-sm font-bold text-[#0e4d46]">{exec.followUps}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* To-Do List */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-[#0e4d46]">To-Do List</h2>
                <button 
                  onClick={() => setShowAddTodo(!showAddTodo)}
                  className="text-xs font-bold text-[#0e4d46] transition-colors hover:opacity-80"
                >
                  {showAddTodo ? 'Cancel' : '+ Add Task'}
                </button>
              </div>

              {showAddTodo && (
                <form onSubmit={handleAddTodo} className="mb-6 p-4 rounded-2xl bg-[#f8fafb] border border-gray-100 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="What needs to be done?"
                      className="px-4 py-2.5 rounded-xl border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e4d46]/10"
                      value={newTodo.task}
                      onChange={(e) => setNewTodo({...newTodo, task: e.target.value})}
                    />
                    <input 
                      type="text" 
                      placeholder="Due date (e.g. Due today, 4 PM)"
                      className="px-4 py-2.5 rounded-xl border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e4d46]/10"
                      value={newTodo.due}
                      onChange={(e) => setNewTodo({...newTodo, due: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="w-full bg-[#0e4d46] text-white py-2.5 rounded-xl font-bold text-sm hover:bg-[#0a3d37] transition-all">
                    Add to List
                  </button>
                </form>
              )}

              <div className="space-y-4">
                {todoItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#f0f7f6] transition-colors group relative">
                    <button 
                      onClick={() => toggleTodo(item.id)}
                      className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${
                        item.completed ? 'bg-[#0e4d46] border-[#0e4d46]' : 'border-gray-200 group-hover:border-[#0e4d46]'
                      }`}
                    >
                      {item.completed && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>}
                    </button>
                    <div className="flex-1">
                      <p className={`text-sm font-bold text-[#0e4d46] ${item.completed ? 'line-through opacity-50' : ''}`}>{item.task}</p>
                      <p className="text-xs text-[#5a827d]">{item.due}</p>
                    </div>
                    <button 
                      onClick={() => deleteTodo(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-600 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Side Panels) */}
          <div className="w-80 space-y-8">
            {/* Target vs Achieved */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-[#0e4d46] mb-6">Target vs Achieved</h3>
                
                <div className="relative flex justify-center items-center mb-8">
                   <div className="w-40 h-40 rounded-full border-[12px] border-gray-50 flex flex-col items-center justify-center">
                        <span className="text-3xl font-extrabold text-[#0e4d46]">75%</span>
                        <span className="text-[10px] font-bold text-[#5a827d]">Monthly Goal</span>
                   </div>
                   {/* Background progress ring would go here if using SVG, for now keeping it simple with text */}
                </div>

                <div className="flex justify-between items-center px-2">
                    <div className="text-center">
                        <p className="text-[10px] font-bold text-[#5a827d] uppercase mb-1">Current Achieved</p>
                        <p className="text-lg font-bold text-[#0e4d46]">$450k</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-bold text-[#5a827d] uppercase mb-1">Goal Target</p>
                        <p className="text-lg font-bold text-[#0e4d46]">$600k</p>
                    </div>
                </div>
            </div>

            {/* Calendar */}
            <div className="min-h-[500px]">
                <Calendar />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManagerDash;
