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
import { ProtectedRoute, PublicRoute } from './components/AuthGuards';

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
          
          {/* Public-only routes (redirect to dashboard if logged in) */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          
          {/* Protected routes (redirect to login if not logged in) */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />
          <Route path="/team-overview" element={<ProtectedRoute><TeamOverview /></ProtectedRoute>} />
          <Route path="/mypipeline" element={<ProtectedRoute><MyPipeline /></ProtectedRoute>}/>
          <Route path="/Invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>}/>
          <Route path="/Reports" element={<ProtectedRoute><Reports /></ProtectedRoute>}/>
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>}/>
          <Route path="/todo" element={<ProtectedRoute><TodoPage /></ProtectedRoute>}/>
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}/>

          {/* Legacy redirects */}
          <Route path="/rep-dash" element={<Navigate to="/dashboard" replace />} />
          <Route path="/manager-dash" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
