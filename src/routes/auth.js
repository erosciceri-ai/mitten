const express = require("express");

const router = express.Router();

const {
    register,
    loginController
} = require("../controllers/authController");

router.post(
    "/register",
    register
);

router.post(
    "/login",
    loginController
);

module.exports = router;