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

const controllerSegidorUsuario = require('../controller/seguidor.js/controller_segidorUsuario')


router.get('/:id', cors(), async function(request, response) {
    let idSeguidorUsuario = request.params.id
    
    let usuario = await controllerSegidorUsuario.listarSeguidorUsuarioId(idSeguidorUsuario)
    response.status(usuario.status_code)
    response.json(usuario)
})



module.exports = router