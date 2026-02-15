import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';
import './EventCard.css';

const EventCard = ({ event }) => {
    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="card event-card">
            <div className="event-image">
                <img
                    src={event.image || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80'}
                    alt={event.name}
                    onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80';
                    }}
                />
                <div className="category-tag">{event.category}</div>
            </div>

            <div className="event-info">
                <h3 className="event-name" title={event.name}>
                    {truncate(event.name, 45)}
                </h3>

                <div className="event-meta">
                    <div className="meta-item">
                        <Calendar size={14} />
                        <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="meta-item" title={event.location}>
                        <MapPin size={14} />
                        <span>{truncate(event.location, 25)}</span>
                    </div>
                </div>

                <div className="event-footer">
                    <div className="seats-indicator">
                        <Users size={14} />
                        <span className={event.availableSeats < 10 ? 'text-low' : ''}>
                            {event.availableSeats} seats left
                        </span>
                    </div>
                    <Link to={`/event/${event._id}`} className="btn btn-primary btn-sm">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
