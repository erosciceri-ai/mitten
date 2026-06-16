const {

    crearGesto,
    obtenerGestosUsuario,
    buscarGestoPorId,
    actualizarGesto,
    eliminarGesto

} = require("../../database/gesturesRepository");

const {
    generarAudio,
    eliminarAudio
} = require("../services/ttsService");

async function crear(req, res) {

    try {

        const usuarioId = req.user.id;

        const {
            nombre,
            datos
        } = req.body;

        if (!nombre) {

            return res.status(400).json({
                error: "Nombre requerido"
            });

        }

        if (!datos) {

            return res.status(400).json({
                error: "Datos requeridos"
            });

        }

        const audio = await generarAudio(nombre);

        const id = await crearGesto(
            usuarioId,
            nombre,
            datos,
            audio
        );

        return res.status(201).json({

            mensaje: "Gesto creado correctamente",

            gesto: {
                id,
                nombre,
                audio
            }

        });

    }
    catch(error) {

        console.error(error);

        return res.status(500).json({
            error: error.message
        });

    }

}
async function actualizar(
    req,
    res
) {

    try {

        const gestoId =
            Number(req.params.id);

        const usuarioId =
            req.user.id;

        const {
            nombre,
            datos
        } = req.body;

        const gesto =
            await buscarGestoPorId(
                gestoId
            );

        if (!gesto) {

            return res.status(404).json({
                error:
                    "Gesto no encontrado"
            });

        }

        if (
            gesto.usuario_id !==
            usuarioId
        ) {

            return res.status(403).json({
                error:
                    "No tienes permiso para modificar este gesto"
            });

        }

        const audio =
            gesto.audio;

        const actualizado =
            await actualizarGesto(
                gestoId,
                nombre,
                datos,
                audio
            );

        if (!actualizado) {

            return res.status(404).json({
                error:
                    "No se pudo actualizar"
            });

        }

        return res.json({
            mensaje:
                "Gesto actualizado correctamente"
        });

    }
    catch(error) {

        console.error(error);

        return res.status(500).json({
            error:
                error.message
        });

    }

}
async function listar(req, res) {

    try {

        const usuarioId = req.user.id;

        const gestos =
            await obtenerGestosUsuario(
                usuarioId
            );

        return res.json(gestos);

    }
    catch(error) {

        console.error(error);

        return res.status(500).json({
            error: error.message
        });

    }

}

async function sync(
    req,
    res
) {

    try {

        const usuarioId =
            req.user.id;

        const gestos =
            await obtenerGestosUsuario(
                usuarioId
            );

        const datosESP32 =
            gestos.map(
                gesto => ({

                    nombre:
                        gesto.nombre,

                    datos:
                        gesto.datos,

                    audio:
                        gesto.audio,
                    audioUrl:
                        `${process.env.BASE_URL}/audios/${gesto.audio}`

                })
            );

        return res.json(
            datosESP32
        );

    }
    catch(error) {

        console.error(error);

        return res.status(500).json({
            error: error.message
        });

    }

}

async function borrar(
    req,
    res
) {

    try {

        const gestoId =
            Number(req.params.id);

        const usuarioId =
            req.user.id;

        const gesto =
            await buscarGestoPorId(
                gestoId
            );

        if (!gesto) {

            return res.status(404).json({
                error:
                    "Gesto no encontrado"
            });

        }

        if (
            gesto.usuario_id !==
            usuarioId
        ) {

            return res.status(403).json({
                error:
                    "No tienes permiso para eliminar este gesto"
            });

        }

        await eliminarAudio(
            gesto.audio
        );

        await eliminarGesto(
            gestoId
        );

        return res.json({

            mensaje:
                "Gesto eliminado correctamente"

        });

    }
    catch(error) {

        console.error(error);

        return res.status(500).json({
            error:
                error.message
        });

    }

}

module.exports = {

    crear,
    listar,
    sync,
    actualizar,
    borrar

};