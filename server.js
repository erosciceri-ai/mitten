require("dotenv").config();
const path =
    require("path");
const express = require("express");
const cors = require("cors");

const app = express();

const gestosRoutes = require("./src/routes/gestos");
const authRoutes = require("./src/routes/auth");
app.use(cors());

app.use(express.json());
app.use(
    "/audios",
    express.static(
        path.join(
            __dirname,
            "audios"
        )
    )
);
app.use(
    "/api/auth",
    authRoutes
);
app.use("/api/gestos", gestosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});