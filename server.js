const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
    definition: {
        swagger: "2.0",
        title: "API DOCS LOGRES",
        openapi: "3.1.0",
        info: {
            title: "API DOCS LOGRES",
            description: "POS-SERVER API Documentation For LOGRES PROJECTS"
        },
        schemes: ["dev"]
    },
    apis: ["./routers/*.js"],
};

const app = express()
const port = 7777

const specs = swaggerJsdoc(options)
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
)

app.use(cors())
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("halo")
})

const loginn = require('./routers/login')
const register = require('./routers/register')

app.use('/login', loginn)
app.use('/register', register)

app.listen(port, () => {
    console.log(`Server run at localhost:${port}`)
})