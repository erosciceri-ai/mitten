const gTTS = require("gtts");

const generarAudio = (texto) => {

    return new Promise((resolve, reject) => {

        const gtts = new gTTS(texto, "es");

        const ruta = `./audios/${texto}.mp3`;

        gtts.save(ruta, (err) => {

            if (err) {

                reject(err);

            } else {

                resolve(ruta);

            }

        });

    });

};

module.exports = generarAudio;