const express = require("express");

const router = express.Router();

const {
    crearGesto,
    obtenerGestos
} = require("../controllers/gestosController");

router.post("/", crearGesto);

router.get("/", obtenerGestos);

module.exports = router;