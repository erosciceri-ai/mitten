const {
    registrar,
    login
} = require("../services/authService");

async function register(
    req,
    res
) {

    try {

        const {
            username,
            password
        } = req.body;

        const resultado =
            await registrar(
                username,
                password
            );

        res.status(201).json(resultado);

    }
    catch(error) {

        res.status(400).json({
            error: error.message
        });

    }

}

async function loginController(
    req,
    res
) {

    try {

        const {
            username,
            password
        } = req.body;

        const resultado =
            await login(
                username,
                password
            );

        res.json(resultado);

    }
    catch(error) {

        res.status(401).json({
            error: error.message
        });

    }

}

module.exports = {
    register,
    loginController
};