import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Calendar, LogOut } from 'lucide-react';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="container header-content">
                <Link to="/" className="logo">
                    <Calendar className="logo-icon" />
                    <span>EventHub</span>
                </Link>



                <nav className="nav">
                    <Link to="/" className="nav-link">Explore</Link>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            <div className="user-profile">
                                <div className="avatar">
                                    {user.name.charAt(0)}
                                </div>
                                <button onClick={handleLogout} className="logout-btn">
                                    <LogOut size={18} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="auth-btns">
                            <Link to="/login" className="btn btn-outline">Login</Link>
                            <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
