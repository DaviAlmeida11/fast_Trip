//Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// CRIA UM FORMATO JSON



//configurção do cors 
const router = express.Router()
router.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    router.use(cors())
    next()
})

// ENDPOINTS DA TABELA Usuario

const controllerSeguidorViagemDiario = require('../controller/viagem.js/UsuarioViagemDIario')

router.get('/', cors(), async function (request, response) {
    let seguidor = await controllerSeguidorViagemDiario.listarUsuarioViagemDiario()
    response.status(seguidor.status_code)
    response.json(seguidor)
})


router.get('/:nome', cors(), async function (request, response){
    let idUsuario = request.params.nome

    let usuario = await controllerSeguidorViagemDiario.buscarUsuarioViagemDIarioPorNome(idUsuario)
    response.status(usuario.status_code)
    response.json(usuario)


})


module.exports = router