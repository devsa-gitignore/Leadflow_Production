import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Signup from './components/Signup';
import ManagerDash from './components/ManagerDash';
import RepDash from './components/RepDash';
import TeamOverview from "./components/TeamOverview";
import MyPipeline from './components/MyPipeline';
import Invoices from './components/Invoices';
import Reports from "./components/Reports";
import CalendarPage from './components/CalendarPage';
import TodoPage from './components/TodoPage';

import Settings from './components/Settings';
import ProfilePage from './components/ProfilePage';
import { getCurrentUser } from './utils/auth';

const DashboardRouter = () => {
  const user = getCurrentUser();
  return user?.role === 'sales_manager' ? <ManagerDash /> : <RepDash />;
};


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<DashboardRouter />} />
          <Route path="/rep-dash" element={<Navigate to="/dashboard" replace />} />
          <Route path="/manager-dash" element={<Navigate to="/dashboard" replace />} />
          <Route path="/team-overview" element={<TeamOverview />} />
          <Route path="/mypipeline" element={<MyPipeline />}/>
          <Route path="/Invoices" element={<Invoices />}/>
          <Route path="/Reports" element={<Reports />}/>
          <Route path="/settings" element={<Settings />} />

          <Route path="/calendar" element={<CalendarPage />}/>
          <Route path="/todo" element={<TodoPage />}/>
          <Route path="/profile" element={<ProfilePage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
