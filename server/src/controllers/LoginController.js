const express = require("express");
const knex = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

class LoginController {
    constructor() {
        router.post("/", this.login)
    }

    async login(req, res) {
        const { name, password } = req.body;
        try {
            const findUser = await knex('users').where({ name }).select('*').first()

            if (findUser) {
                const correctPassword = await bcrypt.compare(password, findUser.password);
                if (correctPassword) {
                    
                    const token = jwt.sign(
                        {
                            name,
                            role: findUser.role,
                            id: findUser.id
                        },
                        "authToken",
                        { expiresIn: 3600 }
                    )

                    res.status(200).send({ token })
                }
                res.status(400).send({ error: "Nome ou senha incorretos" })
            }
            res.status(400).send({ error: "Nome ou senha incorretos" })

        } catch (error) {
            res.status(400)
        }
    }
}

new LoginController;

module.exports = router;
