const express = require('express');
const { Booking, Event } = require('../models');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/:eventId', authenticate, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.eventId);
    if (!event || event.availableSeats <= 0) {
      return res.status(400).json({ message: 'No available seats or event not found' });
    }

    const booking = await Booking.create({
      userId: req.user.id,
      eventId: req.params.eventId,
    });

    await event.update({ availableSeats: event.availableSeats - 1 });
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    res.status(500).json({ message: 'Booking failed', error: err.message });
  }
});

router.get('/', authenticate, async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.user.id },
      include: ['Event']
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch bookings', error: err.message });
  }
});

router.delete('/:bookingId', authenticate, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      where: { id: req.params.bookingId, userId: req.user.id },
    });

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const event = await Event.findByPk(booking.eventId);
    if (event) {
      await event.update({ availableSeats: event.availableSeats + 1 });
    }

    await booking.destroy();
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ message: 'Cancel failed', error: err.message });
  }
});

module.exports = router;
