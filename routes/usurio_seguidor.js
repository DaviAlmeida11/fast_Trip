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

const controllerUsuarioSeguidor = require('../controller/usuario.js/controller_usuario_seguidor')


router.get('/', cors(), async function (request, response) {
    let usuarioSeguidor = await controllerUsuarioSeguidor.listarUsuarioSeguidor()
    response.status(usuarioSeguidor.status_code)
    response.json(usuarioSeguidor)    
})

router.get('/:id', cors(), async function (request, response){
    let idUsuarioSeguidor  = request.params.id

    let usuarioSeguidor  = await controllerUsuarioSeguidor.buscarUsuarioSeguidorId(idUsuarioSeguidor)
    response.status(usuarioSeguidor .status_code)
    response.json(usuarioSeguidor )  


})


router.get('/usuario/:id', cors(), async function (request, response){
    let idUsuarioSeguidor  = request.params.id

    let usuarioSeguidor  = await controllerUsuarioSeguidor.listarSeguidoresUsuarioId(idUsuarioSeguidor )

    response.status(usuarioSeguidor.status_code)
    response.json(usuarioSeguidor )  


})


router.post('/', cors(), bodyParserJson, async function (request, response) {


    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let usuarioSeguidor = await controllerUsuarioSeguidor.inserirUsuarioSeguidor(dadosBody, contentType)
    

    response.status(usuarioSeguidor.status_code)
    response.json(usuarioSeguidor)
})


router.put('/:id', cors(), bodyParserJson, async function (request, response) {
    let dadosBody = request.body

    let idUsuarioSeguidor  = request.params.id

    let contentType = request.headers['content-type']
    
    let usuarioSeguidor  = await controllerUsuarioSeguidor.atualizarUsuarioSeguidor(dadosBody, idUsuarioSeguidor , contentType)

    response.status(usuarioSeguidor .status_code)
    response.json(usuarioSeguidor )
})

router.delete('/:id', cors(), async function (request, response) {
    let idUsuarioSeguidor = request.params.id

    let usuarioSeguidor = await controllerUsuarioSeguidor.excluirUsuarioSeguidor(idUsuarioSeguidor)
    response.status(usuarioSeguidor.status_code)
    response.json(usuarioSeguidor)

})

router.delete('/usuario/:id', cors(), async function (request, response) {
    let idUsuarioSeguidor = request.params.id

    let usuarioSeguidor = await controllerUsuarioSeguidor.excluirSeguidoresByUsuarioId(idUsuarioSeguidor)
    response.status(usuarioSeguidor.status_code)
    response.json(usuarioSeguidor)

})



module.exports = router
