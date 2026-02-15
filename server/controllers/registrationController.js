const Registration = require('../models/Registration');
const Event = require('../models/Event');

const registerForEvent = async (req, res) => {
    try {
        const { eventId } = req.body;
        const userId = req.user.id;

        const existingReg = await Registration.findOne({ user: userId, event: eventId });
        if (existingReg && existingReg.status === 'Registered') {
            return res.status(400).json({ message: 'Already registered for this event' });
        }

        // Atomic update to decrease available seats if seats > 0
        const event = await Event.findOneAndUpdate(
            { _id: eventId, availableSeats: { $gt: 0 } },
            { $inc: { availableSeats: -1 } },
            { new: true }
        );

        if (!event) {
            return res.status(400).json({ message: 'No seats available or event not found' });
        }

        if (existingReg) {
            existingReg.status = 'Registered';
            await existingReg.save();
        } else {
            await Registration.create({ user: userId, event: eventId });
        }

        res.status(201).json({ message: 'Successfully registered' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const cancelRegistration = async (req, res) => {
    try {
        const { eventId } = req.body;
        const userId = req.user.id;

        const registration = await Registration.findOne({ user: userId, event: eventId });
        if (!registration || registration.status === 'Cancelled') {
            return res.status(400).json({ message: 'No active registration found' });
        }

        registration.status = 'Cancelled';
        await registration.save();

        // Atomic update to increase available seats
        await Event.findByIdAndUpdate(eventId, { $inc: { availableSeats: 1 } });

        res.json({ message: 'Registration cancelled' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find({ user: req.user.id }).populate('event');
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerForEvent, cancelRegistration, getUserRegistrations };
