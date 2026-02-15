import { Calendar, Github, Twitter, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-brand">
                    <div className="logo">
                        <Calendar className="logo-icon" />
                        <span>EventHub</span>
                    </div>
                    <p>The premium ecosystem for discovering and managing world-class events.</p>
                </div>

                <div className="footer-links">
                    <div className="link-group">
                        <h4>Platform</h4>
                        <a href="/">Explore Events</a>
                        <a href="/dashboard">User Dashboard</a>
                    </div>
                    <div className="link-group">
                        <h4>Account</h4>
                        <a href="/login">Sign In</a>
                        <a href="/register">Create Account</a>
                    </div>
                </div>


            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 EventHub. Built for Bellcorp Assignment.</p>
            </div>
        </footer>
    );
};

export default Footer;
