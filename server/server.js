const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5000',
    'https://event-management-frontend-a8j4.onrender.com'
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/registrations', require('./routes/registrationRoutes'));

app.get('/', (req, res) => {
    res.send('Event Management API is running...');
});

// Database Connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => {
        console.error('MongoDB Connection Error:', err);
        // Exit process on DB failure so Render can try restarting or logs show crash
        process.exit(1);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
