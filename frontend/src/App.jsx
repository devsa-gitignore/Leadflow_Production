import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/manager-dash" element={<ManagerDash />}/>
          <Route path="/rep-dash" element={<RepDash />} />
          <Route path="/team-overview" element={<TeamOverview />} />
          <Route path="/mypipeline" element={<MyPipeline />}/>
          <Route path="/Invoices" element={<Invoices />}/>
          <Route path="/Reports" element={<Reports />}/>
          
          <Route path="/calendar" element={<CalendarPage />}/>
          <Route path="/todo" element={<TodoPage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
