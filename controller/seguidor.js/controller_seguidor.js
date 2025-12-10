/*********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 04/11/2025
 * Autor: Davi de Almeida
 * Versão: 1.0
 **********************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no BD
const seguidorDAO = require('../../model/dao/seguidor.js')

const MESSAGE_DEFAULT = require("../modulo/message_conf.js")



const listarSeguidor = async function () {
  //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
    //Chama a função do DAO para retornar a lista de diretores
    let result = await seguidorDAO.getSelectAllSeguidor()

    if (result) {
      if (result.length > 0) {
        MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
        MESSAGE.HEADER.response.total_seguidor = result.length
        MESSAGE.HEADER.response.seguidor = result

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

const listarSeguidorId = async function (id) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
    if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
      let result = await seguidorDAO.getSelectSeguidorById(id)

      if (result) {
        if (result.length > 0) {
          MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
          MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
          MESSAGE.HEADER.response.seguidor
          MESSAGE.HEADER.response.user = result

          return MESSAGE.HEADER  //200 
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
const inserirSeguidor = async function (seguidor, contentType, foto) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
  try {

    
    if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
      let validarDados = validarDadosSeguidor(seguidor)



      if (!validarDados) {
        let result = await seguidorDAO.setInsertSeguidor(seguidor)
       

        if (result) {
          let lastIdSeguidor = await seguidorDAO.getSelectLastId()

          if (lastIdSeguidor) {
            seguidor.id = lastIdSeguidor
            MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
            MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
            MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
            MESSAGE.HEADER.response = seguidor

            return MESSAGE.HEADER
          } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
          }
        } else {
          return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }
      } else {
        return validarDados
      }
    } else {
      return MESSAGE.ERROR_CONTENT_TYPE //415
    }

  } catch (error) { 
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
  }
}

const atualizarSeguidor = async function(seguidor, id, contentType) {
  //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
      if(String(contentType).toUpperCase() === 'APPLICATION/JSON'){
          let validarId = await listarSeguidor(id)

          if(validarId.status_code == 200){

              let validarDados = validarDadosSeguidor(seguidor)
              

              if(!validarDados){
                  //Adicionando o ID no JSON com os dados do usuario
                  seguidor.id = parseInt(id)

                  let result = await seguidorDAO.setupdateFolower(seguidor)

                  if(result){
                      MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATED_ITEM.status
                      MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
                      MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATED_ITEM.message
                      MESSAGE.HEADER.response = seguidor
      
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



const excluirSeguidor = async function (id) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
      let validarId = await listarSeguidorId(id)
     

      if(validarId.status_code == 200){
          let result = await seguidorDAO.setDeleteSeguidor(id)

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



const validarDadosSeguidor = function (seguidor) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  // NOME
  if (!seguidor.nome || seguidor.nome.length > 100) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [NOME] inválido`
    return MESSAGE.ERROR_REQUIRED_FIELDS
  }

  // NICKNAME
  if (!seguidor.nickname || seguidor.nickname.length > 100) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [NICKNAME] inválido`
    return MESSAGE.ERROR_REQUIRED_FIELDS
  }

  // IMG
  if (seguidor.img === null) {
    seguidor.img = ""
  } else if (seguidor.img === "" || seguidor.img === undefined) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [FOTO] inválido`
    return MESSAGE.ERROR_REQUIRED_FIELDS
  }

  return false
}

module.exports = {
  listarSeguidor,
  listarSeguidorId,
  validarDadosSeguidor,
  inserirSeguidor,
  validarDadosSeguidor,
  atualizarSeguidor,
  excluirSeguidor


}