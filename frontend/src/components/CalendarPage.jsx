import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import Calendar from './Calendar';
import { getCurrentUser } from '../utils/auth';

const CalendarPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  return (
    <DashboardLayout 
      role={user?.role || "sales_rep"}
      userName={user?.fullName || "User"} 
      userRole={user?.role?.replace('_', ' ') || "Representative"}
    >
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <h2 className="text-[11px] text-[#5a827d] font-extrabold uppercase tracking-widest mb-6 px-1 text-center sm:text-left">Full Calendar</h2>
        <Calendar />
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
