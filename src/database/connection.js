module.exports = db;
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./data/database.sqlite", (err) => {

    if (err) {
        console.log("Error al conectar la base de datos");
    } else {
        console.log("Base de datos conectada");
    }

});

db.run(`
    CREATE TABLE IF NOT EXISTS gestos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        flex1 INTEGER,
        flex2 INTEGER,
        anguloX INTEGER
    )
`);

module.exports = db;