const db = require("../data/database");

const generarAudio = require("../services/ttsService");

const crearGesto = (req, res) => {
    console.log("POST recibido");
    console.log(req.body);

    const {
        nombre,
        flex1,
        flex2,
        anguloX
    } = req.body;

    db.run(
        `
        INSERT INTO gestos (nombre, flex1, flex2, anguloX)
        VALUES (?, ?, ?, ?)
        `,
        [nombre, flex1, flex2, anguloX],

        async function(err) {

            if (err) {

                return res.status(500).json({
                    ok: false,
                    error: err.message
                });

            }

            console.log("Intentando generar audio...");

            try {

                const ruta = await generarAudio(nombre);

                console.log("Audio generado:", ruta);

                res.json({
                    ok: true,
                    mensaje: "Gesto guardado y audio generado",
                    id: this.lastID
                });

            } catch(error) {

                console.log(error);

                res.status(500).json({
                    ok: false,
                    error: error.message
                });

            }

        }
    );

};

const obtenerGestos = (req, res) => {

    db.all(
        "SELECT * FROM gestos",
        [],
        (err, rows) => {

            if (err) {

                return res.status(500).json({
                    ok: false,
                    error: err.message
                });

            }

            res.json(rows);

        }
    );

};

module.exports = {
    crearGesto,
    obtenerGestos
};