import './App.css';
import PeriodTrackerApp from './PeriodTrackerApp';
import Login from './login';
import Registration from './registration';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './bayun';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/PeriodTrackerApp" element={<PeriodTrackerApp />} />
      </Routes>
    </Router>
  );
}

export default App;
