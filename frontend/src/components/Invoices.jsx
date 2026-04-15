import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { getCurrentUser } from '../utils/auth';

const Invoices = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // Mock Invoice List for Pagination
  const allInvoices = [
    { id: 'INV-001', client: 'Acme Corp', date: 'Oct 24, 2023', amount: '$12,000.00', status: 'PAID' },
    { id: 'INV-002', client: 'Global Tech', date: 'Oct 26, 2023', amount: '$8,500.00', status: 'PENDING' },
    { id: 'INV-003', client: 'Starlight Inc', date: 'Oct 20, 2023', amount: '$4,000.00', status: 'OVERDUE' },
    { id: 'INV-004', client: 'Riverstone Ltd', date: 'Oct 28, 2023', amount: '$15,200.00', status: 'PAID' },
    { id: 'INV-005', client: 'Nexus Solutions', date: 'Oct 30, 2023', amount: '$6,300.00', status: 'PENDING' },
    { id: 'INV-006', client: 'Alpha Industries', date: 'Nov 01, 2023', amount: '$19,200.00', status: 'PAID' },
    { id: 'INV-007', client: 'Beta Systems', date: 'Nov 02, 2023', amount: '$3,100.00', status: 'OVERDUE' },
    { id: 'INV-008', client: 'Delta Corp', date: 'Nov 05, 2023', amount: '$18,500.00', status: 'PENDING' },
    { id: 'INV-009', client: 'Omega Partners', date: 'Nov 06, 2023', amount: '$22,000.00', status: 'PAID' },
    { id: 'INV-010', client: 'Sigma LLC', date: 'Nov 08, 2023', amount: '$5,400.00', status: 'PAID' },
    { id: 'INV-011', client: 'Zeta Global', date: 'Nov 10, 2023', amount: '$11,700.00', status: 'PENDING' },
    { id: 'INV-012', client: 'Epsilon Tech', date: 'Nov 12, 2023', amount: '$7,800.00', status: 'OVERDUE' },
    { id: 'INV-013', client: 'TechWave', date: 'Nov 15, 2023', amount: '$14,300.00', status: 'PAID' },
    { id: 'INV-014', client: 'Smart Solutions', date: 'Nov 18, 2023', amount: '$2,900.00', status: 'PENDING' },
    { id: 'INV-015', client: 'NextGen Inc', date: 'Nov 20, 2023', amount: '$9,500.00', status: 'PAID' },
    { id: 'INV-016', client: 'Pinnacle Data', date: 'Nov 22, 2023', amount: '$6,800.00', status: 'PAID' },
    { id: 'INV-017', client: 'Nova Dynamics', date: 'Nov 24, 2023', amount: '$21,400.00', status: 'PENDING' },
  ];

  // Logic State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter and Search Processor
  const filteredInvoices = allInvoices.filter(inv => {
    const matchesSearch = inv.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          inv.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || inv.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Calculate Pagination Extents
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  
  // Guard clause to fallback robustly if user filters down to 0 items from Page 3 etc.
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }

  // Splice currently visible slice
  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const metrics = [
    {
      title: 'Total Invoiced', value: '$124,500.00', subtext: '+12% this month', subColor: 'text-emerald-500',
      icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
    },
    {
      title: 'Pending Payments', value: '$32,400.00', subtext: '8 invoices pending', subColor: 'text-slate-400',
      icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    {
      title: 'Paid', value: '$88,100.00', subtext: '+18% from last month', subColor: 'text-emerald-500',
      icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    {
      title: 'Overdue', value: '$4,000.00', textColor: 'text-red-500', subtext: '3 invoices overdue', subColor: 'text-red-400',
      icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    }
  ];

  const StatusBadge = ({ status }) => {
    const styles = {
      PAID: 'bg-emerald-100/70 text-emerald-600',
      PENDING: 'bg-amber-100/70 text-amber-600',
      OVERDUE: 'bg-red-100/70 text-red-500',
    }[status];

    return (
      <span className={`px-2.5 py-1.5 rounded-lg text-[9px] font-extrabold tracking-widest uppercase ${styles}`}>
        {status}
      </span>
    );
  };

  return (
    <DashboardLayout 
      role="sales_rep"
      userName={user?.fullName || "Arjun Raval"} 
      userRole={user?.role?.replace('_', ' ') || "Representative"}
    >
      <div className="relative z-10 w-full">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {metrics.map((kpi, idx) => (
            <div 
              key={idx} 
              className="bg-white p-6 rounded-3xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100 flex flex-col justify-center transition-all hover:-translate-y-1 hover:shadow-lg cursor-default"
            >
              <div className="text-[10px] text-[#5a827d] font-extrabold uppercase tracking-widest mb-3">
                {kpi.title}
              </div>
              <div className={`text-2xl md:text-3xl font-extrabold tracking-tight mb-3 ${kpi.textColor || 'text-[#0e4d46]'}`}>
                {kpi.value}
              </div>
              <div className={`flex items-center gap-1.5 text-xs font-bold ${kpi.subColor}`}>
                {kpi.icon}
                <span>{kpi.subtext}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#f0f7f6] rounded-[2rem] p-4 md:p-8 pb-6 border border-teal-50 shadow-sm relative z-10 w-full">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 px-1 gap-4">
            <h3 className="text-xl font-extrabold text-[#0e4d46]">Recently Generated Invoices</h3>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              {/* Search Input wired to state */}
              <div className="flex bg-white rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] items-center px-4 transition-all focus-within:ring-2 focus-within:ring-teal-500/20 flex-1">
                <svg className="w-4 h-4 text-slate-300 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Jump back to p1 immediately while searching
                  }}
                  placeholder="Search invoices..." 
                  className="py-3 bg-transparent border-none text-xs font-bold text-[#0e4d46] placeholder-slate-400 focus:outline-none focus:ring-0 w-full sm:w-48 xl:w-64"
                />
              </div>
              
              {/* Dynamic Filter Toggle wired to state */}
              <div className="relative">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={`flex items-center justify-center w-full sm:w-[44px] h-[44px] bg-white rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-all relative ${
                    isFilterOpen ? 'ring-2 ring-teal-500/20 bg-slate-50' : 'hover:bg-slate-50 hover:shadow-md'
                  }`}
                >
                  <span className="sm:hidden text-xs font-bold text-[#5a827d] mr-2">Filter</span>
                  <svg className={`w-4 h-4 transition-colors ${filterStatus !== 'ALL' ? 'text-[#0e4d46]' : 'text-[#5a827d]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  {filterStatus !== 'ALL' && (
                    <span className="absolute top-2 right-2 sm:right-2.5 w-2 h-2 bg-red-400 rounded-full border border-white"></span>
                  )}
                </button>

                {/* Filter Dropdown Body */}
                {isFilterOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-teal-50 z-50 p-2 py-3 cursor-default">
                    <div className="px-3 pb-2 mb-2 border-b border-gray-50 text-[9px] font-extrabold text-[#5a827d] uppercase tracking-widest">
                      Filter by Status
                    </div>
                    {['ALL', 'PAID', 'PENDING', 'OVERDUE'].map(status => (
                      <button 
                        key={status}
                        className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-all ${
                          filterStatus === status 
                            ? 'bg-[#f0f7f6] text-[#0e4d46]' 
                            : 'text-[#5a827d] hover:bg-slate-50'
                        }`}
                        onClick={() => {
                          setFilterStatus(status);
                          setCurrentPage(1);
                          setIsFilterOpen(false);
                        }}
                      >
                        {status === 'ALL' ? 'Show All Invoices' : status}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Robust Invoices Table */}
          <div className="w-full overflow-x-auto min-h-[380px] -mx-4 md:mx-0">
            <div className="inline-block min-w-full align-middle px-4 md:px-0">
              <table className="w-full border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-left text-[10px] font-extrabold text-[#5a827d] uppercase tracking-widest leading-none">
                    <th className="px-5 py-4 min-w-[120px]">Invoice #</th>
                    <th className="px-5 py-4 min-w-[200px]">Client Name</th>
                    <th className="px-5 py-4 min-w-[140px]">Date</th>
                    <th className="px-5 py-4 min-w-[160px]">Amount</th>
                    <th className="px-5 py-4 min-w-[120px]">Status</th>
                    <th className="px-5 py-4 text-center min-w-[80px]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedInvoices.map((inv) => (
                    <tr key={inv.id} className="bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-shadow hover:shadow-md group">
                      <td className="px-5 py-4 rounded-l-2xl text-xs font-extrabold text-[#5a827d] transition-colors cursor-pointer group-hover:text-[#0e4d46]">{inv.id}</td>
                      <td className="px-5 py-4 text-xs font-bold text-[#0e4d46] whitespace-nowrap">{inv.client}</td>
                      <td className="px-5 py-4 text-xs font-bold text-[#5a827d] whitespace-nowrap">{inv.date}</td>
                      <td className="px-5 py-4 text-[13px] font-extrabold text-[#0e4d46] truncate">{inv.amount}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center h-full">
                          <StatusBadge status={inv.status} />
                        </div>
                      </td>
                      <td className="px-5 py-4 rounded-r-2xl text-center">
                        <button className="p-2 text-slate-300 hover:text-[#0e4d46] transition-colors rounded-lg hover:bg-slate-50">
                          <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {/* Empty State UI protection */}
                  {paginatedInvoices.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-20 text-[#5a827d] font-bold bg-white rounded-2xl shadow-sm">
                        No invoices match your current search or format.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Logic-Driven Pagination Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 px-1 gap-4">
            <div className="text-[10px] font-bold text-[#5a827d] uppercase tracking-widest text-center sm:text-left">
              {filteredInvoices.length > 0 
                ? `Showing ${((currentPage - 1) * itemsPerPage) + 1} to ${Math.min(currentPage * itemsPerPage, filteredInvoices.length)} of ${filteredInvoices.length} invoices`
                : 'Showing 0 items'}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold justify-center sm:justify-end flex-wrap">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-[#0e4d46] hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              >
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button 
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 rounded-lg flex justify-center items-center shadow-sm transition-all ${
                      currentPage === page 
                        ? 'bg-white text-[#0e4d46]' 
                        : 'bg-transparent text-slate-400 hover:text-[#0e4d46] hover:bg-white shadow-none'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-[#0e4d46] hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              >
                Next
              </button>
            </div>
          </div>

        </div>

      </div>

      <button className="fixed bottom-6 right-6 md:bottom-10 md:right-10 flex items-center justify-center gap-2.5 bg-[#0e4d46] text-white px-5 md:px-7 py-3 md:py-4 rounded-[1.2rem] shadow-[0_8px_30px_rgb(14,77,70,0.3)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(14,77,70,0.4)] transition-all font-extrabold text-[10px] md:text-xs tracking-wide uppercase z-50">
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
        <span className="hidden xs:inline">Auto-Generate Invoice</span>
        <span className="xs:hidden">Generate</span>
      </button>

    </DashboardLayout>
  );
};

export default Invoices;
