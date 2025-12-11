const express = require('express')
const cors = require('cors')



const controllerDiarioComentario = require('../controller/comentario.js/controller_comentarioDiairo')

//configurção do cors 
const router = express.Router()
router.use((request, response, next ) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    router.use(cors())
    next()
})

// ENDPOINTS DA TABELA Usuario



router.get('/:id', cors(), async function (request, response){

    let comentarioDiarioId = request.params.id // PEGAR O NOME

    let diario = await controllerDiarioComentario.listarDiarioComentarioId(comentarioDiarioId)
    
    response.status(diario.status_code)
    response.json(diario)
})
module.exports = router 
