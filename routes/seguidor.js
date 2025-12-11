//Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyParserJson    = require('body-parser')
const multer        = require('multer')  

//Configuração do diskmanager para o MULTER
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Define o diretório onde os arquivos serão salvos.
        // Certifique-se de que o diretório 'uploads/' existe na raiz do seu projeto!
        cb(null, 'uploads/');
    
    }
});

const upload = multer();
//configurção do cors 
const router = express.Router()
router.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    router.use(cors())
    next()
})

// ENDPOINTS DA TABELA Usuario

const controllerSeguidor = require('../controller/seguidor.js/controller_seguidor.js')

router.get('/', cors(), async function (request, response) {
    let seguidor = await controllerSeguidor.listarSeguidor()
    response.status(seguidor.status_code)
    response.json(seguidor)
})


router.get('/:id', cors(), async function (request, response) {
    let idSeguidor = request.params.id

    let seguidor = await controllerSeguidor.listarSeguidorId(idSeguidor)
    response.status(seguidor.status_code)
    response.json(seguidor)

})

router.post('/', cors(), upload.single('img'), async function(request, response){
    //Recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    let foto       = request.file
console.log(foto)
    //Chama a função da controller para inserir o seguidor, enviamos os dados do body e o content-type
    let seguidor = await controllerSeguidor.inserirSeguidor(dadosBody, foto, contentType )
    

    response.status(seguidor.status_code)
    response.json(seguidor)

})
router.put('/:id', cors(), bodyParserJson, async function (request, response) {
    let dadosBody = request.body

    let idSeguidor = request.params.id

    let contentType = request.headers['content-type']
    
    let seguidor = await controllerSeguidor.atualizarSeguidor(dadosBody, idSeguidor, contentType)

    response.status(seguidor.status_code)
    response.json(seguidor)
})


router.delete('/:id', cors(), async function (request, response) {
    let idSeguidor = request.params.id

    let seguiudor = await controllerSeguidor.excluirSeguidor(idSeguidor)
    response.status(seguiudor.status_code)
    response.json(seguiudor)

    
})
module.exports = router