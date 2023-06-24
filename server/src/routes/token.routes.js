const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/token.controller');

router.post('/new-token', tokenController.newToken);
router.post("/verify-token",tokenController.verifyToken);
router.post("/",tokenController.getTokens);

module.exports = router;
