
// Import do arquivo da configuraçãp da azure
const AZURE = require('../modulo/config_upload_azure')

// Import da dependecia para realizar uma requizição http pelo node 


const fetch = (...args) => import('node-fetch').then(({default : fetch}) => fetch(...args))

const upliadFiles = async function (file) {
    //concatena no nome do arquivo a data e a hora
    let fileName = Date.now() = file.origenalname

// URl para o DB
let urlFile = `racw&st=2025-12-10T19:36:42Z&se=2025-12-12T15:51:42Z&sv=2024-11-04&sr=c&sig=73oOxCdJrBF3uYOFa7ojvvJH%2BxkuUiYmP8llfD0iajo%3D${AZURE.ACCOUNT}, ${AZURE.CONTAINER}/${fileName}`// falta colocar a  url quando gera o SAS, depois da duas // no lugar do nome do seu diretório isso ${AZURE.ACCOUNT}, e no nome do container vc coloca isso ${AZURE.CONTAINER} e depois disso apaga e coloca /${fileName}

// arquivo url para enviar o arquivo o container azure
let urlFIleToken  = `https://uploadtravel.blob.core.windows.net/uploadtravel?sp=racw&st=2025-12-10T19:36:42Z&se=2025-12-12T15:51:42Z&sv=2024-11-04&sr=c&sig=73oOxCdJrBF3uYOFa7ojvvJH%2BxkuUiYmP8llfD0iajo%3D${urlFile}?${AZURE.TOKEN}` 

let response = await fetch(urlFIleToken, {
    method : 'PUT',
    headers: {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type'  : 'application/octet-stream'
    },
    body: file.buffer
}) 


if(response.status == 201)
    return undefined
else
return false

}

module.exports = {
    upliadFiles
}