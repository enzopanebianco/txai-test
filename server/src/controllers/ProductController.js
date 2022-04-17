const express = require('express')
const knex = require("../database/connection")
const router = express.Router()
const authMiddleware = require('../middlewares/auth');

class ProductController{
    constructor(){
        router.use(authMiddleware).post("/",this.registerProduct)
        router.use(authMiddleware).get("/user",this.listProductByUser)
        router.use(authMiddleware).put("/:id",this.updateProduct)
        router.use(authMiddleware).get("/:id",this.showProductByID)
        router.use(authMiddleware).delete("/:id",this.deleteProduct)
    }

    async registerProduct(req,res){
        const {name,price,quantity} = req.body
        const {id} = req.user
        try {
            const product = await knex("products").insert({
                name,
                price,
                quantity,
                user_id:id,
                register_dt: new Date(Date.now())
            }).into("products")

            res.status(204).send(product)
        } catch (error) {
            
            res.status(400).send({erro:"Erro ao cadastrar produtos"})
        }
    }
    async listProductByUser(req,res){
        const {id} = req.user
        try {
            const products = await knex('products').where({user_id:id}).select('*')

            res.status(200).send(products)
        } catch (error) {
            res.status(400).send({error:'Erro ao listar produtos do usuário'})
        }
    }
    async updateProduct(req,res){
        const {id} = req.params;
        const {name,price,quantity} = req.body;

        try {

            const findProduct = await knex('products').select('*').where({id}).first()

            await knex('products').update({
                name:name?name:findProduct.name,
                price:price?price:findProduct.price,
                quantity:quantity?quantity:findProduct.quantity,
            }).where({id})
            res.status(200).send('OK')
        } catch (error) {
            res.status(400).send({error:"Erro ao editar produto"})

        }
    }
    async deleteProduct(req,res){
        const {id} = req.params;
        try {
            await knex("products").del().where({id})
            res.status(200).send("Ok")
        } catch (error) {
            res.status(400).send({error:"Erro ao deletar o produto"})
        }
    }
    async showProductByID(req,res){
        const {id} = req.params
        try {
            const product = await knex('products').select('*').where({id}).first()
            res.status(200).json({product})
        } catch (error) {
            res.status(400).send({error:"Error ao mostrar produto"})
        }
    }
}

new ProductController();

module.exports = router;