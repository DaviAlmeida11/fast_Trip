//Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')





//configurção do cors 
const router = express.Router()
router.use((request, response, next ) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    router.use(cors())
    next()
})

// ENDPOINTS DA TABELA Usuario



const controllerDiarioPublico = require('../controller/diario.js/controller_retornarDiarioPubic')


router.get('/', cors(), async function (request, response) {
    let diario = await controllerDiarioPublico.listarDiarioPublico()
    response.status(diario.status_code)
    response.json(diario)    
})
module.exports = router 
