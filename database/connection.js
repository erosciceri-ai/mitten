const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db");

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            username TEXT UNIQUE NOT NULL,

            password TEXT NOT NULL

        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS gestos (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            usuario_id INTEGER NOT NULL,

            nombre TEXT NOT NULL,

            datos TEXT NOT NULL,

            audio TEXT,

            FOREIGN KEY(usuario_id)
            REFERENCES usuarios(id)

        );
    `);

});

module.exports = db;