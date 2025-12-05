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

const controllerComentario = require('../controller/comentario.js/controller_comentario')

router.get('/', cors(), async function (request, response) {
    let comentario = await controllerComentario.listarComentario()
    response.status(comentario.status_code)
    response.json(comentario)    
})

router.get('/:id', cors(), async function (request, response) {
    let idComentario = request.params.id

    let comentario = await controllerComentario.listarComentarioId(idComentario)
    response.status(comentario.status_code)
    response.json(comentario)

})



router.post('/', cors(), bodyParserJson, async function (request, response) {


    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let comentario = await controllerComentario.inserirComentario(dadosBody, contentType)

    response.status(comentario.status_code)
    response.json(comentario)
})


router.put('/:id', cors(), bodyParserJson, async function (request, response) {
    let dadosBody = request.body

    let idComentario = request.params.id

    let contentType = request.headers['content-type']
    
    let comentario = await controllerComentario.atualizarComentario(dadosBody, idComentario, contentType)

    response.status(comentario.status_code)
    response.json(comentario)
})

router.delete('/:id', cors(), async function (request, response) {
    let idComentario = request.params.id

    let comentario = await controllerComentario.excluirComentario(idComentario)
    response.status(comentario.status_code)
    response.json(comentario)

})


module.exports = router
