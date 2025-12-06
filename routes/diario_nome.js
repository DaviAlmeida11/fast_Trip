
//Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')



const controllerDiarioMessege = require('../controller/diario.js/controller_listarNome')

//configurção do cors 
const router = express.Router()
router.use((request, response, next ) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    router.use(cors())
    next()
})

// ENDPOINTS DA TABELA Usuario



router.get('/:nome', cors(), async function (request, response){

    let nomeDiario = request.params.nome  // PEGAR O NOME

    let diario = await controllerDiarioMessege.listarDiarioNome(nomeDiario)
    
    response.status(diario.status_code)
    response.json(diario)
})
module.exports = router 
