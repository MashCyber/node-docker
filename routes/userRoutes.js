const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router()

router.route("/signup")
.post(authController.signup)
//router.post("/signup",authController.signup)

router.route("/login")
.post(authController.login)
//router.post("/login",authController.login)

router.post('/logout',authController.logout)

module.exports = router;