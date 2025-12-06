
//Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// CRIA UM FORMATO JSON
const bodyParserJson = bodyParser.json()


//configurção do cors 
const router = express.Router()
router.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    router.use(cors())
    next()
})



const controllerUsuarioLogin = require('../controller/usuario.js/controller_userLogin')



router.post('/', cors(), bodyParserJson, async function (request, response) {

    let dadosBody = request.body
    
    let contentType = request.headers['content-type']
console.log(contentType)
    let usuario = await controllerUsuarioLogin.validarLoginUsuario(dadosBody, contentType)

    response.status(usuario.status_code)
    response.json(usuario)

})
module.exports = router