/*********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 27/11/2025
 * Autor: Davi de Almeida
 * Versão: 1.0
 **********************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no BD
const userDAO = require('../../model/dao/usuario.js')

const MESSAGE_DEFAULT = require("../modulo/message_conf.js")



const listarUsuarios = async function () {
    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
  
    try {
      //Chama a função do DAO para retornar a lista de diretores
      let result = await userDAO.getSelectAllUser()
      

  
      if (result) {
        if (result.length > 0) {
          MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
          MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
          MESSAGE.HEADER.response.total_user = result.length
          MESSAGE.HEADER.response.user = result
  
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


  module.exports = {
    listarUsuarios 
  }
  

