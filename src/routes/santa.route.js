const express = require('express');
const { generateAssignments } = require('../controller/santa.controller');

const router = express.Router();

router.post('/assign', generateAssignments);

module.exports = router;