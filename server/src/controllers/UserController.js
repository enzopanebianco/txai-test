const express = require("express");
const knex = require("../database/connection");
const bcrypt = require("bcrypt");
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const jwt = require('jsonwebtoken');
const adminMiddleware = require('../middlewares/admin');

class UserController {
    constructor() {
        router.post('/', this.registerUser);
        router.use(adminMiddleware).get("/", this.getUsers)
        router.get("/:id", this.showUser)
        router.use(adminMiddleware).put("/:id", this.updateUser)
        router.use(adminMiddleware).delete("/:id", this.deleteUser)
    }

    async getUsers(req, res) {
        try {
            const users = await knex("users").select("*")

            if (users.length === 0) {
                res.status(404).send({ message: "Nenhum usuário encontrado" })
            }
            res.status(200).send(users);
        } catch (error) {
            console.log(error)
            res.status(400).send({ error })
        }

    }
    async registerUser(req, res) {
        const { name, password } = req.body;

        try {
            const hashPassword = await bcrypt.hash(password, 16)

            const user = await knex("users").insert({
                name,
                password: hashPassword,
                role: 2
            })
            const findUser = await knex("users").where({ name }).select().first()

            const token = jwt.sign(
                {
                    name, role: findUser.role, id: findUser.id
                },
                "authToken",
                { expiresIn: 3600 }
            )

            res.status(201).send({ token });
        } catch (error) {
            res.status(400).json({ error })
        }

    }

    async updateUser(req, res) {
        const { id } = req.params;
        const { name, password } = req.body;
        try {

            const findUser = await knex("users").select().where({ id }).first()

            await knex("users")
                .where({ id })
                .update({
                    name: name ? name : findUser.name,
                    password: password ? password : findUser.password
                })

            res.sendStatus(200)
        } catch (error) {
            res.sendStatus(400).send(error)
        }
    }
    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            await knex("users").where({ id }).del()

            res.status(200).send('Ok')
        }
        catch (error) {
            res.status(400).send(error)
        }
    }
    async showUser(req, res) {
        const { id } = req.params;
        try {
            const user = await knex("users").where({ id }).select().first()

            res.status(200).send(user)
        }
        catch (error) {
            res.status(400).send(error)
        }
    }
}

new UserController();

module.exports = router;