import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import Todo from './Todo';
import { getCurrentUser } from '../utils/auth';
import useDashboardData from '../hooks/useDashboardData';
import { fetchPipelineData } from '../services/pipelineService';

const AnimatedNumber = ({ value, prefix = '', suffix = '', isCurrency = false, duration = 1000 }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;
    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      
      setCurrent(value * easeProgress);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  const formatted = isCurrency 
    ? Math.round(current).toLocaleString() 
    : Number.isInteger(value) 
      ? Math.round(current) 
      : current.toFixed(1);

  return <>{prefix}{formatted}{suffix}</>;
};

const ManagerDash = () => {
  const { data: dashboardData, loading: dashboardLoading, error: dashboardError } = useDashboardData();
  const [pipelineData, setPipelineData] = useState(null);
  const [pipelineLoading, setPipelineLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }

    const getPipeline = async () => {
      try {
        const data = await fetchPipelineData();
        setPipelineData(data.pipeline);
      } catch (err) {
        console.error('Failed to fetch pipeline', err);
      } finally {
        setPipelineLoading(false);
      }
    };

    getPipeline();
  }, []);

  if (dashboardLoading || pipelineLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#0e4d46]/20 border-t-[#0e4d46] rounded-full animate-spin"></div>
          <p className="text-[#5a827d] font-bold text-sm">Synchronizing your dashboard...</p>
        </div>
      </div>
    );
  }

  if (dashboardError) {
    return (
      <div className="bg-red-50 p-8 rounded-3xl border border-red-100 text-center">
        <p className="text-red-600 font-bold mb-2">Failed to load dashboard data</p>
        <p className="text-red-400 text-sm">{dashboardError}</p>
      </div>
    );
  }

  const stats = dashboardData?.stats || [];
  const teamData = dashboardData?.teamData || [];

  const initialTodoItems = [
    { id: 1, task: 'Review Q3 performance with Arjun', due: 'Due today, 4:00 PM', priority: 'High', completed: false },
    { id: 2, task: 'Approve discount for Enterprise deal - Rohan', due: 'Due tomorrow, 10:00 AM', priority: 'Medium', completed: false },
    { id: 3, task: 'Prepare weekly regional report', due: 'Due in 2 days', priority: 'Medium', completed: false },
    { id: 4, task: 'Team sync: Pipeline strategy', due: 'Due in 3 days', priority: 'Low', completed: false },
  ];

  return (
    <div className="flex flex-col xl:flex-row gap-8">
        {/* Left Column (Main Content) */}
        <div className="flex-1 space-y-8 min-w-0">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 transition-transform hover:-translate-y-1">
                <p className="text-[10px] font-bold text-[#5a827d] mb-2 tracking-wider">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-extrabold text-[#0e4d46]">
                    <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} duration={1500} />
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${stat.positive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                    {stat.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pipeline Summary Horizontal Section */}
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
            {pipelineData?.map((stage) => (
              <div key={stage.stage_id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm min-w-[200px] flex-1">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="text-[10px] font-bold text-[#5a827d] uppercase tracking-wider">{stage.stage_name}</h3>
                   <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-50 text-[#0e4d46] rounded-full">{stage.count}</span>
                </div>
                <p className="text-lg font-bold text-[#0e4d46]">${(stage.total_value/1000).toFixed(1)}k</p>
              </div>
            ))}
          </div>

          {/* Team Overview Table */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-[#0e4d46]">Team Overview</h2>
              <button className="text-xs font-bold text-[#5a827d] hover:text-[#0e4d46] transition-colors">View Full Report</button>
            </div>
            <div className="overflow-x-auto -mx-6">
              <div className="inline-block min-w-full align-middle px-6">
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
                      <tr key={i} className="group hover:bg-gray-50 transition-colors">
                        <td className="py-4 flex items-center gap-3 whitespace-nowrap">
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
            </div>
          </div>

          {/* To-Do List Component */}
          <Todo initialItems={initialTodoItems} title="Manager To-Do List" />
        </div>

        {/* Right Column (Side Panels) */}
        <div className="w-full xl:w-80 space-y-8">
          {/* Target vs Achieved */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-[#0e4d46] mb-6">Target vs Achieved</h3>
              
              <div className="relative flex justify-center items-center mb-8">
                 <svg className="w-40 h-40 transform -rotate-90">
                   {/* Background Circle */}
                   <circle
                     cx="80"
                     cy="80"
                     r="70"
                     className="stroke-gray-50"
                     strokeWidth="12"
                     fill="transparent"
                   />
                   {/* Progress Circle */}
                   <circle
                     cx="80"
                     cy="80"
                     r="70"
                     className="stroke-[#0e4d46] transition-all duration-1000 ease-out"
                     strokeWidth="12"
                     fill="transparent"
                     strokeDasharray={2 * Math.PI * 70}
                     strokeDashoffset={2 * Math.PI * 70 * (1 - 0.75)}
                     strokeLinecap="round"
                     style={{
                       animation: 'progress 1.5s ease-out forwards'
                     }}
                   />
                 </svg>
                 <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-3xl font-extrabold text-[#0e4d46]">75%</span>
                      <span className="text-[10px] font-bold text-[#5a827d]">Monthly Goal</span>
                 </div>
                 <style>{`
                   @keyframes progress {
                     from { stroke-dashoffset: ${2 * Math.PI * 70}; }
                     to { stroke-dashoffset: ${2 * Math.PI * 70 * (1 - 0.75)}; }
                   }
                 `}</style>
              </div>

              <div className="flex justify-between items-center px-2">
                  <div className="text-center">
                      <p className="text-[10px] font-bold text-[#5a827d] uppercase mb-1">Current Achieved</p>
                      <p className="text-lg font-bold text-[#0e4d46]">
                         <AnimatedNumber value={450} prefix="$" suffix="k" duration={1500} />
                      </p>
                  </div>
                  <div className="text-center">
                      <p className="text-[10px] font-bold text-[#5a827d] uppercase mb-1">Goal Target</p>
                      <p className="text-lg font-bold text-[#0e4d46]">$600k</p>
                  </div>
              </div>
          </div>

          {/* Calendar */}
          <div className="min-h-0">
              <Calendar variant="mini" />
          </div>
        </div>
      </div>
  );
};

export default ManagerDash;
