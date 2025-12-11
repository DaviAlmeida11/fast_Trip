/*********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 05/12/2025
 * Autor: Davi de Almeida
 * Versão: 1.0
 **********************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no BD
const comentarioDAO = require('../../model/dao/comentario.js')


const MESSAGE_DEFAULT = require("../modulo/message_conf.js")



const listarComentario = async function () {
    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Chama a função do DAO para retornar a lista de diretores
        let result = await comentarioDAO.getSelectAllComentario()

        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.total_diario = result.length
                MESSAGE.HEADER.response.comentario = result

                return MESSAGE.HEADER //200
            } else {
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const listarComentarioId = async function (id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
            let result = await comentarioDAO.getSelectComentarioById(id)

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.comentario
                    MESSAGE.HEADER.response.comentario= result
                    return MESSAGE.HEADER


                } else {
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [ID] invalido`
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


const inserirComentario = async function (comentario, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {


            let validacao = await validarDadosComentario(comentario)


            if (!validacao) {

                let result = await comentarioDAO.setInsertComentario(comentario);

                if (result) {
                    let lastIdComentario = await comentarioDAO.getSelectLastId();

                    if (lastIdComentario) {

                        comentario.id = lastIdComentario

                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status;
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code;
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message;
                        MESSAGE.HEADER.response = comentario

                        return MESSAGE.HEADER;
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
                    }
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
                }
            } else {
                return validacao;
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE;
        }

    } catch (error) { 

        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}


const atualizarComentario = async function (comentario, id, contentType) {
    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
            let validarId = await listarComentarioId(id)

            if (validarId.status_code == 200) {

                let validarDados = await validarDadosComentario(comentario)

                if (!validarDados) {
                    //Adicionando o ID no JSON com os dados do ator
                    comentario.id = parseInt(id)

                    let result = await comentarioDAO.setUpdateComentario(comentario)

                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response = comentario

                        return MESSAGE.HEADER //200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return validarDados
                }
            } else {
                return validarId
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) { console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


const excluirComentario = async function (id) {
    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        let validarId = await listarComentarioId(id)

        if (validarId.status_code == 200) {


            let result = await comentarioDAO.setDeleteComentario(id)

            if (result) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETED_ITEM.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETED_ITEM.status_code
                MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETED_ITEM.message

                return MESSAGE.HEADER //200
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            return validarId
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


const validarDadosComentario = function (comentario) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    // NOME
    if (comentario.conteudo == '' || comentario.conteudo == null || comentario.conteudo == undefined || comentario.conteudo.length > 600) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [NOME] invalido`
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (comentario.id_diario != '' && comentario.id_diario != null && comentario.id_diario != undefined && comentario.id_diario == String && comentario.id_diario > 0) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [FOTO] invalido`
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (comentario.id_usuario != '' && comentario.id_usuario != null && comentario.id_usuario != undefined && comentario.id_usuario == String && comentario.id_usuario > 0) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [FOTO] invalido`
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    }


    return false // validação OK
}






module.exports = {
    listarComentario,
    listarComentarioId,
    validarDadosComentario,
    inserirComentario,
    atualizarComentario,
    excluirComentario



}