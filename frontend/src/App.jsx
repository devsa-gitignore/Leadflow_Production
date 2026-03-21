import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Signup from './components/Signup';
import ManagerDash from './components/ManagerDash';
import RepDash from './components/RepDash';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/manager-dash" element={<ManagerDash />} />
          <Route path="/rep-dash" element={<RepDash />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
