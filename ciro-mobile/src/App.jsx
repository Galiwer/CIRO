import { Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import AdminPanel from './AdminPanel.jsx'
import FirmwareManager from './FirmwareManager.jsx'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/customer" element={<FirmwareManager />} />
      </Routes>
    </div>
  )
}

export default App