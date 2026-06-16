const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
    crearUsuario,
    buscarPorUsername
} = require("../../database/usersRepository");

async function registrar(
    username,
    password
) {

    const usuarioExistente =
        await buscarPorUsername(
            username
        );

    if (usuarioExistente) {

        throw new Error(
            "El usuario ya existe"
        );

    }

    const passwordHash =
        await bcrypt.hash(password, 10);

    const id =
        await crearUsuario(
            username,
            passwordHash
        );

    return {
        id,
        username
    };

}

async function login(
    username,
    password
) {

    const usuario =
        await buscarPorUsername(
            username
        );

    if (!usuario) {

        throw new Error(
            "Usuario no encontrado"
        );

    }

    const passwordCorrecta =
        await bcrypt.compare(
            password,
            usuario.password
        );

    if (!passwordCorrecta) {

        throw new Error(
            "Contraseña incorrecta"
        );

    }

    const token =
        jwt.sign(

            {
                id: usuario.id,
                username: usuario.username
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );

    return {

        token,

        usuario: {
            id: usuario.id,
            username: usuario.username
        }

    };

}

module.exports = {
    registrar,
    login
};