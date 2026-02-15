const Event = require('../models/Event');

const getEvents = async (req, res) => {
    try {
        const { category, location, search, date } = req.query;
        let query = {};

        if (category) query.category = category;
        if (location) query.location = { $regex: location, $options: 'i' };
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (date) {
            const selectedDate = new Date(date);
            const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
            const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));
            query.date = { $gte: startOfDay, $lte: endOfDay };
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const skip = (page - 1) * limit;

        const total = await Event.countDocuments(query);
        const events = await Event.find(query)
            .sort({ date: 1 })
            .skip(skip)
            .limit(limit);

        res.json({
            events,
            page,
            pages: Math.ceil(total / limit),
            total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createEvent = async (req, res) => {
    try {
        const event = await Event.create({ ...req.body, createdBy: req.user.id });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getEvents, getEventById, createEvent };
