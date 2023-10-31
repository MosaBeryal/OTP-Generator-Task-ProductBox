const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller'); // Replace with the actual path to your user controller file

// route for creating users
router.post('/users', userController.createUser);
router.post('/users/generateOTP', userController.generateOTP);
router.get('/users/:user_id/verifyOTP', userController.verifyOTP);

module.exports = router;
