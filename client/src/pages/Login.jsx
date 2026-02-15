import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { Mail, Lock, Calendar, ArrowRight } from 'lucide-react';
import './Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const moveX = (clientX - centerX) / 50;
        const moveY = (clientY - centerY) / 50;

        const boundedX = Math.max(-3, Math.min(3, moveX));
        const boundedY = Math.max(-3, Math.min(3, moveY));

        setEyePosition({ x: boundedX, y: boundedY });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { data } = await api.post('/api/auth/login', formData);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="auth-container"
            onMouseMove={handleMouseMove}
            style={{ '--eye-x': `${eyePosition.x}px`, '--eye-y': `${eyePosition.y}px` }}
        >
            <div className="auth-split">
                <div className="auth-visual">
                    <div className={`geo-scene ${isPasswordFocused ? 'shy' : ''} ${error ? 'sad' : ''}`}>
                        <div className="geo-shape geo-purple">
                            <div className="eye left"></div>
                            <div className="eye right"></div>
                            <div className="mouth"></div>
                        </div>
                        <div className="geo-shape geo-orange">
                            <div className="eye left"></div>
                            <div className="eye right"></div>
                            <div className="mouth"></div>
                        </div>
                        <div className="geo-shape geo-black">
                            <div className="eye left"></div>
                            <div className="eye right"></div>
                        </div>
                        <div className="geo-shape geo-yellow">
                            <div className="eye"></div>
                            <div className="mouth-line"></div>
                        </div>

                    </div>
                </div>

                <div className="auth-form-side">
                    <div className="auth-card">
                        <div className="logo-icon-small">
                            <Calendar size={32} />
                        </div>

                        <h2>Welcome back!</h2>
                        <p className="subtitle">Please enter your details</p>

                        {error && <div className="error-alert">{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Email</label>
                                <div className="input-wrapper">
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({ ...formData, email: e.target.value });
                                            if (error) setError('');
                                        }}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <div className="input-wrapper">
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => {
                                            setFormData({ ...formData, password: e.target.value });
                                            if (error) setError('');
                                        }}
                                        onFocus={() => setIsPasswordFocused(true)}
                                        onBlur={() => setIsPasswordFocused(false)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-extras">
                                <label className="checkbox-group">
                                    <input type="checkbox" /> Remember for 30 days
                                </label>
                                <a href="#" className="forgot-link">Forgot password?</a>
                            </div>

                            <button type="submit" className="btn-primary-black" disabled={loading}>
                                {loading ? 'Logging in...' : 'Log In'}
                            </button>


                        </form>

                        <p className="auth-switch">
                            Don't have an account? <Link to="/register">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
