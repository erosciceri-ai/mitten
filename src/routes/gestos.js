const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const {
    crear,
    listar,
    sync,
    actualizar,
    borrar
} = require("../controllers/gestosController");
router.put(
    "/:id",
    authMiddleware,
    actualizar
);

router.post(
    "/",
    authMiddleware,
    crear
);

router.get(
    "/",
    authMiddleware,
    listar
);

router.get(
    "/sync",
    authMiddleware,
    sync
);

router.delete(
    "/:id",
    authMiddleware,
    borrar
);

module.exports = router;