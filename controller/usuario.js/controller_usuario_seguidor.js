/*********************************************************************************************
 * Objetivo: Controller responsável pela manipulação dos dados de usuario_seguidor
 * (Validações, tratamento, respostas, erros, etc)
 * Data: 06/12/2025
 * Autor: Aline Alves de Souza
 * Versão: 1.0
 **********************************************************************************************/

// Import DAO
const usuarioSeguidorDAO = require('../../model/dao/usuario_seguidor.js');

// Import mensagens padrão
const MESSAGE_DEFAULT = require('../modulo/message_conf.js')

//LISTAR TODOS OS VÍNCULOS
const listarUsuarioSeguidor = async function () {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    let result = await usuarioSeguidorDAO.getSelectAllUserFollower();

    if (result) {
      if (result.length > 0) {
        MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status;
        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code;
        MESSAGE.HEADER.response.total_user_follower = result.length;
        MESSAGE.HEADER.response.user_follower = result;

        return MESSAGE.HEADER;
      } else {
        return MESSAGE.ERROR_NOT_FOUND;
      }
    } else {
      return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
    }
  } catch (error) { console.log(error)
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

//BUSCAR POR ID (tb_usuario_seguidor)

const buscarUsuarioSeguidorId = async function (id) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
      let result = await usuarioSeguidorDAO.getSelectByIdUserFollower(id);

      if (result) {
        if (result.length > 0) {
          MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status;
          MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code;
          MESSAGE.HEADER.response.user_fol6lower = result;

          return MESSAGE.HEADER;
        } else {
          return MESSAGE.ERROR_NOT_FOUND;
        }
      } else {
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
      }
    } else {
      MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field =
        'Atributo [ID_USUARIO_SEGUIDOR] inválido!';
      return MESSAGE.ERROR_REQUIRED_FIELDS;
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

//LISTAR SEGUIDORES PELO ID DO USUÁRIO

const listarSeguidoresUsuarioId = async function (usuarioId) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (
      usuarioId != '' &&
      usuarioId != null &&
      usuarioId != undefined &&
      !isNaN(usuarioId) &&
      usuarioId > 0
    ) {
      let result = await usuarioSeguidorDAO.getFollowersByUserId(usuarioId);

      if (result) {
        if (result.length > 0) {
          MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status;
          MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code;
          MESSAGE.HEADER.response.followers = result;

          return MESSAGE.HEADER;
        } else {
          return MESSAGE.ERROR_NOT_FOUND;
        }
      } else {
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
      }
    } else {
      MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field =
        'Atributo [ID_USUARIO] inválido!';
      return MESSAGE.ERROR_REQUIRED_FIELDS;
    }
  } catch (error) { 
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

//INSERIR VÍNCULO
const inserirUsuarioSeguidor = async function (dados, foto, contentType) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
      // Verifica Content-Type
      if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {

          // 1. Validar campos obrigatórios
          if (!dados.email || !dados.senha) {
              MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = "Campos obrigatórios vazios";
              return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
          }

          // 2. Criptografar senha
          dados.senha = await cripitografia.criptografarSenha(dados.senha);

          // 3. Fazer upload da foto
          let urlFoto = await UPLOAD.upliadFiles(foto);

          if (!urlFoto) {
              return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
          }

          dados.capa = urlFoto;

          // 4. Inserir usuário no banco
          let result = await userDAO.insertUsuario(dados);

          if (result) {

              // 5. Buscar último ID inserido
              let lastId = await userDAO.selectLastIdUsuario();

              if (lastId && lastId[0] && lastId[0].id_usuario) {
                  dados.id_usuario = lastId[0].id_usuario;

                  // 6. Retornar resposta no padrão MESSAGE
                  MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status;
                  MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code;
                  MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message;
                  MESSAGE.HEADER.response = dados;

                  return MESSAGE.HEADER;

              } else {
                  return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
              }

          } else {
              return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
          }

      } else {
          return MESSAGE.ERROR_CONTENT_TYPE; // 415
      }

  } catch (error) {
      return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
  }
};

//ATUALIZAR VÍNCULO

const atualizarUsuarioSeguidor = async function (data, id, contentType) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
      let validar = await validarDadosUsuarioSeguidor(data);

      if (!validar) {
        let validarId = await buscarUsuarioSeguidorId(id);

        if (validarId.status_code == 200) {
          data.id = id

          let result = await usuarioSeguidorDAO.setUpdateUserFollower(data);

          if (result) {
            MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status;
            MESSAGE.HEADER.status_code =
              MESSAGE.SUCCESS_CREATED_ITEM.status_code;
            MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message;
            MESSAGE.HEADER.response = data;

            return MESSAGE.HEADER;
          } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
          }
        } else {
          return validarId;
        }
      } else {
        return validar;
      }
    } else {
      return MESSAGE.ERROR_CONTENT_TYPE;
    }
  } catch (error) { 
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

//EXCLUIR TODOS SEGUIDORES DE UM USUÁRIO

const excluirSeguidoresByUsuarioId = async function (usuarioId) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (
      usuarioId != '' &&
      usuarioId != null &&
      usuarioId != undefined &&
      !isNaN(usuarioId) &&
      usuarioId > 0
    ) {
      let result = await usuarioSeguidorDAO.setDeleteFollowersByUserId(
        usuarioId
      );

      if (result) {
        MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETED_ITEM.status;
        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETED_ITEM.status_code;
        MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETED_ITEM.message;
        delete MESSAGE.HEADER.response;

        return MESSAGE.HEADER;
      } else {
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
      }
    } else {
      MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field =
        'Atributo [ID_USUARIO] inválido!';
      return MESSAGE.ERROR_REQUIRED_FIELDS;
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

//EXCLUIR POR ID

const excluirUsuarioSeguidor = async function (id) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    let validarId = await buscarUsuarioSeguidorId(id);

    if (validarId.status_code == 200) {
      let result = await usuarioSeguidorDAO.setDeleteUserFollower(id);

      if (result) {
        MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETED_ITEM.status;
        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETED_ITEM.status_code;
        MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETED_ITEM.message;
        delete MESSAGE.HEADER.response;

        return MESSAGE.HEADER;
      } else {
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
      }
    } else {
      return validarId;
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

//VALIDAÇÃO DOS CAMPOS

const validarDadosUsuarioSeguidor = async function (data) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  if (!data.id_usuario || isNaN(data.id_usuario) || data.id_usuario <= 0) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field =
      'Atributo [ID_USUARIO] inválido';
    return MESSAGE.ERROR_REQUIRED_FIELDS;
  }

  if (!data.id_seguidor || isNaN(data.id_seguidor) || data.id_seguidor <= 0) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field =
      'Atributo [ID_SEGUIDOR] inválido';
    return MESSAGE.ERROR_REQUIRED_FIELDS;
  }

  return false;
}

module.exports = {
  listarUsuarioSeguidor,
  buscarUsuarioSeguidorId,
  listarSeguidoresUsuarioId,
  inserirUsuarioSeguidor,
  atualizarUsuarioSeguidor,
  excluirSeguidoresByUsuarioId,
  excluirUsuarioSeguidor,
};
