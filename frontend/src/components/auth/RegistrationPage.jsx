import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, isAuthenticated, isAdmin } from '../../services/UserService';
import './RegistrationPage.css';

function RegistrationPage() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'USER',
        city: ''
    });

    // No page-load admin check so that anyone can register via the /register URL

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');
            
            const response = await register(formData);
            if (response && response.statusCode !== 200) {
                throw new Error(response.error || response.message || 'Registration failed');
            }

            // Clear the form fields after successful registration
            setFormData({
                name: '',
                email: '',
                password: '',
                role: 'USER',
                city: ''
            });

            alert('User registered successfully');
            if (isAdmin()) {
                navigate('/admin/user-management');
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            setError(error.response?.data?.message || error.message || 'An error occurred while registering user');
            if (error.response?.status === 401 || error.response?.status === 403) {
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registration-container">
            <div className="registration-card">
                <h2>Register New User</h2>
                
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {isAdmin() && (
                        <div className="form-group">
                            <label>Role:</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                    )}

                    <div className="form-group">
                        <label>City:</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="button-group">
                        <button 
                            type="submit" 
                            className="register-button"
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                        <button 
                            type="button" 
                            className="cancel-button"
                            onClick={() => {
                                if (isAdmin()) {
                                    navigate('/admin/user-management');
                                } else {
                                    navigate('/login');
                                }
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegistrationPage; 