import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart, Bar, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import DashboardLayout from './DashboardLayout';
import { getCurrentUser } from '../utils/auth';

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

const hardcodedData = {
  'Last Year': {
    totalRevenue: 5240500,
    activeLeads: 15400,
    conversionRate: 18.5,
    trendData: [
      { month: 'JAN', current: 320000, previous: 280000 },
      { month: 'FEB', current: 380000, previous: 310000 },
      { month: 'MAR', current: 450000, previous: 360000 },
      { month: 'APR', current: 520000, previous: 410000 },
      { month: 'MAY', current: 480000, previous: 430000 },
      { month: 'JUN', current: 610000, previous: 490000 },
      { month: 'JUL', current: 580000, previous: 520000 },
      { month: 'AUG', current: 650000, previous: 550000 },
      { month: 'SEP', current: 590000, previous: 580000 },
      { month: 'OCT', current: 620000, previous: 540000 },
      { month: 'NOV', current: 710000, previous: 620000 },
      { month: 'DEC', current: 850000, previous: 710000 }
    ],
    targetData: [
      { name: 'Achieved', value: 92, color: '#0e4d46' },
      { name: 'Remaining', value: 8, color: '#eef6f4' },
    ],
    achievedAmount: 5240.5,
    targetAmount: 5700.0,
    leadSources: [
      { label: 'Direct Search', value: 45, active: true },
      { label: 'Paid Campaigns', value: 30, active: false },
      { label: 'Referrals', value: 15, active: false },
      { label: 'Social Media', value: 10, active: false },
    ],
    executives: [
      { name: 'Arjun Raval', leads: 4200, conversions: 800, rate: '19.0%', perf: 'EXCELLENT', perfColor: 'bg-emerald-100/70 text-emerald-600' },
      { name: 'Ananya Patel', leads: 3500, conversions: 650, rate: '18.5%', perf: 'EXCELLENT', perfColor: 'bg-emerald-100/70 text-emerald-600' },
      { name: 'Abhishake Mehta', leads: 4100, conversions: 550, rate: '13.4%', perf: 'IMPROVING', perfColor: 'bg-yellow-100/70 text-yellow-600' },
      { name: 'Priya Jadhav', leads: 3600, conversions: 680, rate: '18.8%', perf: 'EXCELLENT', perfColor: 'bg-emerald-100/70 text-emerald-600' }
    ],
    overdue: [
      { company: 'Nova Systems', amount: '$4,120.00', days: 14, isCritical: false }
    ]
  },
  'Last 30 Days': {
    totalRevenue: 128430,
    activeLeads: 1240,
    conversionRate: 14.2,
    trendData: [
      { month: 'WEEK 1', current: 28000, previous: 25000 },
      { month: 'WEEK 2', current: 35000, previous: 31000 },
      { month: 'WEEK 3', current: 25430, previous: 22000 },
      { month: 'WEEK 4', current: 40000, previous: 38000 }
    ],
    targetData: [
      { name: 'Achieved', value: 78, color: '#0e4d46' },
      { name: 'Remaining', value: 22, color: '#eef6f4' },
    ],
    achievedAmount: 98.5,
    targetAmount: 125.0,
    leadSources: [
      { label: 'Direct Search', value: 42, active: true },
      { label: 'Paid Campaigns', value: 28, active: false },
      { label: 'Referrals', value: 18, active: false },
      { label: 'Social Media', value: 12, active: false },
    ],
    executives: [
      { name: 'Arjun Raval', leads: 245, conversions: 48, rate: '19.5%', perf: 'ABOVE AVG', perfColor: 'bg-emerald-100/70 text-emerald-600' },
      { name: 'Ananya Patel', leads: 182, conversions: 32, rate: '17.6%', perf: 'ON TRACK', perfColor: 'bg-slate-100 text-slate-500' },
      { name: 'Abhishake Mehta', leads: 210, conversions: 24, rate: '11.4%', perf: 'ACTION REQ', perfColor: 'bg-red-100/70 text-red-500' },
      { name: 'Priya Jadhav', leads: 156, conversions: 28, rate: '17.9%', perf: 'ON TRACK', perfColor: 'bg-slate-100 text-slate-500' }
    ],
    overdue: [
      { company: 'Acme Global Ltd', amount: '$12,400.00', days: 45, isCritical: true },
      { company: 'TechSphere Inc', amount: '$8,250.00', days: 32, isCritical: true },
      { company: 'Nova Systems', amount: '$4,120.00', days: 14, isCritical: false },
      { company: 'Summit Corp', amount: '$2,800.00', days: 8, isCritical: false }
    ]
  },
  'Last Week': {
    totalRevenue: 34500,
    activeLeads: 290,
    conversionRate: 16.5,
    trendData: [
      { month: 'MON', current: 3000, previous: 2500 },
      { month: 'TUE', current: 4000, previous: 3500 },
      { month: 'WED', current: 5500, previous: 4500 },
      { month: 'THU', current: 6000, previous: 5000 },
      { month: 'FRI', current: 8000, previous: 7000 },
      { month: 'SAT', current: 4500, previous: 3000 },
      { month: 'SUN', current: 3500, previous: 2000 }
    ],
    targetData: [
      { name: 'Achieved', value: 85, color: '#0e4d46' },
      { name: 'Remaining', value: 15, color: '#eef6f4' },
    ],
    achievedAmount: 34.5,
    targetAmount: 40.0,
    leadSources: [
      { label: 'Direct Search', value: 50, active: true },
      { label: 'Paid Campaigns', value: 30, active: false },
      { label: 'Referrals', value: 15, active: false },
      { label: 'Social Media', value: 5, active: false },
    ],
    executives: [
      { name: 'Arjun Raval', leads: 80, conversions: 20, rate: '25.0%', perf: 'EXCELLENT', perfColor: 'bg-emerald-100/70 text-emerald-600' },
      { name: 'Ananya Patel', leads: 60, conversions: 10, rate: '16.6%', perf: 'ON TRACK', perfColor: 'bg-slate-100 text-slate-500' },
      { name: 'Abhishake Mehta', leads: 90, conversions: 12, rate: '13.3%', perf: 'IMPROVING', perfColor: 'bg-yellow-100/70 text-yellow-600' },
      { name: 'Priya Jadhav', leads: 60, conversions: 15, rate: '25.0%', perf: 'EXCELLENT', perfColor: 'bg-emerald-100/70 text-emerald-600' }
    ],
    overdue: [
      { company: 'Acme Global Ltd', amount: '$12,400.00', days: 45, isCritical: true },
      { company: 'TechSphere Inc', amount: '$8,250.00', days: 32, isCritical: true }
    ]
  },
  'Yesterday': {
    totalRevenue: 5400,
    activeLeads: 45,
    conversionRate: 18.0,
    trendData: [
      { month: '9 AM', current: 500, previous: 400 },
      { month: '11 AM', current: 800, previous: 600 },
      { month: '1 PM', current: 1200, previous: 900 },
      { month: '3 PM', current: 1500, previous: 1100 },
      { month: '5 PM', current: 900, previous: 800 },
      { month: '7 PM', current: 500, previous: 400 }
    ],
    targetData: [
      { name: 'Achieved', value: 90, color: '#0e4d46' },
      { name: 'Remaining', value: 10, color: '#eef6f4' },
    ],
    achievedAmount: 5.4,
    targetAmount: 6.0,
    leadSources: [
      { label: 'Direct Search', value: 60, active: true },
      { label: 'Paid Campaigns', value: 20, active: false },
      { label: 'Referrals', value: 10, active: false },
      { label: 'Social Media', value: 10, active: false },
    ],
    executives: [
      { name: 'Arjun Raval', leads: 15, conversions: 5, rate: '33.3%', perf: 'EXCELLENT', perfColor: 'bg-emerald-100/70 text-emerald-600' },
      { name: 'Ananya Patel', leads: 10, conversions: 2, rate: '20.0%', perf: 'ON TRACK', perfColor: 'bg-slate-100 text-slate-500' },
      { name: 'Abhishake Mehta', leads: 12, conversions: 1, rate: '8.3%', perf: 'ACTION REQ', perfColor: 'bg-red-100/70 text-red-500' },
      { name: 'Priya Jadhav', leads: 8, conversions: 2, rate: '25.0%', perf: 'ON TRACK', perfColor: 'bg-slate-100 text-slate-500' }
    ],
    overdue: [
      { company: 'Nova Systems', amount: '$4,120.00', days: 14, isCritical: false }
    ]
  }
};

import { fetchReportsSummary } from '../services/reportService';

const Reports = () => {
  const [user, setUser] = useState(null);
  const [timeRange, setTimeRange] = useState('Last 30 Days');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Real backend data state
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  const mapRangeToQuery = (rangeStr) => {
    if (rangeStr === 'Last 30 Days') return 'last_30_days';
    if (rangeStr === 'Last Week') return 'last_week';
    if (rangeStr === 'Last Year') return 'last_year';
    if (rangeStr === 'Yesterday') return 'yesterday';
    return 'last_30_days';
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const queryRange = mapRangeToQuery(timeRange);
        const backendData = await fetchReportsSummary(queryRange);
        setApiData(backendData);
      } catch (error) {
        console.error("Failed to load reports data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [timeRange]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const baseData = hardcodedData[timeRange];
  
  const calculateLeadSources = () => {
    if (!apiData?.lead_source_performance) return baseData.leadSources;
    
    const p = apiData.lead_source_performance;
    const total = p.DIRECT + p.PAID + p.REFERRAL + p.SOCIAL;
    
    if (total === 0) return baseData.leadSources;
    
    return [
      { label: 'Direct Search', value: Math.round((p.DIRECT / total) * 100), active: p.DIRECT > 0 },
      { label: 'Paid Campaigns', value: Math.round((p.PAID / total) * 100), active: p.PAID > 0 },
      { label: 'Referrals', value: Math.round((p.REFERRAL / total) * 100), active: p.REFERRAL > 0 },
      { label: 'Social Media', value: Math.round((p.SOCIAL / total) * 100), active: p.SOCIAL > 0 },
    ].sort((a, b) => b.value - a.value);
  };
  
  const calculateTrendData = () => {
    if (!apiData?.trend_data) return baseData.trendData;
    
    return apiData.trend_data.map((item, idx) => ({
      month: item.month.toUpperCase(),
      current: item.amount,
      previous: baseData.trendData[idx]?.previous || 0
    }));
  };
  
  // Merge API data with base UI data
  const data = apiData ? {
    ...baseData,
    totalRevenue: apiData.total_revenue,
    activeLeads: apiData.deals_closed, // Mapping deals closed to the 'Active Leads' card
    conversionRate: apiData.conversion_rate,
    
    // Map Revenue Trend
    trendData: calculateTrendData(),
    
    // Map Invoices to Pie Chart
    targetData: [
      { name: 'Paid', value: apiData.paid_amount, color: '#0e4d46' },
      { name: 'Pending', value: apiData.pending_amount, color: '#f59e0b' },
      { name: 'Overdue', value: apiData.overdue_amount, color: '#ef4444' }
    ],
    // Provide safe defaults for the center text
    achievedAmount: apiData.paid_amount,
    targetAmount: apiData.total_invoiced,
    
    // Map Lead Source Performance
    leadSources: calculateLeadSources(),
  } : baseData;


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
    <div className="relative z-10 w-full">
        
        {/* Top Global Controls */}
        <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-4 mb-8">
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-40 gap-2 bg-white px-4 py-2.5 rounded-xl text-xs font-extrabold text-[#5a827d] shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-white hover:border-teal-50 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {timeRange}
              </div>
              <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-12 left-0 w-40 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden z-50">
                {Object.keys(hardcodedData).map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setTimeRange(range);
                      setIsDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2.5 text-xs font-extrabold transition-colors hover:bg-slate-50 ${timeRange === range ? 'text-[#0e4d46] bg-slate-50' : 'text-[#5a827d]'}`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>

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
              <span className="text-2xl md:text-3xl font-extrabold text-[#0e4d46]">
                <AnimatedNumber value={data.totalRevenue} prefix="$" isCurrency duration={1500} />
              </span>
              <span className="text-[10px] font-extrabold text-emerald-500 tracking-wide">+12.5%</span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#0e4d46] rounded-full" style={{ width: '65%', transition: 'width 1s ease-in-out' }}></div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] relative overflow-hidden transition-all hover:-translate-y-1">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-extrabold text-[#5a827d] uppercase tracking-widest">Active Leads</span>
              <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl md:text-3xl font-extrabold text-[#0e4d46]">
                <AnimatedNumber value={data.activeLeads} isCurrency={true} duration={1500} />
              </span>
              <span className="text-[10px] font-extrabold text-emerald-500 tracking-wide">+5.2%</span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#0e4d46] rounded-full" style={{ width: '85%', transition: 'width 1s ease-in-out' }}></div>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] relative overflow-hidden transition-all hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-extrabold text-[#5a827d] uppercase tracking-widest">Conversion Rate</span>
              <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl md:text-3xl font-extrabold text-[#0e4d46]">
                <AnimatedNumber value={data.conversionRate} suffix="%" duration={1500} />
              </span>
              <span className="text-[10px] font-extrabold text-red-500 tracking-wide">-1.1%</span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#5a827d] rounded-full" style={{ width: '42%', transition: 'width 1s ease-in-out' }}></div>
            </div>
          </div>

        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Grouped Bar Chart */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-7 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col justify-between overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h3 className="font-extrabold text-[#0e4d46] text-base">Revenue Trend</h3>
                <div className="text-[10px] font-bold text-[#5a827d] mt-1">Total gross revenue across all channels</div>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-extrabold text-[#5a827d]">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#0e4d46]"></div> Current</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#e2e8f0]"></div> Previous</div>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.trendData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }} barGap={2}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 'bold' }} dy={10} />
                  <RechartsTooltip cursor={{ fill: 'transparent' }} content={<CustomBarTooltip />} />
                  <Bar dataKey="previous" fill="#e2e8f0" radius={[4, 4, 4, 4]} barSize={12} animationDuration={1500} />
                  <Bar dataKey="current" fill="#0e4d46" radius={[4, 4, 4, 4]} barSize={12} animationDuration={1500} />
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
                    <Pie data={data.targetData} cx="50%" cy="50%" innerRadius="70%" outerRadius="90%" startAngle={90} endAngle={-270} dataKey="value" stroke="none" cornerRadius={10} animationDuration={1500}>
                      {data.targetData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute flex flex-col items-center justify-center mt-1 pointer-events-none">
                  <span className="text-2xl md:text-3xl font-extrabold text-[#0e4d46]">
                    <AnimatedNumber value={data.targetData[0].value} suffix="%" duration={1500} />
                  </span>
                  <span className="text-[8px] text-[#5a827d] font-bold mt-1 uppercase tracking-widest">Goal</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-5 border-t border-slate-50 space-y-3">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-[#5a827d] font-bold uppercase tracking-widest">Achieved</span>
                <span className="text-[#0e4d46] font-extrabold">
                  <AnimatedNumber value={data.achievedAmount} prefix="$" suffix="k" duration={1500} />
                </span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-[#5a827d] font-bold uppercase tracking-widest">Target</span>
                <span className="text-[#0e4d46] font-extrabold">
                  <AnimatedNumber value={data.targetAmount} prefix="$" suffix="k" duration={1500} />
                </span>
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
              {data.leadSources.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-[10px] font-extrabold text-[#0e4d46] mb-2">
                    <span>{item.label}</span>
                    <span><AnimatedNumber value={item.value} suffix="%" duration={1500} /></span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.active ? 'bg-[#0e4d46]' : 'bg-[#cbdad8]'}`} style={{ width: `${item.value}%`, transition: 'width 1s ease-in-out' }}></div>
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
                  {data.executives.map((exec, idx) => (
                    <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                      <td className="py-4 text-xs font-extrabold text-[#0e4d46]">{exec.name}</td>
                      <td className="py-4 text-xs font-bold text-[#5a827d]">
                        <AnimatedNumber value={exec.leads} duration={1500} />
                      </td>
                      <td className="py-4 text-xs font-bold text-[#5a827d]">
                        <AnimatedNumber value={exec.conversions} duration={1500} />
                      </td>
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
              <span className="bg-red-100/80 text-red-500 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1.5 rounded-md">{data.overdue.filter(i => i.isCritical).length} Critical</span>
            </div>
            <button className="text-[9px] font-extrabold text-[#0e4d46] uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
              View All
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.overdue.map((inv, idx) => (
              <div key={idx} className="bg-white p-5 rounded-3xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-transparent hover:border-teal-50 transition-all hover:-translate-y-1 hover:shadow-md flex flex-col justify-center cursor-pointer overflow-hidden">
                <div className="text-[10px] font-extrabold text-[#5a827d] mb-1 truncate uppercase tracking-widest">{inv.company}</div>
                <div className="text-xl font-extrabold text-[#0e4d46] mb-3 mt-1">{inv.amount}</div>
                <div className={`flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest ${inv.isCritical ? 'text-red-500' : 'text-orange-400'}`}>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {inv.days} Days Overdue
                </div>
              </div>
            ))}
            {data.overdue.length === 0 && (
              <div className="col-span-full py-8 text-center text-sm font-bold text-slate-400">
                No overdue invoices found for this period.
              </div>
            )}
          </div>
        </div>

      </div>
  );
};

export default Reports;
