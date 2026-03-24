import React, { useState } from 'react';

const Calendar = () => {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [tasks, setTasks] = useState({
    [`${new Date().getFullYear()}-${new Date().getMonth() + 1}-12`]: ['Weekly Sync @ 2 PM'],
    [`${new Date().getFullYear()}-${new Date().getMonth() + 1}-15`]: ['Pipeline Review']
  });
  const [newTask, setNewTask] = useState('');

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const prevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const getDateString = (day) => `${currentYear}-${currentMonth + 1}-${day}`;

  const handleAddTask = (e) => {
    e?.preventDefault();
    if (!newTask.trim()) return;
    
    const dateStr = getDateString(selectedDay);
    setTasks(prev => ({
      ...prev,
      [dateStr]: [...(prev[dateStr] || []), newTask]
    }));
    setNewTask('');
  };

  const monthName = viewDate.toLocaleString('default', { month: 'long' }).toUpperCase();

  const dates = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    dates.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(i);
  }

  const selectedDateStr = getDateString(selectedDay);
  const selectedDayTasks = tasks[selectedDateStr] || [];

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-fit">
      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-[#0e4d46] tracking-wider">
          {monthName} {currentYear}
        </h3>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-1.5 hover:bg-[#e8f3f1] rounded-lg transition-colors text-[#5a827d] hover:text-[#0e4d46]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={nextMonth} className="p-1.5 hover:bg-[#e8f3f1] rounded-lg transition-colors text-[#5a827d] hover:text-[#0e4d46]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-2 text-center mb-6">
        {daysOfWeek.map(day => (
          <span key={day} className="text-[10px] font-bold text-[#5a827d] uppercase pb-2">{day}</span>
        ))}
        {dates.map((date, index) => {
          const dateStr = date ? getDateString(date) : null;
          const hasTasks = dateStr && tasks[dateStr] && tasks[dateStr].length > 0;
          const isToday = date && 
                          new Date().getDate() === date && 
                          new Date().getMonth() === currentMonth && 
                          new Date().getFullYear() === currentYear;
          const isSelected = date === selectedDay;

          return (
            <div key={index} className="flex flex-col items-center justify-center py-1">
              {date && (
                <button
                  onClick={() => setSelectedDay(date)}
                  className={`relative text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full transition-all
                    ${isSelected ? 'bg-[#0e4d46] text-white shadow-lg' : isToday ? 'bg-[#e8f3f1] text-[#0e4d46]' : 'text-gray-600 hover:bg-gray-50'}
                    ${hasTasks && !isSelected ? 'after:content-[""] after:absolute after:bottom-1 after:w-1 after:h-1 after:bg-[#0e4d46] after:rounded-full' : ''}
                  `}
                >
                  {date}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Task List and Inline Input */}
      <div className="flex flex-col pt-6 border-t border-gray-100">
        <h4 className="text-[10px] font-bold text-[#5a827d] uppercase tracking-widest mb-4">Tasks for {selectedDay} {viewDate.toLocaleString('default', { month: 'short' })}</h4>
        
        <div className="space-y-3">
          {selectedDayTasks.map((task, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-[#f8fafb] rounded-xl border border-gray-50 group hover:border-[#0e4d46]/20 transition-all">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0e4d46] shrink-0"></div>
              <p className="text-[11px] font-bold text-[#0e4d46] flex-1">{task}</p>
            </div>
          ))}

          {/* Inline Add Task Input */}
          <form onSubmit={handleAddTask} className="flex items-center gap-2 group mt-2">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add task" 
                  className="w-full bg-white px-3 py-2.5 rounded-xl border border-gray-200 text-[11px] font-semibold text-[#0e4d46] focus:outline-none focus:ring-2 focus:ring-[#0e4d46]/10 placeholder:text-[#5a827d]/40 transition-all"
                />
              </div>
              <button 
                type="submit"
                className="w-9 h-9 flex items-center justify-center bg-[#0e4d46] text-white rounded-xl hover:bg-[#0a3d37] transition-all shrink-0 shadow-sm"
              >
                <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                </svg>
              </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
