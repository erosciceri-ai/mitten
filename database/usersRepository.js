const db = require("./connection");

function crearUsuario(username, password) {

    return new Promise((resolve, reject) => {

        db.run(
            `
            INSERT INTO usuarios
            (username, password)
            VALUES (?, ?)
            `,
            [username, password],

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

function buscarPorUsername(username) {

    return new Promise((resolve, reject) => {

        db.get(
            `
            SELECT *
            FROM usuarios
            WHERE username = ?
            `,
            [username],

            (err, row) => {

                if (err) {
                    reject(err);
                    return;
                }

                resolve(row);

            }
        );

    });

}

function buscarPorId(id) {

    return new Promise((resolve, reject) => {

        db.get(
            `
            SELECT *
            FROM usuarios
            WHERE id = ?
            `,
            [id],

            (err, row) => {

                if (err) {
                    reject(err);
                    return;
                }

                resolve(row);

            }
        );

    });

}

module.exports = {
    crearUsuario,
    buscarPorUsername,
    buscarPorId
};