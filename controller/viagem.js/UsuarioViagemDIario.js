/*********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 03/12/2025
 * Autor: Davi de Almeida
 * Versão: 1.0
 **********************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no BD
const usuarioVIagemDiarioDAO= require('../../model/dao/diarioViagemUsuario.js')

//Import do arquivo que padroniza todas as mensagens
const MESSAGE_DEFAULT = require('../modulo/message_conf.js')

const listarUsuarioViagemDiario = async function() {
    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Chama a função do DAO para retornar a lista de atores
        let result = await usuarioVIagemDiarioDAO.getSelectAllUsuarioViagemDiario()

        if(result){
            if(result.length > 0){
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.total_travels = result.length
                MESSAGE.HEADER.response.travels = result
                
                return MESSAGE.HEADER //200

            }else{
                return MESSAGE.ERROR_NOT_FOUND //404
            }

        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } catch (error) { 
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarUsuarioViagemDIarioPorNome  = async function (nome) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {

    if (nome == '' || nome == null || nome == undefined || nome.length > 100) {
      MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [NOME] inválido`
      return MESSAGE.ERROR_REQUIRED_FIELDS //400
    }

 
    let result = await usuarioVIagemDiarioDAO.getSelectAllUsuarioViagemDiario(nome)

    if (result) {
      if (result.length > 0) {
        MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
        MESSAGE.HEADER.response.diario = result
        return MESSAGE.HEADER
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

module.exports  = {
    listarUsuarioViagemDiario,
   buscarUsuarioViagemDIarioPorNome 
}