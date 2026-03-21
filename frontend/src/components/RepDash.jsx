import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Calendar from './Calendar';
import Navbar2 from './Navbar2';

const RepDash = () => {
  const stats = [
    { label: 'LEADS ASSIGNED TODAY', value: '14', trend: '+5%', positive: true },
    { label: 'MY PIPELINE VALUE', value: '$52k', trend: '+8%', positive: true },
    { label: 'PERSONAL CONVERSION', value: '28%', trend: '-2%', positive: false },
    { label: 'PENDING FOLLOW-UPS', value: '09', trend: '+1%', positive: true },
  ];

  const [todoItems, setTodoItems] = useState([
    { id: 1, task: 'Follow up with Rahul regarding Q4 contract', due: 'Due Today, 2:00 PM', priority: 'High', completed: true },
    { id: 2, task: 'Prepare demo for Sonia Gupta', due: 'Due Oct 10, 11:00 AM', priority: 'Medium', completed: false },
    { id: 3, task: 'Update pipeline status for Amit Singh', due: 'Due Oct 11, 4:00 PM', priority: 'Low', completed: false },
  ]);
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [newTodo, setNewTodo] = useState({ task: '', due: '', priority: 'Medium' });

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodo.task.trim()) return;
    const newTask = {
      id: Date.now(),
      ...newTodo,
      completed: false
    };
    setTodoItems([newTask, ...todoItems]);
    setNewTodo({ task: '', due: '', priority: 'Medium' });
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

  const activeLeads = [
    { name: 'Rahul Mehta', status: 'New', lastContact: '2 hours ago' },
    { name: 'Sonia Gupta', status: 'Qualified', lastContact: 'Yesterday' },
    { name: 'Amit Singh', status: 'Follow-up', lastContact: '2 days ago' },
    { name: 'Priya Rai', status: 'Negotiation', lastContact: '5 hours ago' },
    { name: 'Vikram Seth', status: 'Initial Contact', lastContact: 'Just Now' },
  ];

  const meetings = [
    { title: 'Meeting with Rahul', time: '2:30 PM - 3:30 PM' },
    { title: 'Follow-up Call: Sonia', time: '4:00 PM - 4:15 PM' },
  ];

  return (
    <div className="flex min-h-screen bg-[#e8f3f1]">
      <Sidebar role="sales_representative" />
      
      <main className="flex-1 ml-64 p-8">
        <Navbar2 
          userName="Arjun Rawat" 
          userRole="Sales Representative" 
        />

        <div className="flex gap-8">
          {/* Left Column */}
          <div className="flex-1 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4">
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

            {/* Daily To-Do List */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-[#0e4d46]">Daily To-Do List</h2>
                <button 
                  onClick={() => setShowAddTodo(!showAddTodo)}
                  className="text-xs font-bold text-[#0e4d46] transition-colors hover:opacity-80"
                >
                  {showAddTodo ? 'Cancel' : '+ New Task'}
                </button>
              </div>

              {showAddTodo && (
                <form onSubmit={handleAddTodo} className="mb-6 p-4 rounded-2xl bg-[#f8fafb] border border-gray-100 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <input 
                      type="text" 
                      placeholder="Task description"
                      className="px-4 py-2.5 rounded-xl border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e4d46]/10"
                      value={newTodo.task}
                      onChange={(e) => setNewTodo({...newTodo, task: e.target.value})}
                    />
                    <input 
                      type="text" 
                      placeholder="Due date"
                      className="px-4 py-2.5 rounded-xl border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e4d46]/10"
                      value={newTodo.due}
                      onChange={(e) => setNewTodo({...newTodo, due: e.target.value})}
                    />
                    <select 
                      className="px-4 py-2.5 rounded-xl border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e4d46]/10"
                      value={newTodo.priority}
                      onChange={(e) => setNewTodo({...newTodo, priority: e.target.value})}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-[#0e4d46] text-white py-2.5 rounded-xl font-bold text-sm hover:bg-[#0a3d37] transition-all">
                    Add Task
                  </button>
                </form>
              )}

              <div className="space-y-4">
                {todoItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl border border-gray-50 bg-white hover:shadow-md transition-all group relative">
                    <button 
                      onClick={() => toggleTodo(item.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        item.completed ? 'bg-[#0e4d46] border-[#0e4d46]' : 'border-gray-200 group-hover:border-[#0e4d46]'
                      }`}
                    >
                      {item.completed && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>}
                    </button>
                    <div className="flex-1">
                      <p className={`text-sm font-bold text-[#0e4d46] ${item.completed ? 'line-through opacity-50' : ''}`}>{item.task}</p>
                      <p className="text-xs text-[#5a827d]">{item.due}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider
                          ${item.priority === 'High' ? 'bg-red-50 text-red-500' : 
                            item.priority === 'Medium' ? 'bg-orange-50 text-orange-500' : 
                            'bg-blue-50 text-blue-500'}
                      `}>
                        {item.priority}
                      </span>
                      <button 
                        onClick={() => deleteTodo(item.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-600 transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Leads Table */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-[#0e4d46]">Active Leads</h2>
                <button className="text-xs font-bold text-[#5a827d] hover:text-[#0e4d46]">View all</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[10px] font-bold text-[#5a827d] uppercase tracking-wider border-b border-gray-50">
                    <th className="pb-4">Lead Name</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Last Contact</th>
                    <th className="pb-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {activeLeads.map((lead, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 text-sm font-bold text-[#0e4d46]">{lead.name}</td>
                      <td className="py-4">
                         <span className={`text-[10px] font-bold px-3 py-1 rounded-full
                            ${lead.status === 'Qualified' ? 'bg-green-50 text-green-600' : 
                              lead.status === 'New' ? 'bg-blue-50 text-blue-600' : 
                              'bg-gray-50 text-gray-600'}
                         `}>
                             {lead.status}
                         </span>
                      </td>
                      <td className="py-4 text-xs font-semibold text-[#5a827d]">{lead.lastContact}</td>
                      <td className="py-4">
                        <div className="flex justify-center gap-3">
                           <button className="p-1.5 rounded-lg border border-gray-100 text-[#5a827d] hover:bg-[#0e4d46] hover:text-white transition-all">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                           </button>
                           <button className="p-1.5 rounded-lg border border-gray-100 text-[#5a827d] hover:bg-[#0e4d46] hover:text-white transition-all">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                           </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-80 space-y-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-[#0e4d46] mb-6">Target vs Achieved</h3>
                <div className="mb-8">
                    <div className="flex justify-between text-xs font-bold text-[#0e4d46] mb-2">
                        <span>Monthly Deal Goal</span>
                        <span>75%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#0e4d46] rounded-full w-[75%] shadow-lg"></div>
                    </div>
                </div>

                <div className="flex justify-between items-center px-2">
                    <div className="text-center">
                        <p className="text-[10px] font-bold text-[#5a827d] uppercase mb-1">Current Achieved</p>
                        <p className="text-lg font-bold text-[#0e4d46]">6 Deals</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-bold text-[#5a827d] uppercase mb-1">Goal Target</p>
                        <p className="text-lg font-bold text-[#0e4d46]">10 Deals</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-[#0e4d46] mb-6">Upcoming Meetings</h3>
                <div className="space-y-4">
                  {meetings.map((meeting, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-[#f8fafb] border border-gray-50 group hover:border-[#0e4d46]/20 transition-all cursor-pointer">
                        <p className="text-xs font-bold text-[#0e4d46] mb-1">{meeting.title}</p>
                        <p className="text-[10px] font-medium text-[#5a827d]">{meeting.time}</p>
                    </div>
                  ))}
                </div>
            </div>

            <Calendar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default RepDash;
