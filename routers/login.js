const express = require('express')
const login = express.Router()
const { checkLogin } = require('../controllers/loginController')
const response = require('../helpers/response')
const db = require('../config/conn')

//Swagger get Product
/**
 * @swagger
 * /products:
 *   get:
 *     summary: product fetcher
 *     tags: [products]
 *     responses:
 *       200:
 *         description: product fetched
 *       403:
 *         description: failed to fetch product
 */

login.route('/').post(async (req, res) => {
    const { email, userName, password } = req.body
    const data = {
        email, userName, password
    }
    try {
        const result = await checkLogin(data, req, res)
        response.success(result, "login Berhasil", res)
    } catch (err) {
        response.error({ error: err.message }, req.originalUrl, 403, res)
    }
    // res.send(await checkLogin(data))
})

module.exports = login
