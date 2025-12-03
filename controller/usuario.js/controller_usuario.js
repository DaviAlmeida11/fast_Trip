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



const listarUsuarioId = async function (id) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
  try {
    if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
      let result = await userDAO.getSelectUserById(id)

      if (result) {
        if (result.length > 0) {
          MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
          MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
          MESSAGE.HEADER.response.user = result

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

const inserirUsuario = async function (usuario, contentType) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
  try {
    if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
      let validarDados = validarDadosUsuario(usuario)



      if (!validarDados) {
        let result = await userDAO.insertUsuario(usuario)
        console.log(result)


        if (result) {

          let lastIdUsuario = await userDAO.getSelectLastId()

          if (lastIdUsuario) {
            usuario.id = lastIdUsuario
            MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
            MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
            MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
            MESSAGE.HEADER.response = usuario

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

const atualizarUsuario = async function(usuario, id, contentType) {
  //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
      if(String(contentType).toUpperCase() === 'APPLICATION/JSON'){
          let validarId = await listarUsuarioId(id)

          if(validarId.status_code == 200){

              let validarDados = validarDadosUsuario(usuario)
              

              if(!validarDados){
                  //Adicionando o ID no JSON com os dados do usuario
                  usuario.id = parseInt(id)

                  let result = await userDAO.setupdateUser(usuario)

                  if(result){
                      MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATED_ITEM.status
                      MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
                      MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATED_ITEM.message
                      MESSAGE.HEADER.response = usuario
      
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

const excluirUsuario = async function (id) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
      let validarId = await listarUsuarioId(id)
     

      if(validarId.status_code == 200){
          let result = await userDAO.setDeleteUser(id)

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



const validarDadosUsuario = function (usuario) {

  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  // NOME
  if (usuario.nome == '' || usuario.nome == null || usuario.nome == undefined || usuario.nome.length > 100) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [NOME] invalido`
    return MESSAGE.ERROR_REQUIRED_FIELDS //400

    // NICKNAME
  } else if (usuario.nickname == '' || usuario.nickname == null || usuario.nickname == undefined || usuario.nickname.length > 100) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [NICKNAME] invalido`
    return MESSAGE.ERROR_REQUIRED_FIELDS //400

    // EMAIL
  } else if (usuario.email == '' || usuario.email == null || usuario.email == undefined || usuario.email.length > 200) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [EMAIL] invalido`
    return MESSAGE.ERROR_REQUIRED_FIELDS //400

    // SENHA
  } else if (usuario.senha == '' || usuario.senha == null || usuario.senha == undefined || usuario.senha.length > 100) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [SENHA] invalido`
    return MESSAGE.ERROR_REQUIRED_FIELDS //400

    // GENERO
  } else if (usuario.genero == '' || usuario.genero == null || usuario.genero == undefined || usuario.genero.length > 10) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [GENERO] invalido`
    return MESSAGE.ERROR_REQUIRED_FIELDS //400

    // Tratamento da foto null
  } else if (usuario.img == null) {
    return false

    // FOTO (opcional — mas você está validando, então mantive sua lógica)
  } else if (usuario.img == '' || usuario.img == undefined) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [FOTO] invalido`
    return MESSAGE.ERROR_REQUIRED_FIELDS //400


    // CRIADO_EM
  } else if (usuario.criado_em == '' || usuario.criado_em == undefined || usuario.criado_em == null || usuario.criado_em.length > 50) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [CRIADO_EM] invalido`
    return MESSAGE.ERROR_REQUIRED_FIELDS //400

    // ATUALIZADO_EM
  } else if (usuario.atualizado_em == '' || usuario.atualizado_em == undefined || usuario.atualizado_em == null || usuario.atualizado_em.length > 50) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [ATUALIZADO_EM] invalido`
    return MESSAGE.ERROR_REQUIRED_FIELDS //400


  } else {
    return false
  }


}


module.exports = {
  listarUsuarios,
  listarUsuarioId,
  validarDadosUsuario,
  inserirUsuario,
  atualizarUsuario,
  excluirUsuario 


}
