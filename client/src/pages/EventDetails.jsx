import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { Calendar, MapPin, Users, Tag, ArrowLeft, CheckCircle } from 'lucide-react';
import './EventDetails.css';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchEvent();
        if (user) checkRegistration();
    }, [id]);

    const fetchEvent = async () => {
        try {
            const { data } = await api.get(`/api/events/${id}`);
            setEvent(data);
        } catch (error) {
            console.error('Error fetching event:', error);
        } finally {
            setLoading(false);
        }
    };

    const checkRegistration = async () => {
        try {
            const { data } = await api.get('/api/registrations/my-registrations', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const registered = data.some(reg => reg.event._id === id && reg.status === 'Registered');
            setIsRegistered(registered);
        } catch (error) {
            console.error('Error checking registration:', error);
        }
    };

    const handleAction = async () => {
        if (!user) return navigate('/login');

        setRegistering(true);
        try {
            const endpoint = isRegistered ? 'cancel' : 'register';
            await api.post(`/api/registrations/${endpoint}`,
                { eventId: id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setIsRegistered(!isRegistered);
            fetchEvent();
        } catch (error) {
            alert(error.response?.data?.message || 'Action failed');
        } finally {
            setRegistering(false);
        }
    };

    if (loading) return <div className="container py-10">Loading event details...</div>;
    if (!event) return <div className="container py-10">Event not found</div>;

    return (
        <div className="event-details-page">
            <div className="event-banner">
                <img
                    src={event.image || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80'}
                    alt={event.name}
                    onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80';
                    }}
                />
                <div className="banner-overlay">
                    <div className="container">
                        <button onClick={() => navigate(-1)} className="back-btn">
                            <ArrowLeft size={20} /> Back
                        </button>
                    </div>
                </div>
            </div>

            <div className="container event-content-wrapper">
                <div className="event-main">
                    <div className="event-header">
                        <span className="badge badge-info mb-2">{event.category}</span>
                        <h1>{event.name}</h1>
                        <div className="organizer-info">
                            Organized by <strong>{event.organizer}</strong>
                        </div>
                    </div>

                    <div className="event-description">
                        <h3>About this event</h3>
                        <p>{event.description}</p>
                    </div>
                </div>

                <aside className="event-sidebar">
                    <div className="sticky-card card">
                        <div className="sidebar-info-row">
                            <Calendar className="icon" />
                            <div>
                                <p className="label">Date and Time</p>
                                <p className="value">{new Date(event.date).toLocaleString([], { dateStyle: 'full', timeStyle: 'short' })}</p>
                            </div>
                        </div>

                        <div className="sidebar-info-row">
                            <MapPin className="icon" />
                            <div>
                                <p className="label">Location</p>
                                <p className="value">{event.location}</p>
                            </div>
                        </div>

                        <div className="sidebar-info-row">
                            <Users className="icon" />
                            <div>
                                <p className="label">Capacity</p>
                                <p className="value">{event.availableSeats} / {event.capacity} seats remaining</p>
                            </div>
                        </div>

                        <button
                            className={`btn w-full mt-6 ${isRegistered ? 'btn-outline' : 'btn-primary'}`}
                            onClick={handleAction}
                            disabled={registering || (event.availableSeats <= 0 && !isRegistered)}
                        >
                            {registering ? 'Processing...' : (
                                isRegistered ? 'Cancel Registration' : (
                                    event.availableSeats > 0 ? 'Register Now' : 'Sold Out'
                                )
                            )}
                        </button>

                        {isRegistered && (
                            <p className="success-msg">
                                <CheckCircle size={14} /> You are registered for this event
                            </p>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default EventDetails;
