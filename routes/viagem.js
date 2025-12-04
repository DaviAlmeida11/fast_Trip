//Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// CRIA UM FORMATO JSON
const bodyParserJSON = bodyParser.json()


//configurção do cors 
const router = express.Router()
router.use((request, response, next ) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    router.use(cors())
    next()
})

//ENDPOINTS DA TABELA VIAGEM

const controllerViagem = require('../controller/viagem.js/controller_viagem')

router.get('/', cors(), async function(request, response) {
    let viagem = await controllerViagem.listarViagens()
    response.status(viagem.status_code)
    response.json(viagem)
})

router.get('/:id', cors(), async function(request, response) {
    let idViagem = request.params.id
    
    let viagem = await controllerViagem.buscarViagemPorId(idViagem)
    response.status(viagem.status_code)
    response.json(viagem)
})

router.post('/', cors(), bodyParserJSON, async function(request, response) {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let viagem = await controllerViagem.inserirViagem(dadosBody, contentType)
    response.status(viagem.status_code)
    response.json(viagem)
})

router.put('/:id', cors(), bodyParserJSON, async function(request, response) {
    let dadosBody = request.body
    
    let idViagem = request.params.id

    let contentType = request.headers['content-type']

    let viagem = await controllerViagem.atualizarViagem(dadosBody, idViagem, contentType)
    response.status(viagem.status_code)
    response.json(viagem)
})

router.delete('/:id', cors(), async function(request, response) {
    let idViagem = request.params.id

    let viagem = await controllerViagem.excluirViagem(idViagem)
    response.status(viagem.status_code)
    response.json(viagem)
})



router.delete('/:id', cors(), async function (request, response) {
    let idLocal = request.params.id

    let local = await controllerViagem.excluirViagem(idLocal)
    response.status(local.status_code)
    response.json(local)

    
})
module.exports = router