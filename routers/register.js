const express = require('express')
const regis = express.Router()
const { regisData } = require('../controllers/regisController')
const response = require('../helpers/response')

regis.route('/').post(async (req, res) => {
    try {
        const { email, userName, password } = req.body
        const data = {
            email, userName, password
        }
        const result = await regisData(data)
        response.success(result, "Registrasi Berhasil", res)
    }
    catch (err) {
        response.error({error: err.message}, req.originalUrl, 403, res)
    }
})

module.exports = regis