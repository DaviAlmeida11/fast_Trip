const diarioNomeDAO = require('../../model/dao/diario_nome.js')


const MESSAGE_DEFAULT = require("../modulo/message_conf.js")



const listarDiarioNome = async function (id, nome) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {


    if (id == '' || id == null || id == undefined || !Number(id) || id <= 0) {
      MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [ID] inválido`
      return MESSAGE.ERROR_REQUIRED_FIELDS //400
    }


    if (nome == '' || nome == null || nome == undefined || nome.length > 100) {
      MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [NOME] inválido`
      return MESSAGE.ERROR_REQUIRED_FIELDS //400
    }

 
    let result = await diarioNomeDAO.listarDiarioNome(id, nome)

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
    console.log(error)
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
  }
}

module.exports = {
    listarDiarioNome
}