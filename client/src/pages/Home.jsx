import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import EventCard from '../components/events/EventCard';
import { Filter, MapPin, Calendar as CalendarIcon, Search, X } from 'lucide-react';
import './Home.css';

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: 1, pages: 1 });

    const filters = {
        category: searchParams.get('category') || '',
        location: searchParams.get('location') || '',
        search: searchParams.get('search') || '',
        date: searchParams.get('date') || '',
        page: searchParams.get('page') || 1
    };

    useEffect(() => {
        fetchEvents();
    }, [searchParams]);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/events`, { params: filters });
            setEvents(data.events);
            setPagination({ page: data.page, pages: data.pages });
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setTimeout(() => setLoading(false), 500);
        }
    };

    const handleFilterChange = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }
        setSearchParams(newParams);
    };

    const clearFilters = () => {
        setSearchParams({});
    };

    return (
        <div className="home-page">
            <section className="hero">
                <div className="hero-bg-animated"></div>
                <div className="container hero-content">
                    <h1>Experience The Best Events</h1>
                    <p>Discover, register, and manage your event journey with ease.</p>

                    <div className="hero-search glass">
                        <Search size={20} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by name or description..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                        />
                    </div>
                </div>
            </section>

            <div className="container main-content">
                <aside className="filters-bar card">
                    <div className="filter-header">
                        <h3>Filters</h3>
                        {(filters.category || filters.location || filters.date || filters.search) && (
                            <button onClick={clearFilters} className="clear-btn-mobile">Clear All</button>
                        )}
                    </div>

                    <div className="filter-group">
                        <label><Filter size={16} /> Category</label>
                        <select
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                        >
                            <option value="">All Categories</option>
                            <option value="Music">Music</option>
                            <option value="Tech">Tech</option>
                            <option value="Sports">Sports</option>
                            <option value="Business">Business</option>
                            <option value="Food">Food</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label><MapPin size={16} /> Location</label>
                        <input
                            type="text"
                            placeholder="City or Venue"
                            value={filters.location}
                            onChange={(e) => handleFilterChange('location', e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <label><CalendarIcon size={16} /> Date</label>
                        <input
                            type="date"
                            value={filters.date}
                            onChange={(e) => handleFilterChange('date', e.target.value)}
                        />
                    </div>

                    <button className="clear-filters-btn" onClick={clearFilters}>
                        Reset All Filters
                    </button>
                </aside>

                <section className="events-grid-section">
                    {loading ? (
                        <div className="grid">
                            {[1, 2, 3, 4, 5, 6].map(n => (
                                <div key={n} className="skeleton-card card">
                                    <div className="skeleton-img"></div>
                                    <div className="skeleton-content">
                                        <div className="skeleton-title"></div>
                                        <div className="skeleton-text"></div>
                                        <div className="skeleton-text short"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : events.length > 0 ? (
                        <>
                            <div className="grid">
                                {events.map(event => (
                                    <EventCard key={event._id} event={event} />
                                ))}
                            </div>

                            {pagination.pages > 1 && (
                                <div className="pagination-bar card">
                                    <button
                                        className="btn btn-outline"
                                        disabled={pagination.page <= 1}
                                        onClick={() => handleFilterChange('page', Number(pagination.page) - 1)}
                                    >
                                        Previous
                                    </button>
                                    <span className="page-info">
                                        Page {pagination.page} of {pagination.pages}
                                    </span>
                                    <button
                                        className="btn btn-outline"
                                        disabled={pagination.page >= pagination.pages}
                                        onClick={() => handleFilterChange('page', Number(pagination.page) + 1)}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="empty-state card">
                            <div className="empty-content">
                                <CalendarIcon size={64} className="empty-icon" />
                                <h3>No events found</h3>
                                <p>We couldn't find any events matching your current filters.</p>
                                <button onClick={clearFilters} className="btn btn-primary mt-4">
                                    Clear All Filters
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Home;
