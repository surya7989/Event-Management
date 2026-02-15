import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, User, Calendar, ArrowRight } from 'lucide-react';
import './Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
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

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/register`, {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
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
                            <User size={32} />
                        </div>

                        <h2>Join Our Community</h2>
                        <p className="subtitle">Sign up to get started</p>

                        {error && <div className="error-alert">{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => {
                                            setFormData({ ...formData, name: e.target.value });
                                            if (error) setError('');
                                        }}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <div className="input-wrapper">
                                    <input
                                        type="email"
                                        placeholder="name@example.com"
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
                                        placeholder="••••••••"
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

                            <div className="form-group">
                                <label>Confirm Password</label>
                                <div className="input-wrapper">
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        onFocus={() => setIsPasswordFocused(true)}
                                        onBlur={() => setIsPasswordFocused(false)}
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn-primary-black" disabled={loading}>
                                {loading ? 'Creating account...' : 'Sign Up'}
                            </button>
                        </form>

                        <p className="auth-switch">
                            Already have an account? <Link to="/login">Log in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
