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
      <div className="w-full">
        <Calendar variant="full" />
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
