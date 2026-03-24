import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import Todo from './Todo';
import DashboardLayout from './DashboardLayout';
import { getCurrentUser } from '../utils/auth';

const RepDash = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const stats = [
    { label: 'LEADS ASSIGNED TODAY', value: '14', trend: '+5%', positive: true },
    { label: 'MY PIPELINE VALUE', value: '$52k', trend: '+8%', positive: true },
    { label: 'PERSONAL CONVERSION', value: '28%', trend: '-2%', positive: false },
    { label: 'PENDING FOLLOW-UPS', value: '09', trend: '+1%', positive: true },
  ];

  const initialTodoItems = [
    { id: 1, task: 'Follow up with Rahul regarding Q4 contract', due: 'Today, 2:00 PM', priority: 'High', completed: true },
    { id: 2, task: 'Prepare demo for Sonia Gupta', due: 'Oct 10, 11:00 AM', priority: 'Medium', completed: false },
    { id: 3, task: 'Update pipeline status for Amit Singh', due: 'Oct 11, 4:00 PM', priority: 'Low', completed: false },
  ];

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
    <DashboardLayout 
      role={user?.role}
      userName={user?.fullName || "Sales Representative"} 
      userRole={user?.role?.replace('_', ' ') || "Representative"}
    >
      <div className="flex flex-col xl:flex-row gap-8">
        {/* Left Column */}
        <div className="flex-1 space-y-8 min-w-0">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 transition-transform hover:-translate-y-1">
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

          {/* Daily To-Do List Component */}
          <Todo initialItems={initialTodoItems} title="Daily To-Do List" />

          {/* Active Leads Table */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-[#0e4d46]">Active Leads</h2>
              <button className="text-xs font-bold text-[#5a827d] hover:text-[#0e4d46]">View all</button>
            </div>
            <div className="overflow-x-auto -mx-6">
              <div className="inline-block min-w-full align-middle px-6">
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
                        <td className="py-4 text-sm font-bold text-[#0e4d46] truncate max-w-[120px]">{lead.name}</td>
                        <td className="py-4 whitespace-nowrap">
                           <span className={`text-[10px] font-bold px-3 py-1 rounded-full
                              ${lead.status === 'Qualified' ? 'bg-green-50 text-green-600' : 
                                lead.status === 'New' ? 'bg-blue-50 text-blue-600' : 
                                'bg-gray-50 text-gray-600'}
                           `}>
                               {lead.status}
                           </span>
                        </td>
                        <td className="py-4 text-xs font-semibold text-[#5a827d] whitespace-nowrap">{lead.lastContact}</td>
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
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full xl:w-80 space-y-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-[#0e4d46] mb-6">Target vs Achieved</h3>
              <div className="mb-8 relative">
                  <div className="flex justify-between text-xs font-bold text-[#0e4d46] mb-2">
                      <span>Monthly Deal Goal</span>
                      <span>75%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                         className="h-full bg-[#0e4d46] rounded-full shadow-lg"
                         style={{
                             width: '75%',
                             animation: 'expandWidth 1.5s ease-out forwards'
                         }}
                      ></div>
                  </div>
                  <style>{`
                    @keyframes expandWidth {
                      from { width: 0; }
                      to { width: 75%; }
                    }
                  `}</style>
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
    </DashboardLayout>
  );
};

export default RepDash;
