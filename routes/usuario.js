//Import das bibliotecas para criar a API
const express       = require('express')
const cors          = require('cors')
const bodyParserJson    = require('body-parser')
const multer        = require('multer')  

//Configuração do diskmanager para o MULTER
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Define o diretório onde os arquivos serão salvos.
        // Certifique-se de que o diretório 'uploads/' existe na raiz do seu projeto!
        cb(null, 'uploads/');
    
    }
})

// Inicializa o Multer com a configuração de armazenamento
const upload = multer();

//configurção do cors 
const router = express.Router()
router.use((request, response, next ) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    router.use(cors())
    next()
})

const controllerUsuario = require('../controller/usuario.js/controller_usuario');

router.get('/', cors(), async function (request, response) {
    let usuario = await controllerUsuario.listarUsuarios()
    response.status(usuario.status_code)
    response.json(usuario)    
})


router.get('/:id', cors(), async function (request, response){
    let idUsuario = request.params.id

    let usuario = await controllerUsuario.listarUsuarioId(idUsuario)
    response.status(usuario.status_code)
    response.json(usuario)


})

router.post('/', upload.single('img'), async (req, res) => {
    const dadosBody = req.body; // outros campos do formulário
    const img = req.file;       // arquivo enviado
    const contentType = req.headers['content-type'];

    const usuario = await controllerUsuario.inserirUsuario(dadosBody, img, contentType);
    console.log(usuario);

    res.status(usuario.status_code).json(usuario);
});



router.put('/:id', cors(), bodyParserJson, async function (request, response) {
    let dadosBody = request.body

    let idUsuario = request.params.id

    let contentType = request.headers['content-type']
    
    let usuario = await controllerUsuario.atualizarUsuario(dadosBody, idUsuario, contentType)

    response.status(usuario.status_code)
    response.json(usuario)
})

router.delete('/:id', cors(), async function (request, response) {
    let idUsuario = request.params.id

    let usuario = await controllerUsuario.excluirUsuario(idUsuario)
    response.status(usuario.status_code)
    response.json(usuario)

    
})
module.exports = router

