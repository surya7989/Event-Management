import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api';
import { Calendar, Clock, MapPin, XCircle, ChevronRight } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!user) return <Navigate to="/login" />;

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            const { data } = await api.get('/api/registrations/my-registrations', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRegistrations(data);
        } catch (error) {
            console.error('Error fetching registrations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (eventId) => {
        if (!window.confirm('Are you sure you want to cancel this registration?')) return;
        try {
            await api.post('/api/registrations/cancel',
                { eventId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchRegistrations();
        } catch (error) {
            alert('Failed to cancel registration');
        }
    };

    const activeRegistrations = registrations.filter(r => r && r.event && r.status === 'Registered');
    const upcomingEvents = activeRegistrations.filter(r => new Date(r.event.date) >= new Date());
    const pastEvents = activeRegistrations.filter(r => new Date(r.event.date) < new Date());

    return (
        <div className="dashboard-page container">
            <header className="dashboard-header">
                <h1>User Dashboard</h1>
                <p>Welcome back, {user?.name || 'User'}! Track and manage your event registrations here.</p>
            </header>

            <div className="stats-grid">
                <div className="stat-card card">
                    <div className="stat-icon info"><Calendar /></div>
                    <div className="stat-info">
                        <h3>{activeRegistrations.length}</h3>
                        <p>Total Registered</p>
                    </div>
                </div>
                <div className="stat-card card">
                    <div className="stat-icon success"><Clock /></div>
                    <div className="stat-info">
                        <h3>{upcomingEvents.length}</h3>
                        <p>Upcoming Events</p>
                    </div>
                </div>
                <div className="stat-card card">
                    <div className="stat-icon muted"><ChevronRight /></div>
                    <div className="stat-info">
                        <h3>{pastEvents.length}</h3>
                        <p>Past Events</p>
                    </div>
                </div>
            </div>

            <section className="dashboard-section">
                <h2>Upcoming Events</h2>
                {loading ? (
                    <p>Loading your events...</p>
                ) : upcomingEvents.length > 0 ? (
                    <div className="registration-list">
                        {upcomingEvents.map(reg => (
                            <div key={reg._id} className="registration-item card">
                                <div className="reg-event-img">
                                    <img
                                        src={reg.event?.image || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=200&q=80'}
                                        alt=""
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=200&q=80';
                                        }}
                                    />
                                </div>
                                <div className="reg-content">
                                    <h3>{reg.event?.name}</h3>
                                    <div className="reg-meta">
                                        <span><Calendar size={14} /> {reg.event?.date ? new Date(reg.event.date).toLocaleDateString() : 'N/A'}</span>
                                        <span><MapPin size={14} /> {reg.event?.location || 'TBA'}</span>
                                    </div>
                                </div>
                                <div className="reg-actions">
                                    <span className="badge badge-success">Confirmed</span>
                                    <button onClick={() => handleCancel(reg.event._id)} className="cancel-btn">
                                        <XCircle size={18} /> Cancel
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-panel card">
                        <p>No upcoming events. <a href="/">Explore events</a> to get started!</p>
                    </div>
                )}
            </section>

            <section className="dashboard-section mt-12">
                <h2>Past Event History</h2>
                {pastEvents.length > 0 ? (
                    <div className="registration-list past-list">
                        {pastEvents.map(reg => (
                            <div key={reg._id} className="registration-item card muted-item">
                                <div className="reg-event-img">
                                    <img
                                        src={reg.event?.image || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=200&q=80'}
                                        alt=""
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=200&q=80';
                                        }}
                                    />
                                </div>
                                <div className="reg-content">
                                    <h3>{reg.event?.name}</h3>
                                    <div className="reg-meta">
                                        <span><Calendar size={14} /> {reg.event?.date ? new Date(reg.event.date).toLocaleDateString() : 'N/A'}</span>
                                        <span><MapPin size={14} /> {reg.event?.location || 'TBA'}</span>
                                    </div>
                                </div>
                                <div className="reg-actions">
                                    <span className="badge">Completed</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-panel card">
                        <p>No past events found.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Dashboard;
