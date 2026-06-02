require(dotenv).config();
const express = require("express")

const app = express()

app.get("/", (req, res) => {
    res.send("Backend funcionando")
})

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000")
})
app.use("/audios",
    express.static("audios")
);
app.post("/sensores", (req, res) => {

    const valores = req.body.sensores;

    const gesto = detectarGesto(valores);

    res.json({
        gesto: gesto
    });
});
