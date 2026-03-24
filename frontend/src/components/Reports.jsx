import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import DashboardLayout from './DashboardLayout';
import { getCurrentUser } from '../utils/auth';

const Reports = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // Recharts Data Mocks
  const trendData = [
    { month: 'JAN', current: 25000, previous: 15000 },
    { month: 'FEB', current: 42000, previous: 60000 },
    { month: 'MAR', current: 58000, previous: 35000 },
    { month: 'APR', current: 30000, previous: 45000 },
    { month: 'MAY', current: 65000, previous: 80000 },
    { month: 'JUN', current: 75000, previous: 55000 },
    { month: 'JUL', current: 68000, previous: 45000 },
    { month: 'AUG', current: 95000, previous: 65000 }
  ];

  const targetData = [
    { name: 'Achieved', value: 78, color: '#0e4d46' },
    { name: 'Remaining', value: 22, color: '#eef6f4' },
  ];

  // Table & List Data
  const executiveData = [
    { name: 'Arjun Raval', leads: 245, conversions: 48, rate: '19.5%', perf: 'ABOVE AVG', perfColor: 'bg-emerald-100/70 text-emerald-600' },
    { name: 'Ananya Patel', leads: 182, conversions: 32, rate: '17.6%', perf: 'ON TRACK', perfColor: 'bg-slate-100 text-slate-500' },
    { name: 'Abhishake Mehta', leads: 210, conversions: 24, rate: '11.4%', perf: 'ACTION REQ', perfColor: 'bg-red-100/70 text-red-500' },
    { name: 'Priya Jadhav', leads: 156, conversions: 28, rate: '17.9%', perf: 'ON TRACK', perfColor: 'bg-slate-100 text-slate-500' }
  ];

  const overdueInvoices = [
    { company: 'Acme Global Ltd', amount: '$12,400.00', days: 45, isCritical: true },
    { company: 'TechSphere Inc', amount: '$8,250.00', days: 32, isCritical: true },
    { company: 'Nova Systems', amount: '$4,120.00', days: 14, isCritical: false },
    { company: 'Summit Corp', amount: '$2,800.00', days: 8, isCritical: false }
  ];

  const CustomBarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-xl border border-gray-100 text-xs font-bold text-[#0e4d46]">
          <div className="mb-1 text-slate-400">{payload[0].payload.month}</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#0e4d46]"></div> Current: ${payload[0].value.toLocaleString()}</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#cbdad8]"></div> Previous: ${payload[1].value.toLocaleString()}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout 
      role="sales_rep"
      userName={user?.fullName || "Arjun Raval"} 
      userRole={user?.role?.replace('_', ' ') || "Representative"}
    >
      <div className="relative z-10 w-full">
        
        {/* Top Global Controls */}
        <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-4 mb-8">
          <button className="flex items-center justify-center gap-2 bg-white px-4 py-2.5 rounded-xl text-xs font-extrabold text-[#5a827d] shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-white hover:border-teal-50 hover:shadow-sm transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Last 30 Days
            <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
          </button>

          <div className="flex rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-white hover:border-teal-50 hover:shadow-sm overflow-hidden transition-all bg-white">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-extrabold text-white bg-[#0e4d46] hover:bg-[#0a3d37] transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Export
            </button>
            <button className="flex-1 sm:flex-none px-5 py-2.5 text-[10px] font-extrabold text-[#5a827d] hover:bg-slate-50 uppercase tracking-widest transition-colors border-l border-slate-50">
              CSV/PDF
            </button>
          </div>
        </div>

        {/* Quick Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Metric 1 */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] relative overflow-hidden transition-all hover:-translate-y-1">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-extrabold text-[#5a827d] uppercase tracking-widest">Total Revenue</span>
              <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl md:text-3xl font-extrabold text-[#0e4d46]">$128,430</span>
              <span className="text-[10px] font-extrabold text-emerald-500 tracking-wide">+12.5%</span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#0e4d46] rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] relative overflow-hidden transition-all hover:-translate-y-1">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-extrabold text-[#5a827d] uppercase tracking-widest">Active Leads</span>
              <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl md:text-3xl font-extrabold text-[#0e4d46]">1,240</span>
              <span className="text-[10px] font-extrabold text-emerald-500 tracking-wide">+5.2%</span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#0e4d46] rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] relative overflow-hidden transition-all hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-extrabold text-[#5a827d] uppercase tracking-widest">Conversion Rate</span>
              <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl md:text-3xl font-extrabold text-[#0e4d46]">14.2%</span>
              <span className="text-[10px] font-extrabold text-red-500 tracking-wide">-1.1%</span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#5a827d] rounded-full" style={{ width: '42%' }}></div>
            </div>
          </div>

        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Grouped Bar Chart */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-7 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col justify-between overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h3 className="font-extrabold text-[#0e4d46] text-base">Revenue Trend (Monthly)</h3>
                <div className="text-[10px] font-bold text-[#5a827d] mt-1">Total gross revenue across all channels</div>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-extrabold text-[#5a827d]">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#0e4d46]"></div> Current</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#e2e8f0]"></div> Previous</div>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }} barGap={2}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 'bold' }} dy={10} />
                  <RechartsTooltip cursor={{ fill: 'transparent' }} content={<CustomBarTooltip />} />
                  <Bar dataKey="previous" fill="#e2e8f0" radius={[4, 4, 4, 4]} barSize={12} />
                  <Bar dataKey="current" fill="#0e4d46" radius={[4, 4, 4, 4]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Target vs Achievement Radial */}
          <div className="lg:col-span-1 bg-white rounded-3xl p-6 md:p-7 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col justify-between relative overflow-hidden">
            <h3 className="font-extrabold text-[#0e4d46] text-base mb-4">Target vs Achievement</h3>
            <div className="flex flex-col items-center justify-center flex-1">
              <div className="relative w-40 h-40 md:w-44 md:h-44 flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={targetData} cx="50%" cy="50%" innerRadius="70%" outerRadius="90%" startAngle={90} endAngle={-270} dataKey="value" stroke="none" cornerRadius={10}>
                      {targetData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute flex flex-col items-center justify-center mt-1 pointer-events-none">
                  <span className="text-2xl md:text-3xl font-extrabold text-[#0e4d46]">78%</span>
                  <span className="text-[8px] text-[#5a827d] font-bold mt-1 uppercase tracking-widest">Goal</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-5 border-t border-slate-50 space-y-3">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-[#5a827d] font-bold uppercase tracking-widest">Achieved</span>
                <span className="text-[#0e4d46] font-extrabold">$98.5k</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-[#5a827d] font-bold uppercase tracking-widest">Target</span>
                <span className="text-[#0e4d46] font-extrabold">$125.0k</span>
              </div>
            </div>
          </div>

        </div>

        {/* Table & ProgressBar Split Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Lead Source Performance */}
          <div className="lg:col-span-1 bg-white rounded-3xl p-6 md:p-7 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col overflow-hidden">
            <h3 className="font-extrabold text-[#0e4d46] text-sm mb-6">Lead Source Performance</h3>
            <div className="space-y-6 flex-1">
              {[
                { label: 'Direct Search', value: '42%', width: '42%', active: true },
                { label: 'Paid Campaigns', value: '28%', width: '28%', active: false },
                { label: 'Referrals', value: '18%', width: '18%', active: false },
                { label: 'Social Media', value: '12%', width: '12%', active: false },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-[10px] font-extrabold text-[#0e4d46] mb-2">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.active ? 'bg-[#0e4d46]' : 'bg-[#cbdad8]'}`} style={{ width: item.width }}></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full text-center text-[9px] font-extrabold text-[#5a827d] uppercase tracking-widest mt-8 pt-4 border-t border-slate-50 hover:text-[#0e4d46] transition-colors">
              View Source Breakdown
            </button>
          </div>

          {/* Conversion by Executive Table */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-7 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-x-auto -mx-4 md:mx-0">
            <div className="px-4 md:px-0 min-w-[500px]">
              <h3 className="font-extrabold text-[#0e4d46] text-sm mb-6">Conversion by Executive</h3>
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-[9px] font-extrabold text-[#5a827d] uppercase tracking-widest">
                    <th className="pb-3 min-w-[140px]">Executive</th>
                    <th className="pb-3 min-w-[100px]">Leads</th>
                    <th className="pb-3 min-w-[100px]">Convs</th>
                    <th className="pb-3 min-w-[100px]">Rate</th>
                    <th className="pb-3 text-right min-w-[120px]">Performance</th>
                  </tr>
                </thead>
                <tbody className="">
                  {executiveData.map((exec, idx) => (
                    <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                      <td className="py-4 text-xs font-extrabold text-[#0e4d46]">{exec.name}</td>
                      <td className="py-4 text-xs font-bold text-[#5a827d]">{exec.leads}</td>
                      <td className="py-4 text-xs font-bold text-[#5a827d]">{exec.conversions}</td>
                      <td className="py-4 text-xs font-bold text-[#5a827d]">{exec.rate}</td>
                      <td className="py-4 text-right">
                        <span className={`px-2.5 py-1.5 rounded-lg text-[9px] font-extrabold tracking-widest uppercase ${exec.perfColor}`}>
                          {exec.perf}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Bottom Overdue Invoices Float Row */}
        <div className="mb-10 mt-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 px-1 gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-base font-extrabold text-[#0e4d46]">Overdue Invoices</h3>
              <span className="bg-red-100/80 text-red-500 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1.5 rounded-md">4 Critical</span>
            </div>
            <button className="text-[9px] font-extrabold text-[#0e4d46] uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
              View All
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {overdueInvoices.map((inv, idx) => (
              <div key={idx} className="bg-white p-5 rounded-3xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-transparent hover:border-teal-50 transition-all hover:-translate-y-1 hover:shadow-md flex flex-col justify-center cursor-pointer overflow-hidden">
                <div className="text-[10px] font-extrabold text-[#5a827d] mb-1 truncate uppercase tracking-widest">{inv.company}</div>
                <div className="text-xl font-extrabold text-[#0e4d46] mb-3 mt-1">{inv.amount}</div>
                <div className={`flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest ${inv.isCritical ? 'text-red-500' : 'text-orange-400'}`}>
                  {/* Clock Icon */}
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {inv.days} Days Overdue
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Reports;
