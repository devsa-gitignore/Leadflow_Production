import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

const Settings = () => {
   const user = getCurrentUser();
  const [activeCategory, setActiveCategory] = useState("account");
  const [defaultView, setDefaultView] = useState("list");
  
  const [toggles, setToggles] = useState({
    twoFactor: true,
    emailNotif: true,
    pushNotif: false,
    inAppNotif: true,
  });

  const handleToggle = (key) => setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  
  const scrollTo = (id) => {
    setActiveCategory(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navigate = useNavigate();

  const handleSave = () => {
    alert("Changes have been successfully saved!");
    navigate('/dashboard');
  };
  const handleDiscard = () => window.location.reload();
  const handlePasswordChange = () => alert("Opening password reset flow...");
  const handleDeleteAccount = () => {
    if(window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      alert("Account deletion requested.");
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 lg:p-10 scroll-smooth pb-32">
          
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 max-w-6xl">
            
            {/* --- SETTINGS CATEGORY PANEL --- */}
            <div className="w-56 shrink-0 lg:sticky lg:top-0">
              <h3 className="text-[11px] font-extrabold text-[#7d9b99] uppercase tracking-wider mb-4 px-4">
                Settings Category
              </h3>
              <nav className="space-y-1">
                {[
                  { id: 'account', name: 'Account Settings', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                  { id: 'security', name: 'Security & Privacy', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                  { id: 'preferences', name: 'App Preferences', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
                  { id: 'notifications', name: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
                  { id: 'danger', name: 'Danger Zone', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                      activeCategory === item.id 
                        ? 'bg-[#0e4d46] text-white' 
                        : 'text-[#5a827d] hover:bg-[#d1e5e2]'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                    </svg>
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>

            {/*MAIN SETTINGS CONTENT*/}
            <div className="flex-1 max-w-4xl">
              
              {/* Header */}
              <div id="account" className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 scroll-mt-8">
                <div>
                  <h1 className="text-3xl font-bold text-[#143e3c]">Account Settings</h1>
                  <p className="text-[#597876] mt-1 text-sm font-medium">
                    Manage your personal information and application preferences.
                  </p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <button onClick={handleDiscard} className="px-5 py-2.5 bg-[#e4ebed] text-[#2c5351] rounded-lg font-bold text-sm tracking-wide hover:bg-[#d3e0e2] transition-colors">
                    Discard
                  </button>
                  <button onClick={handleSave} className="px-5 py-2.5 bg-[#0e4e48] text-white rounded-lg font-bold text-sm tracking-wide hover:bg-[#0b3c37] transition-colors shadow-sm">
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="space-y-10 divide-y divide-[#cddcd8]">
                
                {/* Profile Details */}
                <div className="pt-8 grid grid-cols-1 xl:grid-cols-3 gap-8">
                  <div className="xl:col-span-1 pr-4">
                    <h2 className="text-[#143e3c] font-bold text-lg">Profile Details</h2>
                    <p className="text-[#597876] text-sm mt-2 leading-relaxed">
                      Your basic information used throughout the platform.
                    </p>
                  </div>
                  <div className="xl:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                      <div>
                        <label className="block text-xs font-bold text-[#597876] tracking-wider uppercase mb-2">FULL NAME</label>
                        <input type="text" defaultValue={user?.fullName || "Arjun Raval"} className="w-full bg-white rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e4e48]/50 shadow-sm text-[#143e3c] font-semibold" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#597876] tracking-wider uppercase mb-2">EMAIL ADDRESS</label>
                        <input type="email" defaultValue={user?.email || "arjun.n@leadflow.io"} className="w-full bg-white rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e4e48]/50 shadow-sm text-[#143e3c] font-semibold" />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="block text-xs font-bold text-[#597876] tracking-wider uppercase mb-2">LANGUAGE PREFERENCE</label>
                      <div className="relative">
                        <select className="w-full bg-white rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e4e48]/50 shadow-sm text-[#143e3c] font-semibold appearance-none">
                          <option>English (United States)</option>
                          <option>English (UK)</option>
                          <option>Spanish</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#597876]">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security & Privacy */}
                <div id="security" className="pt-10 grid grid-cols-1 xl:grid-cols-3 gap-8 scroll-mt-8">
                  <div className="xl:col-span-1 pr-4">
                    <h2 className="text-[#143e3c] font-bold text-lg">Security & Privacy</h2>
                    <p className="text-[#597876] text-sm mt-2 leading-relaxed">
                      Protect your account and control your visibility.
                    </p>
                  </div>
                  <div className="xl:col-span-2 space-y-4">
                    {/* Password Change Card */}
                    <div className="flex items-center justify-between bg-white rounded-xl p-5 shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#f1f6f4] flex items-center justify-center text-[#597876] shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>
                        </div>
                        <div>
                          <h3 className="text-[#143e3c] font-bold text-sm">Password Change</h3>
                          <p className="text-[#88a5a3] text-xs mt-0.5">Last updated 3 months ago</p>
                        </div>
                      </div>
                      <button onClick={handlePasswordChange} className="px-4 py-1.5 border border-[#cddcd8] text-[#2c5351] rounded-lg font-bold text-xs hover:bg-gray-50 transition-colors">
                        Change
                      </button>
                    </div>

                    {/* Two-Factor Auth */}
                    <div className="flex items-center justify-between bg-white rounded-xl p-5 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#e6f4ed] flex items-center justify-center text-[#22c55e] shrink-0 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-[#143e3c] font-bold text-sm">Two-Factor Authentication</h3>
                            <span className="bg-[#ccfbf1] text-[#0f766e] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">ENABLED</span>
                          </div>
                          <p className="text-[#88a5a3] text-xs mt-1">SMS-based verification is currently active</p>
                        </div>
                      </div>
                      <button onClick={() => handleToggle('twoFactor')} className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${toggles.twoFactor ? 'bg-[#0e4e48]' : 'bg-gray-300'}`}>
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow mt-0.5 transition duration-200 ease-in-out ${toggles.twoFactor ? 'translate-x-5' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* App Preferences */}
                <div id="preferences" className="pt-10 grid grid-cols-1 xl:grid-cols-3 gap-8 scroll-mt-8">
                  <div className="xl:col-span-1 pr-4">
                    <h2 className="text-[#143e3c] font-bold text-lg">App Preferences</h2>
                    <p className="text-[#597876] text-sm mt-2 leading-relaxed">Configure how you interact with the dashboard.</p>
                  </div>
                  <div className="xl:col-span-2 space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-[#597876] tracking-wider uppercase mb-3">DEFAULT LEADS VIEW</label>
                      <div className="flex w-full bg-transparent">
                        <button 
                          onClick={() => setDefaultView('list')}
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-sm transition-all ${defaultView === 'list' ? 'bg-[#d7ede6] border-2 border-[#165a54] text-[#165a54]' : 'bg-transparent text-[#5a827d] hover:bg-[#e0ece8]'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                          List View
                        </button>
                        <button 
                          onClick={() => setDefaultView('kanban')}
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-sm transition-all ${defaultView === 'kanban' ? 'bg-[#d7ede6] border-2 border-[#165a54] text-[#165a54]' : 'bg-transparent text-[#5a827d] hover:bg-[#e0ece8]'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z" /></svg>
                          Kanban Board
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div id="notifications" className="pt-10 grid grid-cols-1 xl:grid-cols-3 gap-8 scroll-mt-8">
                  <div className="xl:col-span-1 pr-4">
                    <h2 className="text-[#143e3c] font-bold text-lg">Notification Preferences</h2>
                    <p className="text-[#597876] text-sm mt-2 leading-relaxed">Decide which alerts you want to receive and where.</p>
                  </div>
                  <div className="xl:col-span-2 space-y-6">
                    {[
                      { key: 'emailNotif', title: 'Email Notifications', desc: 'Summary reports and direct lead assignments' },
                      { key: 'pushNotif', title: 'Push Notifications', desc: 'Real-time alerts in your web browser' },
                      { key: 'inAppNotif', title: 'In-app Alerts', desc: 'Activity indicators within the LeadFlow platform' }
                    ].map(notif => (
                      <div key={notif.key} className="flex items-center justify-between">
                        <div>
                          <h3 className="text-[#143e3c] font-bold text-sm">{notif.title}</h3>
                          <p className="text-[#88a5a3] text-xs mt-0.5">{notif.desc}</p>
                        </div>
                        <button onClick={() => handleToggle(notif.key)} className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${toggles[notif.key] ? 'bg-[#0e4e48]' : 'bg-gray-300'}`}>
                          <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow mt-0.5 transition duration-200 ease-in-out ${toggles[notif.key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Danger Zone */}
                <div id="danger" className="pt-10 grid grid-cols-1 xl:grid-cols-3 gap-8 scroll-mt-8">
                  <div className="xl:col-span-1 pr-4">
                    <h2 className="text-[#e11d48] font-bold text-lg">Danger Zone</h2>
                    <p className="text-[#597876] text-sm mt-2 leading-relaxed">Irreversible actions regarding your account data.</p>
                  </div>
                  <div className="xl:col-span-2">
                    <div className="bg-[#fcf1f1] border border-[#facdcd] rounded-xl p-6">
                      <h3 className="text-[#e11d48] font-bold text-sm mb-1">Delete Account</h3>
                      <p className="text-[#597876] text-sm mb-5">Once you delete your account, there is no going back. Please be certain.</p>
                      <button onClick={handleDeleteAccount} className="px-4 py-2 bg-[#e11d48] text-white rounded-lg font-bold text-sm hover:bg-[#be123c] transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
  );
};

export default Settings;
