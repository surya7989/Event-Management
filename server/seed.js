const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Event');

const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const events = [
    {
        name: "Tech Innovators Conference 2026",
        organizer: "TechWorld Global",
        description: "Join the brightest minds in technology for a weekend of innovation, networking, and expert keynotes. Covering AI, Web3, and Sustainable Tech.",
        location: "San Francisco, CA",
        date: "2026-06-15T09:00:00Z",
        category: "Tech",
        capacity: 500,
        availableSeats: 450,
        image: "https://images.unsplash.com/photo-1540575861501-7ad05823c951?auto=format&fit=crop&w=1200&q=80"
    },
    {
        name: "Midnight Jazz Festival",
        organizer: "Blue Moon Entertainment",
        description: "An enchanting evening featuring world-class jazz musicians under the stars. Experience the smooth rhythms in our open-air amphitheater.",
        location: "New Orleans, LA",
        date: "2026-05-20T19:30:00Z",
        category: "Music",
        capacity: 200,
        availableSeats: 5,
        image: "https://images.unsplash.com/photo-1514525253361-b83f859b20c0?auto=format&fit=crop&w=1200&q=80"
    },
    {
        name: "Future of Finance Summit",
        organizer: "WealthWise Group",
        description: "Navigate the changing landscape of global finance. Topics include digital currencies, ethical investing, and market trends for 2027.",
        location: "London, UK",
        date: "2026-08-10T10:00:00Z",
        category: "Business",
        capacity: 300,
        availableSeats: 120,
        image: "https://images.unsplash.com/photo-1591189863430-ab87e120f312?auto=format&fit=crop&w=1200&q=80"
    },
    {
        name: "Global Food & Wine Expo",
        organizer: "Taste of World",
        description: "Sample the finest cuisines and vintages from over 50 countries. Dedicated workshops with Michelin-starred chefs.",
        location: "Paris, France",
        date: "2026-07-05T11:00:00Z",
        category: "Food",
        capacity: 1000,
        availableSeats: 800,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80"
    },
    {
        name: "Indie Rock Night",
        organizer: "Echo Park Music",
        description: "A night dedicated to the best up-and-coming indie rock bands in the city. Energy, passion, and great music guaranteed.",
        location: "Austin, TX",
        date: "2026-04-12T20:00:00Z",
        category: "Music",
        capacity: 150,
        availableSeats: 20,
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80"
    },
    {
        name: "Startup Pitch Day",
        organizer: "Silicon Valley Hub",
        description: "Watch the next generation of founders pitch their ideas to top-tier VCs. Networking session to follow.",
        location: "Palo Alto, CA",
        date: "2026-09-22T09:30:00Z",
        category: "Tech",
        capacity: 100,
        availableSeats: 15,
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80"
    },
    {
        name: "Outdoor Yoga Retreat",
        organizer: "Zen Garden",
        description: "Find your inner peace with a full-day yoga and meditation session in the heart of nature.",
        location: "Denver, CO",
        date: "2026-05-10T07:00:00Z",
        category: "Sports",
        capacity: 50,
        availableSeats: 45,
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80"
    }
];

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('MongoDB Connected for seeding...');
        await Event.deleteMany({});
        await Event.insertMany(events);
        console.log('Database Seeded Successfully!');
        process.exit();
    })
    .catch(err => {
        console.error('Seeding Error:', err);
        process.exit(1);
    });
