const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');

// Do not call the function here, just pass the reference
router.post("/get-review", aiController.getResponse);

module.exports = router;