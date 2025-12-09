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

const controllerUsuaroVIagem = require('../controller/usuario.js/controller_usuarioViagem')


router.get('/', cors(), async function (request, response) {
    let usuarioViagem = await controllerUsuaroVIagem.listarUsuarioViagem()
    response.status(usuarioViagem.status_code)
    response.json(usuarioViagem)    
})

router.get('/:id', cors(), async function (request, response){
    let idUsuarioViagem   = request.params.id

    let usuarioViagem  = await controllerUsuarioSeguidor.buscarUsuarioSeguidorId(idUsuarioViagem)
    response.status(usuarioViagem.status_code)
    response.json(usuarioViagem)  


})


router.get('/usuario/:id', cors(), async function (request, response){
    let idUsuarioViagem  = request.params.id

    let usuarioViagem  = await controllerUsuaroVIagem.listarViagensUsuarioId(idUsuarioViagem)

    response.status(usuarioViagem.status_code)
    response.json(usuarioViagem)  

})


router.post('/', cors(), bodyParserJson, async function (request, response) {


    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let usuarioViagem  = await controllerUsuaroVIagem.inserirUsuarioViagem(dadosBody, contentType)

    response.status(usuarioViagem.status_code)
    response.json(usuarioViagem )
})


router.put('/:id', cors(), bodyParserJson, async function (request, response) {
    let dadosBody = request.body

    let idUsuarioViagem  = request.params.id

    let contentType = request.headers['content-type']
    
    let usuarioViagem  = await controllerUsuarioSeguidor.atualizarUsuarioSeguidor(dadosBody, idUsuarioViagem , contentType)

    response.status(usuarioViagem.status_code)
    response.json(usuarioViagem)
})

router.delete('/:id', cors(), async function (request, response) {
    let idUsuarioViagem  = request.params.id

    let usuarioViagem  = await controllerUsuaroVIagem.excluirUsuarioViagem(idUsuarioViagem )
    response.status(usuarioViagem.status_code)
    response.json(usuarioViagem )

})

router.delete('/usuario/:id', cors(), async function (request, response) {
    let idUsuarioViagem  = request.params.id

    let usuarioViagem  = await controllerUsuaroVIagem.excluirUsuarioViagemByUsuarioId(idUsuarioViagem)
    response.status(usuarioSeguidor.status_code)
    response.json(usuarioViagem)

})



module.exports = router
