const db = require("./connection");

function crearGesto(
    usuarioId,
    nombre,
    datos,
    audio
) {

    return new Promise((resolve, reject) => {

        db.run(
            `
            INSERT INTO gestos
            (
                usuario_id,
                nombre,
                datos,
                audio
            )
            VALUES (?, ?, ?, ?)
            `,
            [
                usuarioId,
                nombre,
                JSON.stringify(datos),
                audio
            ],

            function(err) {

                if (err) {
                    reject(err);
                    return;
                }

                resolve(this.lastID);

            }

        );

    });

}

function obtenerGestosUsuario(
    usuarioId
) {

    return new Promise((resolve, reject) => {

        db.all(
            `
            SELECT *
            FROM gestos
            WHERE usuario_id = ?
            `,
            [usuarioId],

            (err, rows) => {

                if (err) {
                    reject(err);
                    return;
                }

                const gestos = rows.map(
                    gesto => ({
                        ...gesto,
                        datos: JSON.parse(
                            gesto.datos
                        )
                    })
                );

                resolve(gestos);

            }

        );

    });

}

function buscarGestoPorId(id) {

    return new Promise((resolve, reject) => {

        db.get(
            `
            SELECT *
            FROM gestos
            WHERE id = ?
            `,
            [id],

            (err, row) => {

                if (err) {
                    reject(err);
                    return;
                }

                if (row) {

                    row.datos =
                        JSON.parse(
                            row.datos
                        );

                }

                resolve(row);

            }

        );

    });

}

function eliminarGesto(id) {

    return new Promise((resolve, reject) => {

        db.run(
            `
            DELETE FROM gestos
            WHERE id = ?
            `,
            [id],

            function(err) {

                if (err) {
                    reject(err);
                    return;
                }

                resolve();

            }

        );

    });

}
function actualizarGesto(
    id,
    nombre,
    datos,
    audio
) {

    return new Promise((resolve, reject) => {

        db.run(
            `
            UPDATE gestos
            SET
                nombre = ?,
                datos = ?,
                audio = ?
            WHERE id = ?
            `,
            [
                nombre,
                JSON.stringify(datos),
                audio,
                id
            ],

            function(err) {

                if (err) {
                    reject(err);
                    return;
                }

                resolve(
                    this.changes > 0
                );

            }

        );

    });

}
module.exports = {
    crearGesto,
    obtenerGestosUsuario,
    buscarGestoPorId,
    actualizarGesto,
    eliminarGesto
};