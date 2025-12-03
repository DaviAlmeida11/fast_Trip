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

router.post('/', cors(), bodyParserJson, async function (request, response) {


    let dadosBody = request.body;
    let contentType = request.headers['content-type']

    let usuario = await controllerUsuario.inserirUsuario(dadosBody, contentType)

    response.status(usuario.status_code)
    response.json(usuario)
})

router.put('/:id', cors(), bodyParserJson, async function (request, response) {
    let dadosBody = request.body

    let idUsuario = request.params.id

    let contentType = request.headers['content-type']
    
    let usuario = await controllerUsuario.atualizarUsuario(dadosBody, idUsuario, contentType)

    response.status(usuario.status_code)
    response.json(usuario)
})

router.delete('/:id', cors(), async function (request, response) {
    let idUsuario = request.params.id

    let usuario = await controllerUsuario.excluirUsuario(idUsuario)
    response.status(usuario.status_code)
    response.json(usuario)

    
})
module.exports = router

