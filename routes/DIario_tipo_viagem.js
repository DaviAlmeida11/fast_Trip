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

const controllerDiarioTipoViagem = require('../controller/diario.js/controller_diario_tipo_viagem')


router.get('/', cors(), async function (request, response) {
    let diario = await controllerDiarioTipoViagem.listarDiarioTipoViagem()
    response.status(diario.status_code)
    response.json(diario)    
})

router.get('/:id', cors(), async function (request, response){
    let idDiarioTipoViagem = request.params.id

    let diario = await controllerDiarioTipoViagem.listarTiposViagemPorDiarioId(idDiarioTipoViagem)
    response.status(diario.status_code)
    response.json(diario)  


})

router.get('/viagem/:id', cors(), async function (request, response){
    let idDiarioTipoViagem = request.params.id

    let diario = await controllerDiarioTipoViagem.buscarDiarioTipoViagemId(idDiarioTipoViagem)
    response.status(diario.status_code)
    response.json(diario)  


})



router.post('/', cors(), bodyParserJson, async function (request, response) {


    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let diario = await controllerDiarioTipoViagem.inserirDiarioTipoViagem(dadosBody, contentType)

    response.status(diario.status_code)
    response.json(diario)
})


router.put('/:id', cors(), bodyParserJson, async function (request, response) {
    let dadosBody = request.body

    let idDiarioTipoViagem = request.params.id

    let contentType = request.headers['content-type']
    
    let diario = await controllerDiarioTipoViagem.atualizarDiarioTipoViagem(dadosBody, idDiarioTipoViagem, contentType)

    response.status(diario.status_code)
    response.json(diario)
})

router.delete('/:id', cors(), async function (request, response) {
    let idDiario = request.params.id

    let diario = await controllerDiarioTipoViagem.excluirDiarioTipoViagem(idDiario)
    response.status(diario.status_code)
    response.json(diario)

})


router.delete('/diario/:id', cors(), async function (request, response) {
    let idDiario = request.params.id

    let diario = await controllerDiarioTipoViagem.excluirDiarioTipoViagemByDiarioId(idDiario)
    response.status(diario.status_code)
    response.json(diario)

})



module.exports = router
