import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Separate View Components for better scope and debugging
const YearView = ({ fYear, today, getCalendarInfo }) => {
  const months = Array.from({ length: 12 }, (_, i) => new Date(fYear, i, 1));
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8 overflow-y-auto max-h-[80vh]">
      {months.map((m, idx) => {
        const { firstDay, daysIn } = getCalendarInfo(m);
        const dates = [];
        for (let i = 0; i < firstDay; i++) dates.push(null);
        for (let i = 1; i <= daysIn; i++) dates.push(i);
        return (
          <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <h4 className="text-xs font-bold text-[#0e4d46] mb-4 text-center">{m.toLocaleString('default', { month: 'long' }).toUpperCase()}</h4>
            <div className="grid grid-cols-7 gap-1 text-[8px] text-center font-bold text-gray-400 mb-2">
              {['S','M','T','W','T','F','S'].map((d, i) => <span key={i}>{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-1 text-[8px] text-center">
              {dates.map((d, i) => (
                <div key={i} className={`h-4 flex items-center justify-center font-semibold ${d === today.getDate() && idx === today.getMonth() && fYear === today.getFullYear() ? 'bg-[#0e4d46] text-white rounded-full' : 'text-[#0e4d46]'}`}>
                  {d}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const DayView = ({ selectedDayFull, fullViewDate, fYear, events }) => {
  const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM to 8 PM
  const dayEvents = events[selectedDayFull] || [];
  const monthName = fullViewDate.toLocaleString('default', { month: 'long' });
  return (
    <div className="flex-1 overflow-y-auto p-8 relative min-h-[600px] bg-white">
      <h4 className="text-sm font-bold text-[#0e4d46] mb-8">{selectedDayFull} {monthName} {fYear}</h4>
      <div className="space-y-0 relative">
        {hours.map(h => (
          <div key={h} className="flex border-t border-gray-100 h-20 items-start">
            <span className="text-[10px] font-bold text-[#5a827d] w-16 -mt-2">{h > 12 ? `${h-12} PM` : h === 12 ? '12 PM' : `${h} AM`}</span>
            <div className="flex-1 h-full relative">
              {dayEvents.filter(e => e.hour === h).map((event, i) => (
                <div key={i} className="absolute left-2 right-2 top-2 p-4 bg-[#0e4d46] text-white rounded-xl shadow-md z-10 animate-in slide-in-from-left-2 duration-300 cursor-pointer">
                  <p className="text-xs font-bold mb-1">{event.title}</p>
                  <p className="text-[10px] opacity-80">{event.time} • {event.location}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MonthView = ({ fYear, fMonth, fFirstDay, fDaysIn, events, selectedDayFull, setSelectedDayFull, today, daysOfWeek }) => {
  const datesFull = [];
  const prevMonthLastDay = new Date(fYear, fMonth, 0).getDate();
  for (let i = fFirstDay - 1; i >= 0; i--) datesFull.push({ day: prevMonthLastDay - i, currentMonth: false });
  for (let i = 1; i <= fDaysIn; i++) datesFull.push({ day: i, currentMonth: true });
  const remainingCells = 42 - datesFull.length;
  for (let i = 1; i <= remainingCells; i++) datesFull.push({ day: i, currentMonth: false });

  return (
    <div className="flex flex-col flex-1">
      <div className="grid grid-cols-7 border-b border-gray-50">
        {daysOfWeek.map(day => <div key={day} className="py-4 text-center text-[10px] font-bold text-[#5a827d] tracking-widest uppercase">{day}</div>)}
      </div>
      <div className="grid grid-cols-7 flex-1">
        {datesFull.map((date, index) => {
          const dayEvents = date.currentMonth ? events[date.day] || [] : [];
          const isSelected = date.currentMonth && date.day === selectedDayFull;
          const isToday = date.day === today.getDate() && fMonth === today.getMonth() && fYear === today.getFullYear() && date.currentMonth;
          return (
            <div key={index} onClick={() => date.currentMonth && setSelectedDayFull(date.day)} className={`min-h-[120px] p-2 border-r border-b border-gray-50 last:border-r-0 transition-all cursor-pointer hover:bg-gray-50 ${!date.currentMonth ? 'bg-gray-50/30' : ''} ${isSelected ? 'ring-2 ring-inset ring-[#0e4d46] bg-[#f0f7f6]' : ''}`}>
              <div className="flex justify-between items-center px-1">
                <span className={`text-xs font-extrabold ${date.currentMonth ? (isToday ? 'bg-[#0e4d46] text-white w-6 h-6 rounded-full flex items-center justify-center' : 'text-[#0e4d46]') : 'text-gray-300'}`}>{date.day}</span>
                {dayEvents.length > 0 && <span className="w-1.5 h-1.5 rounded-full bg-[#0e4d46]/40"></span>}
              </div>
              <div className="mt-2 space-y-1">
                {dayEvents.slice(0, 3).map((event, i) => (
                  <div key={i} className={`px-2 py-1.5 rounded-md text-[9px] font-bold truncate transition-all ${event.type === 'primary' ? 'bg-[#0e4d46] text-white' : 'bg-[#e8f3f1] text-[#0e4d46] border border-[#d1e6e3]'}`}>{event.title}</div>
                ))}
                {dayEvents.length > 3 && <p className="text-[8px] font-bold text-[#5a827d] pl-2">+{dayEvents.length - 3} more</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CreateEventView = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');
  const [allDay, setAllDay] = useState(false);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    onSave({
      title: title || 'Untitled Event',
      time: `${startTime} - ${endTime}`,
      location: location || 'No location',
      description: description || 'No description',
      hour: parseInt(startTime.split(':')[0]) || 10
    });
  };

  return (
    <div className="flex w-full h-[calc(100vh-80px)] overflow-hidden bg-transparent pt-4">
      {/* Left Form Area */}
      <div className="flex-1 flex flex-col pl-8 pr-16 pb-8 overflow-y-auto space-y-8">
        
        <input 
          type="text" 
          placeholder="Add title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent text-4xl mt-4 font-bold text-[#0e4d46] placeholder:text-[#a3c2c0] border-none outline-none focus:ring-0 px-0"
        />

        {/* Date and Time */}
        <div className="flex items-start gap-4 text-[#5a827d]">
          {/* Clock Icon */}
          <div className="mt-2 text-[#a3c2c0]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <div className="flex flex-col space-y-3 flex-1">
            <div className="flex items-center gap-4">
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-fit bg-white px-4 py-2 border-none rounded-xl text-sm font-semibold text-gray-700 shadow-sm focus:ring-2 focus:ring-[#0e4d46]/20 outline-none" placeholder="DD/MM/YYYY" />
              <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="w-fit bg-white px-4 py-2 border-none rounded-xl text-sm font-semibold text-gray-700 shadow-sm focus:ring-2 focus:ring-[#0e4d46]/20 outline-none" placeholder="10:00" />
              <span className="text-gray-400 font-bold">—</span>
              <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="w-fit bg-white px-4 py-2 border-none rounded-xl text-sm font-semibold text-gray-700 shadow-sm focus:ring-2 focus:ring-[#0e4d46]/20 outline-none" placeholder="11:00" />
            </div>
            
            <div className="flex items-center gap-4">
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-fit bg-white px-4 py-2 border-none rounded-xl text-sm font-semibold text-gray-700 shadow-sm focus:ring-2 focus:ring-[#0e4d46]/20 outline-none" placeholder="DD/MM/YYYY" />
            </div>

            <div className="flex items-center gap-4 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={allDay} onChange={e => setAllDay(e.target.checked)} className="rounded border-gray-300 text-[#0e4d46] focus:ring-[#0e4d46] w-4 h-4 cursor-pointer" />
                <span className="text-sm font-bold text-gray-600">All day</span>
              </label>
              <button type="button" className="text-sm font-bold text-[#0e4d46] hover:underline">Timezone</button>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-4 text-[#5a827d]">
          <div className="text-[#a3c2c0]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Add location" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 bg-transparent border-t border-b border-gray-200/60 py-4 text-sm font-medium text-gray-700 placeholder:text-gray-400 outline-none focus:border-[#a3c2c0] transition-colors"
          />
        </div>

        {/* Description / Attachments */}
        <div className="flex items-start gap-4 text-[#5a827d]">
          <div className="mt-4 text-[#a3c2c0]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <textarea 
            placeholder="Add description or attachments" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="6"
            className="flex-1 bg-transparent border-b border-gray-200/60 py-4 text-sm font-medium text-gray-700 placeholder:text-gray-400 outline-none focus:border-[#a3c2c0] transition-colors resize-none"
          />
        </div>

        {/* Notification */}
        <div className="flex items-center gap-4 text-[#5a827d] pt-2">
          <div className="text-[#a3c2c0] opacity-0"><svg className="w-5 h-5" /></div>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span>30 minutes before</span>
              <button type="button" className="text-gray-400 hover:text-gray-600 ml-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <button type="button" className="text-sm font-bold text-[#0e4d46] hover:underline flex items-center gap-1 w-fit">
              + Add notification
            </button>
          </div>
        </div>

      </div>

      {/* Right Sidebar */}
      <div className="w-[320px] bg-[#f8fafb] rounded-[24px] border border-gray-100/50 shadow-sm flex flex-col overflow-hidden mb-8 mr-8">
        
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Attendees Section */}
          <div className="mb-8">
            <h4 className="text-xs font-bold text-[#0e4d46] uppercase tracking-widest mb-4">Attendees</h4>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
              </div>
              <input type="text" placeholder="Add guests" className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200/60 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0e4d46]/20 shadow-sm" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 shrink-0">JD</div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#0e4d46]">Arjun Raval</span>
                  <span className="text-[10px] font-semibold text-gray-400">Organizer</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 shrink-0">AS</div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#0e4d46]">Sneha Mittal</span>
                  <span className="text-[10px] font-semibold text-gray-400">Optional</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-100 mb-8"></div>

          {/* Guest Permissions Section */}
          <div>
            <h4 className="text-[10px] font-bold text-[#5a827d] uppercase tracking-widest mb-4">Guest Permissions</h4>
            <div className="space-y-3 bg-transparent">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#0e4d46] focus:ring-[#0e4d46] w-4 h-4 cursor-pointer" />
                <span className="text-xs font-semibold text-gray-600">Invite others</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#0e4d46] focus:ring-[#0e4d46] w-4 h-4 cursor-pointer" />
                <span className="text-xs font-semibold text-gray-600">See guest list</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-[#0e4d46] focus:ring-[#0e4d46] w-4 h-4 cursor-pointer" />
                <span className="text-xs font-semibold text-gray-600">Modify event</span>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6">
          <div className="flex items-center gap-3">
            <button onClick={onCancel} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold bg-[#eef6f4] text-[#0e4d46] hover:bg-[#e0f0ed] transition-colors">
              Cancel
            </button>
            <button onClick={handleSave} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold bg-black text-white shadow-lg hover:bg-gray-800 transition-colors">
              Save
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

const Calendar = ({ variant = 'mini' }) => {
  const navigate = useNavigate();
  const today = new Date();
  
  // States
  const [miniViewDate, setMiniViewDate] = useState(today);
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [miniTasks] = useState({
    [`${today.getFullYear()}-${today.getMonth() + 1}-12`]: ['Weekly Sync @ 2 PM'],
    [`${today.getFullYear()}-${today.getMonth() + 1}-15`]: ['Pipeline Review']
  });
  const [fullViewDate, setFullViewDate] = useState(today);
  const [selectedDayFull, setSelectedDayFull] = useState(today.getDate());
  
  // NEW STATE FOR CREATE VIEW
  const [isCreateViewOpen, setIsCreateViewOpen] = useState(false);
  
  const [events, setEvents] = useState({
    [today.getDate()]: [{ 
      title: 'Initial Team Sync', 
      time: '10:00 AM - 11:00 AM', 
      location: 'zoom.us/j/leadflow-123',
      description: 'First sync of the day to discuss priorities.',
      attendees: [{ name: 'Arjun', initials: 'AJ' }, { name: 'Priya', initials: 'PR' }],
      type: 'primary',
      hour: 10
    }],
    [24]: [{ 
      title: 'Product Roadmap Review', 
      time: '11:00 AM - 12:00 PM', 
      location: 'zoom.us/j/leadflow-meeting-room',
      description: 'Quarterly roadmap sync to align on Q4 priorities for Project Arjun.',
      attendees: [{ name: 'Avni', initials: 'AV' }, { name: 'Rohan', initials: 'RO' }, { name: 'Sneha', initials: 'SN' }],
      type: 'primary',
      hour: 11
    }]
  });
  const [view, setView] = useState('Month');

  const getCalendarInfo = (date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const daysIn = new Date(year, month + 1, 0).getDate();
    return { month, year, firstDay, daysIn };
  };

  const daysOfWeek = variant === 'mini' 
    ? ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    : ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  if (variant === 'mini') {
    const { month, year, firstDay, daysIn } = getCalendarInfo(miniViewDate);
    const monthNameArr = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    const monthName = monthNameArr[month];
    const prevMonth = () => setMiniViewDate(new Date(year, month - 1, 1));
    const nextMonth = () => setMiniViewDate(new Date(year, month + 1, 1));
    const getDateString = (day) => `${year}-${month + 1}-${day}`;
    const dates = [];
    for (let i = 0; i < firstDay; i++) dates.push(null);
    for (let i = 1; i <= daysIn; i++) dates.push(i);

    return (
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-fit">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-[#0e4d46] tracking-wider">{monthName} {year}</h3>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="p-1.5 hover:bg-[#e8f3f1] rounded-lg transition-colors text-[#5a827d]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg></button>
            <button onClick={nextMonth} className="p-1.5 hover:bg-[#e8f3f1] rounded-lg transition-colors text-[#5a827d]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-y-2 text-center mb-6">
          {daysOfWeek.map(day => <span key={day} className="text-[10px] font-bold text-[#5a827d] uppercase pb-2">{day}</span>)}
          {dates.map((date, index) => {
            const dateStr = date ? getDateString(date) : null;
            const hasTasks = dateStr && miniTasks[dateStr]?.length > 0;
            const isToday = date && date === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            const isSelected = date === selectedDay;
            return date ? (
              <div key={index} className="flex flex-col items-center justify-center py-1">
                <button onClick={() => setSelectedDay(date)} className={`relative text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full transition-all ${isSelected ? 'bg-[#0e4d46] text-white shadow-lg' : isToday ? 'bg-[#e8f3f1] text-[#0e4d46]' : 'text-gray-600 hover:bg-gray-50'} ${hasTasks && !isSelected ? 'after:content-[""] after:absolute after:bottom-1 after:w-1 after:h-1 after:bg-[#0e4d46] after:rounded-full' : ''}`}>{date}</button>
              </div>
            ) : <div key={index}></div>;
          })}
        </div>
        <button onClick={() => navigate('/calendar')} className="w-full mb-6 py-3 bg-[#0e4d46] text-white rounded-xl text-xs font-bold hover:bg-[#0a3d37] transition-all shadow-sm">Show Full Calendar</button>
        <div className="flex flex-col pt-6 border-t border-gray-100">
          <h4 className="text-[10px] font-bold text-[#5a827d] uppercase tracking-widest mb-4">Tasks for {selectedDay} {miniViewDate.toLocaleString('default', { month: 'short' })}</h4>
          <div className="space-y-3">
            {(miniTasks[getDateString(selectedDay)] || []).map((task, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-[#f8fafb] rounded-xl border border-gray-50 group hover:border-[#0e4d46]/20 transition-all"><div className="w-1.5 h-1.5 rounded-full bg-[#0e4d46] shrink-0"></div><p className="text-[11px] font-bold text-[#0e4d46] flex-1">{task}</p></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const { month: fMonth, year: fYear, firstDay: fFirstDay, daysIn: fDaysIn } = getCalendarInfo(fullViewDate);
  const fMonthName = fullViewDate.toLocaleString('default', { month: 'long' });

  const handleNav = (direction) => {
    if (view === 'Day') {
      const newDate = new Date(fullViewDate);
      newDate.setDate(fullViewDate.getDate() + direction);
      setFullViewDate(newDate);
      setSelectedDayFull(newDate.getDate());
    } else if (view === 'Month') {
      setFullViewDate(new Date(fYear, fMonth + direction, 1));
    } else if (view === 'Year') {
      setFullViewDate(new Date(fYear + direction, 0, 1));
    }
  };

  const getHeaderText = () => {
    if (view === 'Day') return fullViewDate.toLocaleDateString('default', { day: 'numeric', month: 'long', year: 'numeric' });
    if (view === 'Month') return fullViewDate.toLocaleDateString('default', { month: 'long', year: 'numeric' });
    if (view === 'Year') return fYear.toString();
    return '';
  };

  const selectedDayEvents = events[selectedDayFull] || [];

  if (isCreateViewOpen) {
    return (
      <div className="bg-[#eef6f4] min-h-screen relative overflow-hidden">
        <CreateEventView 
          onSave={(newMeeting) => {
             const day = selectedDayFull;
             setEvents(prev => ({
               ...prev,
               [day]: [...(prev[day] || []), { ...newMeeting, attendees: [{ name: 'Me', initials: 'ME' }], type: 'primary' }]
             }));
             setIsCreateViewOpen(false);
          }}
          onCancel={() => setIsCreateViewOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="bg-[#f0f7f6] min-h-screen p-8 relative overflow-x-hidden pt-6">
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full w-full">
        <div className="p-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-50">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsCreateViewOpen(true)} className="bg-[#0e4d46] text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#0a3d37] transition-all shadow-sm">
              <span className="text-xl leading-none">+</span> Create
            </button>
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-extrabold text-[#0e4d46] min-w-[200px] text-center">{getHeaderText()}</h2>
              <div className="flex items-center gap-1">
                <button onClick={() => handleNav(-1)} className="p-1 text-[#5a827d] hover:text-[#0e4d46]"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg></button>
                <button onClick={() => handleNav(1)} className="p-1 text-[#5a827d] hover:text-[#0e4d46]"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg></button>
              </div>
              <button 
                onClick={() => { setFullViewDate(new Date()); setSelectedDayFull(new Date().getDate()); }} 
                className="px-4 py-1.5 border border-gray-200 rounded-lg text-sm font-bold text-[#5a827d] hover:bg-gray-50 transition-all"
              >
                Today
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-[#f8fafb] p-1 rounded-xl">
              {['Day', 'Month', 'Year'].map((v) => (
                <button key={v} onClick={() => setView(v)} className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${view === v ? 'bg-white text-[#0e4d46] shadow-sm' : 'text-[#5a827d] hover:text-[#0e4d46]'}`}>{v}</button>
              ))}
            </div>
          </div>
        </div>

        {view === 'Year' ? <YearView fYear={fYear} today={today} getCalendarInfo={getCalendarInfo} /> : 
         view === 'Day' ? <DayView selectedDayFull={selectedDayFull} fullViewDate={fullViewDate} fYear={fYear} events={events} /> : 
         <MonthView fYear={fYear} fMonth={fMonth} fFirstDay={fFirstDay} fDaysIn={fDaysIn} events={events} selectedDayFull={selectedDayFull} setSelectedDayFull={setSelectedDayFull} today={today} daysOfWeek={daysOfWeek} />}

        {view !== 'Year' && (
          <div className="bg-[#f0f7f6] p-8 border-t border-gray-100 min-h-[300px]">
            <div className="flex justify-between items-start mb-8">
              <h3 className="text-xl font-extrabold text-[#0e4d46]">
                {selectedDayEvents.length > 0 ? `Event Details: ${selectedDayEvents[0].title}` : `No Events for ${selectedDayFull} ${fMonthName}`}
              </h3>
              {selectedDayEvents.length > 0 && (
                <div className="flex items-center gap-3">
                  <button className="bg-[#0e4d46] text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg hover:bg-[#0a3d37] transition-all">Join Meeting</button>
                </div>
              )}
            </div>
            {selectedDayEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div><p className="text-[10px] font-extrabold text-[#5a827d] uppercase tracking-widest mb-2">TIME & DATE</p><p className="text-sm font-bold text-[#0e4d46]">{selectedDayEvents[0].time} | {selectedDayFull} {fMonthName}</p></div>
                  <div><p className="text-[10px] font-extrabold text-[#5a827d] uppercase tracking-widest mb-2">LOCATION</p>
                    <a href={`https://${selectedDayEvents[0].location}`} target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-500 hover:underline">{selectedDayEvents[0].location}</a>
                  </div>
                </div>
                <div className="space-y-6">
                  <div><p className="text-[10px] font-extrabold text-[#5a827d] uppercase tracking-widest mb-2">DESCRIPTION</p><p className="text-sm font-medium text-[#5a827d] leading-relaxed">{selectedDayEvents[0].description}</p></div>
                  <div>
                    <p className="text-[10px] font-extrabold text-[#5a827d] uppercase tracking-widest mb-4">ATTENDEES ({selectedDayEvents[0].attendees.length})</p>
                    <div className="flex flex-wrap gap-3">
                      {selectedDayEvents[0].attendees.map((attendee, i) => (
                        <div key={i} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
                          <div className="w-6 h-6 rounded-full bg-[#f0f7f6] flex items-center justify-center text-[10px] font-bold text-[#0e4d46]">{attendee.initials}</div>
                          <span className="text-xs font-bold text-[#0e4d46]">{attendee.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <p className="text-sm font-bold text-[#5a827d]">No meetings scheduled for this day.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
