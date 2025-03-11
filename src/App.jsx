import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import EnterNumberPage from './repair_tracking/enter_number_file/enter_number_page.jsx';
import RepairProgress from './repair_tracking/display_progress_file/display_progress_page.jsx';
import './App.css';

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <button onClick={() => navigate('/repair_tracking/enter_number_file/enter_number_page')}>
        Go to Enter Number Page
      </button>
    </div>
  );
}

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/repair_tracking/enter_number_file/enter_number_page" element={<EnterNumberPage />} />
        <Route path="/" element={<EnterNumberPage />} />
        <Route path="/repair_tracking/display_progress_file/display_progress_page" element={<RepairProgress />} />
      </Routes>
    </Router>
  );
}

export default Main;