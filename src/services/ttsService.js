const gTTS = require("gtts");
const fs = require("fs");
const path = require("path");
const eliminarAudio = (nombreArchivo) => {

    return new Promise((resolve, reject) => {

        const rutaCompleta =
            path.join(
                process.cwd(),
                "audios",
                nombreArchivo
            );

        if (
            !fs.existsSync(
                rutaCompleta
            )
        ) {

            resolve();
            return;

        }

        fs.unlink(
            rutaCompleta,
            (err) => {

                if (err) {

                    reject(err);
                    return;

                }

                resolve();

            }
        );

    });

};
const generarAudio = (texto) => {

    return new Promise((resolve, reject) => {

        const carpetaAudios =
            path.join(
                process.cwd(),
                "audios"
            );

        if (
            !fs.existsSync(
                carpetaAudios
            )
        ) {

            fs.mkdirSync(
                carpetaAudios
            );

        }

        const nombreSeguro =
            texto
                .replace(
                    /[^a-zA-Z0-9]/g,
                    "_"
                )
                .toLowerCase();

        const nombreArchivo =
            `${nombreSeguro}_${Date.now()}.mp3`;

        const rutaCompleta =
            path.join(
                carpetaAudios,
                nombreArchivo
            );

        const gtts =
            new gTTS(
                texto,
                "es"
            );

        gtts.save(
            rutaCompleta,
            (err) => {

                if (err) {

                    reject(err);
                    return;

                }

                resolve(
                    nombreArchivo
                );

            }
        );

    });

};

module.exports = {
    generarAudio,
    eliminarAudio
};