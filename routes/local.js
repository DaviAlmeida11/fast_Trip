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

const controllerLocal = require('../controller/local/controller_local')

router.get('/', cors(), async function (request, response) {
    let local = await controllerLocal.listarLocal()
    response.status(local.status_code)
    response.json(local)    
})


router.get('/:id', cors(), async function (request, response){
    let idLocal = request.params.id

    let local = await controllerLocal.listarLocalId(idLocal)
    response.json(local)


})

router.post('/', cors(), bodyParserJson, async function (request, response) {


    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let local = await controllerLocal.inserirLocal(dadosBody, contentType)

    response.status(local.status_code)
    response.json(local)
})

router.delete('/:id', cors(), async function (request, response) {
    let idLocal = request.params.id

    let local = await controllerLocal.excluirLocal(idLocal)
    response.status(local.status_code)
    response.json(local)

})


module.exports = router