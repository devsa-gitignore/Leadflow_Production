import React from 'react';
import { 
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, 
  PieChart, Pie 
} from 'recharts';
import DashboardLayout from './DashboardLayout';

const TeamOverview = () => {
  const teamMembers = [
    { name: 'Arjun Raval', role: 'Senior Sales Exec', progress: 92, selected: true },
    { name: 'Ananya Jha', role: 'Account Executive', progress: 78, selected: false },
    { name: 'Priya Jadhav', role: 'Regional Lead', progress: 100, selected: false },
    { name: 'Rohan Shah', role: 'Sales Development', progress: 64, selected: false },
    { name: 'Abhishake Mehta', role: 'Associate Sales', progress: 45, selected: false },
  ];

  // Chart Data
  const revenueData = [
    { name: 'JAN', value: 45 },
    { name: 'FEB', value: 55 },
    { name: 'MAR', value: 40 },
    { name: 'APR', value: 70 },
    { name: 'MAY', value: 85 },
    { name: 'JUN', value: 65 },
  ];

  const stageData = [
    { name: 'Proposal', value: 42, color: '#cbdad8' },
    { name: 'Negotiation', value: 28, color: '#0e4d46' },
    { name: 'Discovery', value: 30, color: '#5a827d' },
  ];

  const quotaData = [
    { name: 'Achieved', value: 92, color: '#0e4d46' },
    { name: 'Remaining', value: 8, color: '#e9f1f0' },
  ];

  // Custom tooltips
  const CustomBarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-xl border border-gray-100 text-sm font-bold text-[#0e4d46]">
          {payload[0].payload.name}: ${payload[0].value}k
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout 
      role="sales_manager"
      userName="Anshika Rawat" 
      userRole="Sales Manager"
    >
      <div className="flex flex-col lg:flex-row w-full bg-[#ecf5f3] rounded-3xl overflow-hidden shadow-sm border border-teal-100">
        
        {/* Left Panel: Team List */}
        <div className="w-full lg:w-[320px] shrink-0 p-6 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-teal-100/50 bg-[#e6f2f0]">
          <h2 className="text-2xl font-bold text-[#0e4d46]">LeadFlow Team</h2>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search executive..." 
              className="w-full py-2.5 pl-10 pr-4 rounded-xl text-sm border-none shadow-sm focus:ring-2 focus:ring-teal-500 text-gray-700 bg-white"
            />
            <svg className="w-4 h-4 absolute left-4 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex flex-col gap-3 pr-1 pb-4">
            {teamMembers.map((member, idx) => (
              <div 
                key={idx} 
                className={`flex items-center p-3.5 rounded-2xl cursor-pointer transition-all ${
                  member.selected 
                    ? 'bg-[#0e4d46] text-white shadow-md transform scale-[1.02] border border-[#0e4d46] my-1' 
                    : 'bg-transparent text-[#0e4d46] hover:bg-white/60 border border-teal-200/50 shadow-sm'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl mr-3 shrink-0 ${member.selected ? 'bg-[#5a827d]/40' : 'bg-[#d0dfdd]'}`}></div>
                <div className="flex-1 min-w-0">
                  <div className={`font-bold text-sm truncate ${member.selected ? 'text-white' : 'text-[#0e4d46]'}`}>
                    {member.name}
                  </div>
                  <div className={`text-xs mt-0.5 font-bold truncate ${member.selected ? 'text-teal-200' : 'text-[#5a827d]'}`}>
                    {member.role}
                  </div>
                </div>
                <div className="w-12 text-right shrink-0">
                  <div className={`text-sm font-extrabold ${member.selected ? 'text-white' : 'text-[#0e4d46]'}`}>
                    {member.progress}%
                  </div>
                  <div className="w-full h-1.5 mt-1.5 rounded-full overflow-hidden bg-black/10">
                    <div 
                      className={`h-full rounded-full ${member.selected ? 'bg-white' : 'bg-[#0e4d46]'}`} 
                      style={{ width: `${Math.min(member.progress, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Main Dashboard Specifics */}
        <div className="flex-1 p-4 md:p-8 min-w-0">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Header Profile Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-5 rounded-3xl shadow-sm border border-teal-50 gap-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-[#d0dfdd] shadow-inner shrink-0"></div>
                <div className="min-w-0">
                  <h1 className="text-xl md:text-2xl font-extrabold text-[#0e4d46] flex items-center gap-2 truncate">
                    Arjun Raval
                    <svg className="w-5 h-5 text-gray-400 mt-1 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </h1>
                  <div className="flex items-center gap-2 mt-1 hidden sm:flex">
                    <span className="text-sm font-bold text-[#5a827d] border-none bg-transparent">Senior Sales Executive</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 bg-[#5a827d] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">Top Performer</span>
                    <span className="px-3 py-1 bg-[#f0f9f7] text-[#0e4d46] border border-teal-100 text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm">Mid-Market</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-4 py-2 hover:bg-[#f0f9f7] text-[#0e4d46] font-bold rounded-xl border border-teal-100 shadow-sm bg-white transition-colors text-sm whitespace-nowrap">
                  Compare Stats
                </button>
                <button className="flex-1 md:flex-none px-4 py-2 bg-[#0e4d46] text-white font-bold rounded-xl shadow-md hover:bg-[#0a3d37] transition-colors text-sm whitespace-nowrap">
                  Send Feedback
                </button>
              </div>
            </div>

            {/* Top Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
              {/* 4 Standard Metrics */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 order-2 lg:order-1">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-teal-50 flex items-center gap-5 transition-transform hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-[#f0f9f7] text-[#0e4d46] flex items-center justify-center shrink-0">
                    <span className="font-extrabold text-xl">$</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] text-[#5a827d] font-bold uppercase tracking-widest mb-1">Total Revenue</div>
                    <div className="text-2xl font-extrabold text-[#0e4d46] truncate">$184,500</div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-teal-50 flex items-center gap-5 transition-transform hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-[#f0f9f7] text-[#0e4d46] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] text-[#5a827d] font-bold uppercase tracking-widest mb-1">Win Rate</div>
                    <div className="text-2xl font-extrabold text-[#0e4d46] truncate">24.8%</div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-teal-50 flex items-center gap-5 transition-transform hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-[#f0f9f7] text-[#0e4d46] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] text-[#5a827d] font-bold uppercase tracking-widest mb-1">Outbound Calls</div>
                    <div className="text-2xl font-extrabold text-[#0e4d46] truncate">1,240</div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-teal-50 flex items-center gap-5 transition-transform hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-[#f0f9f7] text-[#0e4d46] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] text-[#5a827d] font-bold uppercase tracking-widest mb-1">Meetings Set</div>
                    <div className="text-2xl font-extrabold text-[#0e4d46] truncate">42</div>
                  </div>
                </div>
              </div>

              {/* Quota Circle Metric */}
              <div className="lg:col-span-4 bg-white p-6 rounded-3xl shadow-sm border border-teal-50 flex flex-col items-center justify-center text-center order-1 lg:order-2">
                <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                  <PieChart width={144} height={144}>
                    <Pie
                      data={quotaData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={68}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={10}
                    >
                      {quotaData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                  <div className="absolute flex flex-col items-center justify-center mt-1 pointer-events-none">
                    <span className="text-4xl font-extrabold text-[#0e4d46]">92%</span>
                    <span className="text-[9px] text-[#5a827d] font-extrabold uppercase tracking-widest mt-1">Of Quota</span>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <div className="text-sm font-extrabold text-[#0e4d46]">$18.4k to Target</div>
                  <div className="text-xs text-[#5a827d] font-bold mt-1">Ends in 8 days</div>
                </div>
              </div>
            </div>

            {/* Graphical Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Bar Chart Real Component */}
              <div className="lg:col-span-8 bg-white p-4 md:p-7 rounded-3xl shadow-sm border border-teal-50">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h3 className="font-extrabold text-[#0e4d46] text-lg">Monthly Revenue Trend</h3>
                  <div className="flex items-center text-[12px] text-[#0e4d46] font-bold cursor-pointer bg-[#f0f9f7] px-3 py-1.5 rounded-lg border border-teal-100">
                    Last 6 Months
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                <div className="h-56 w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fill: '#5a827d', fontWeight: 'bold' }} 
                        dy={10} 
                      />
                      <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'transparent' }} />
                      <Bar dataKey="value" radius={[6, 6, 6, 6]} barSize={12}>
                        {revenueData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.name === 'MAY' ? '#0e4d46' : '#e9f1f0'} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Stage Distribution Metric */}
              <div className="lg:col-span-4 bg-white p-6 md:p-7 rounded-3xl shadow-sm border border-teal-50 flex flex-col justify-between">
                <h3 className="font-extrabold text-[#0e4d46] text-lg mb-6">Stage Distribution</h3>
                <div className="flex flex-col items-center justify-between mb-8 gap-6">
                  <div className="space-y-4 w-full">
                    <div className="flex items-center gap-3 text-xs w-full justify-between sm:justify-start">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#cbdad8] shrink-0"></div>
                        <span className="text-[#5a827d] font-bold w-16">Proposal</span>
                      </div>
                      <span className="font-extrabold text-[#0e4d46] ml-2">42%</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs w-full justify-between sm:justify-start">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#0e4d46] shrink-0"></div>
                        <span className="text-[#5a827d] font-bold w-16">Negotiation</span>
                      </div>
                      <span className="font-extrabold text-[#0e4d46] ml-2">28%</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs w-full justify-between sm:justify-start">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#5a827d] shrink-0"></div>
                        <span className="text-[#5a827d] font-bold w-16">Discovery</span>
                      </div>
                      <span className="font-extrabold text-[#0e4d46] ml-2">30%</span>
                    </div>
                  </div>
                 
                  <div className="shrink-0 flex items-center justify-center">
                    <PieChart width={120} height={120}>
                      <Pie
                        data={stageData}
                        cx="50%"
                        cy="50%"
                        innerRadius={36}
                        outerRadius={56}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {stageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </div>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-5 mt-auto">
                  <div>
                    <div className="text-[9px] text-[#5a827d] font-bold uppercase tracking-widest mb-1">Active Deals</div>
                    <div className="text-lg font-extrabold text-[#0e4d46]">12</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] text-[#5a827d] font-bold uppercase tracking-widest mb-1">Pipeline Value</div>
                    <div className="text-lg font-extrabold text-[#0e4d46]">$420k</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pb-8">
              <div className="bg-white p-5 rounded-3xl shadow-sm border border-teal-50 text-center flex flex-col justify-center min-h-[112px] transition-transform hover:-translate-y-1">
                <div className="text-[10px] text-[#5a827d] font-extrabold uppercase tracking-widest mb-2">Average Deal Size</div>
                <div className="text-2xl font-extrabold text-[#0e4d46]">$15.4k</div>
              </div>
              <div className="bg-white p-5 rounded-3xl shadow-sm border border-teal-50 text-center flex flex-col justify-center min-h-[112px] transition-transform hover:-translate-y-1">
                <div className="text-[10px] text-[#5a827d] font-extrabold uppercase tracking-widest mb-2">Sales Cycle</div>
                <div className="text-2xl font-extrabold text-[#0e4d46]">22 Days</div>
              </div>
              <div className="bg-white p-5 rounded-3xl shadow-sm border border-teal-50 text-center flex flex-col justify-center min-h-[112px] transition-transform hover:-translate-y-1">
                <div className="text-[10px] text-[#5a827d] font-extrabold uppercase tracking-widest mb-2">Retention Rate</div>
                <div className="text-2xl font-extrabold text-[#0e4d46]">98%</div>
              </div>
              <div className="bg-white p-5 rounded-3xl shadow-sm border border-teal-50 text-center flex flex-col justify-center min-h-[112px] transition-transform hover:-translate-y-1">
                <div className="text-[10px] text-[#5a827d] font-extrabold uppercase tracking-widest mb-2">Leads Handled</div>
                <div className="text-2xl font-extrabold text-[#0e4d46]">145</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeamOverview;

