const express = require('express');
const router = express.Router()
const authController = require('../controllers/authController');

router.route("/signup")
.post(authController.signup)
//router.post("/signup",authController.signup)

router.route("/login")
.post(authController.login)
//router.post("/login",authController.login)

router.post('/logout',authController.logout)

module.exports = router;