/*********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 03/12/2025
 * Autor: Davi de Almeida
 * Versão: 1.0
 **********************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no BD
const localDAO = require('../../model/dao/local.js')

const MESSAGE_DEFAULT = require("../modulo/message_conf.js")



const listarUsuarios = async function () {
  //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
    //Chama a função do DAO para retornar a lista de diretores
    let result = await localDAO.getSelectAllLocal()

    if (result) {
      if (result.length > 0) {
        MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
        MESSAGE.HEADER.response.total_user = result.length
        MESSAGE.HEADER.response.local = result

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


const listarLocalId = async function (id) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
    if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
      let result = await localDAO.getSelectLocalById(id)

      if (result) {
        if (result.length > 0) {
          MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
          MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
          MESSAGE.HEADER.response.local
          return MESSAGE.HEADER //200
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

const inserirLocal = async function (local, contentType) {

  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {

     
      let validacao = await validarDados(local);

      if (!validacao) {

        let result = await localDAO.setInsertLocal(local);

        if (result) {
          let lastIdLocal = await localDAO.getSelectLastId();

          if (lastIdLocal) {

            local.id = lastIdLocal;

            MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status;
            MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code;
            MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message;
            MESSAGE.HEADER.response = local;

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

const atualizarLocal = async function(local, id, contentType) {
    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if(String(contentType).toUpperCase() === 'APPLICATION/JSON'){
            let validarId = await listarLocalId(id)

            if(validarId.status_code == 200){

                let validarDados =  await validarDadosLocal(local)

                if(!validarDados){
                    //Adicionando o ID no JSON com os dados do ator
                    local.id = parseInt(id)

                    let result = await localDAO.updateLocal(local)

                    if(result){
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response = local
        
                        return MESSAGE.HEADER //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                }else{
                    return validarDados
                }
            }else{
                return validarId
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const excluirLocal = async function(id) {
    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        let validarId = await listarLocalId(id)

        if(validarId.status_code == 200){

          
            let result = await localDAO.setDeleteLocal(id)

            if(result){
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETED_ITEM.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETED_ITEM.status_code
                MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETED_ITEM.message

                return MESSAGE.HEADER //200
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else{
            return validarId
        }
    } catch (error) { 
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}




const validarDadosLocal = async function (local) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))


  if (local.nome == '' || local.nome == null || local.nome == undefined || local.nome.length > 100) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [NOME] invalido`
    return MESSAGE.ERROR_REQUIRED_FIELDS //400

  } else if (local.estado == '' || local.estado == null || local.estado == undefined || local.estado.length > 2) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [ESTADO] invalido`
    return MESSAGE.ERROR_REQUIRED_FIELDS //400
  } else if (local.pais == '' || local.pais == null || local.pais == undefined || local.estado.length > 5) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [PAIS] invalido`
    return MESSAGE.ERROR_REQUIRED_FIELDS //400
  } else if (local.cidade == '' || local.cidade == null || local.cidade == undefined || local.cidade.length > 100) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [CIDADE] invalido`
    return MESSAGE.ERROR_REQUIRED_FIELDS //400
  } else {
    return false
  }
}



module.exports = {
  listarUsuarios,
  listarLocalId,
  validarDadosLocal,
  inserirLocal,
  atualizarLocal,
  excluirLocal


}