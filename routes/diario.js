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

const controllerDiario = require('../controller/diario.js/controller_diario.')

router.get('/', cors(), async function (request, response) {
    let diario = await controllerDiario.listarDiario()
    response.status(diario.status_code)
    response.json(diario)    
})

router.get('/:id', cors(), async function (request, response){
    let idDiario = request.params.id

    let diario = await controllerDiario.listarDiarioId(idDiario)
    response.status(diario.status_code)
    response.json(diario)  


})

router.post('/', cors(), bodyParserJson, async function (request, response) {


    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let diario = await controllerDiario.inserirDiario(dadosBody, contentType)

    response.status(diario.status_code)
    response.json(diario)
})


router.put('/:id', cors(), bodyParserJson, async function (request, response) {
    let dadosBody = request.body

    let idDiario = request.params.id

    let contentType = request.headers['content-type']
    
    let diario = await controllerDiario.atualizarDiario(dadosBody, idDiario, contentType)

    response.status(diario.status_code)
    response.json(diario)
})

router.delete('/:id', cors(), async function (request, response) {
    let idDiario = request.params.id

    let diario = await controllerDiario.excluirDiairo(idDiario)
    response.status(diario.status_code)
    response.json(diario)

})


module.exports = router
