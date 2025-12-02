//Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// CRIA UM FORMATO JSON
const bodyParserJson = bodyParser.json()


//configurção do cors 
const router = express.Router()
router.use((request, response, next ) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    router.use(cors())
    next()
})

// ENDPOINTS DA TABELA Usuario

const controllerUsuario = require('../controller/usuario.js/controller_usuario')

router.get('/', cors(), async function (request, response) {
    let usuario = await controllerUsuario.listarUsuarios()
    response.status(usuario.status_code)
    response.json(usuario)    
})


router.get('/:id', cors(), async function (request, response){
    let idUsuario = request.params.id

    let usuario = await controllerUsuario.listarUsuarioId(idUsuario)
    response.json(usuario)


})

module.exports = router