const express = require('express');
const { registerForEvent, cancelRegistration, getUserRegistrations } = require('../controllers/registrationController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(protect);
router.post('/register', registerForEvent);
router.post('/cancel', cancelRegistration);
router.get('/my-registrations', getUserRegistrations);

module.exports = router;
