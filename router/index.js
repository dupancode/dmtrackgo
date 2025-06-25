const express = require('express');
const router = express.Router();
const { getCourierList, trackCourier } = require('../controller/courierList');

// POST /api/dmtrackgo/couriers
router.post('/couriers', getCourierList);

// POST /api/dmtrackgo/track
router.post('/track', trackCourier);

module.exports = router;