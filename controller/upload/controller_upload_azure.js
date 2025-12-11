
// Import do arquivo da configuraçãp da azure
const AZURE = require('../modulo/config_upload_azure')

// Import da dependecia para realizar uma requizição http pelo node 


const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

const upliadFiles = async function (file) {
    let fileName = `${Date.now()}-${file.originalname}`;

    let urlFile = `https://${AZURE.ACCOUNT}.blob.core.windows.net/${AZURE.CONTAINER}/${fileName}`;
    let urlFileToken = `${urlFile}?${AZURE.TOKEN}`;

    let response = await fetch(urlFileToken, {
        method: 'PUT',
        headers: {
            'x-ms-blob-type': 'BlockBlob',
            'Content-Type': 'application/octet-stream'
        },
        body: file.buffer
    });

    if (response.status === 201)
        return urlFile;
    else
        return false;
}


module.exports = {
    upliadFiles
}