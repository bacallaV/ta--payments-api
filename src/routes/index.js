const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/customers', require('./customer.routes'));
router.use('/payments', require('./payment.routes'));

module.exports = router;