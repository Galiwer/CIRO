import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navibar from './components/Navibar';
import Footer from './components/Footer';
import './App.css';


import ProductDetails from './components/ProductDetails';
import EnterNumberPage from './repair_tracking/enter_number_file/enter_number_page';
import DisplayProgressPage from './repair_tracking/display_progress_file/display_progress_page';
import ProgressUpdatePage from './repair_tracking/progress_update_file/progress_update_page';


// Protected Route component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    if (requireAdmin && !isAdmin()) {
        return <Navigate to="/" />;
    }

    return children;
};

function App() {
    return (
        <div className="app-wrapper">
            <Navibar />
            <main className="main-content">
                <Routes>
                    <Route path='/' element={<Home />} />
                    
                    <Route path='/repair' element={<EnterNumberPage />} />
                    <Route path='/repair_tracking/display_progress_file/display_progress_page' element={<DisplayProgressPage />} />
                    <Route path='/repair_tracking/progress_update_file/progress_update_page' element={
                        <ProtectedRoute requireAdmin={true}>
                            <ProgressUpdatePage />
                        </ProtectedRoute>
                    } />
                    
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
