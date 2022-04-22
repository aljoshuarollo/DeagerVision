const express = require('express');
const authController = require('./../controllers/auth');

const router = express.Router();

router.post('/api/register-client', authController.registerClient);
router.post('/api/register-trainer', authController.registerTrainer);
router.post('/api/login', authController.login);
router.get('/api/auth', authController.isAuth);
router.post('/api/logout', authController.logout);

module.exports = router;
