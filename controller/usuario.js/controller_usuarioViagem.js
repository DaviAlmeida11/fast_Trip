/*********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e o Model
 * (Validações, tratamento de dados, tratamento de erros, etc) para o CRUD de Usuario_Viagem
 * Data: 08/12/2025
 * Autor: Aline Alves de Souza
 * Versão: 2.0
 **********************************************************************************************/

// Import do DAO
const usuarioViagemDAO = require('../../model/dao/usuarioViagem.js');

// Import das mensagens padrão
const MESSAGE_DEFAULT = require('../modulo/message_conf.js');

//  LISTAR TODOS USUARIOS

const listarUsuarioViagem = async function () {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    let result = await usuarioViagemDAO.getSelectAllUserTravel();

    if (result) {
      if (result.length > 0) {
        MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status;
        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code;
        MESSAGE.HEADER.response.total_user_travel = result.length;
        MESSAGE.HEADER.response.user_travel = result;

        return MESSAGE.HEADER;
      } else {
        return MESSAGE.ERROR_NOT_FOUND;
      }
    } else {
      return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

//BUSCAR POR ID (id_usuario_viagem)
const buscarUsuarioViagemId = async function (id) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
      let result = await usuarioViagemDAO.getSelectByIdUserTravel(id);

      if (result) {
        if (result.length > 0) {
          MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status;
          MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code;
          MESSAGE.HEADER.response.user_travel = result;

          return MESSAGE.HEADER;
        } else {
          return MESSAGE.ERROR_NOT_FOUND;
        }
      } else {
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
      }
    } else {
      MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field =
        'Atributo [ID_USUARIO_VIAGEM] inválido!';
      return MESSAGE.ERROR_REQUIRED_FIELDS;
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

//RETORNAR VIAGENS PELO ID DO USUÁRIO

const listarViagensUsuarioId = async function (usuarioId) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (
      usuarioId != '' &&
      usuarioId != null &&
      usuarioId != undefined &&
      !isNaN(usuarioId) &&
      usuarioId > 0
    ) {
      let result = await usuarioViagemDAO.getSelectTravelByUserId(usuarioId);

      if (result) {
        if (result.length > 0) {
          MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status;
          MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code;
          MESSAGE.HEADER.response.travels = result;

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

//RETORNAR USUÁRIOS PELO ID DA VIAGEM

const listarUsuariosViagemId = async function (viagemId) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (
      viagemId != '' &&
      viagemId != null &&
      viagemId != undefined &&
      !isNaN(viagemId) &&
      viagemId > 0
    ) {
      let result = await usuarioViagemDAO.getSelectUserByTravelId(viagemId);

      if (result) {
        if (result.length > 0) {
          MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status;
          MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code;
          MESSAGE.HEADER.response.users = result;

          return MESSAGE.HEADER;
        } else {
          return MESSAGE.ERROR_NOT_FOUND;
        }
      } else {
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
      }
    } else {
      MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field =
        'Atributo [ID_VIAGEM] inválido!';
      return MESSAGE.ERROR_REQUIRED_FIELDS;
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

//INSERIR

const inserirUsuarioViagem = async function (usuarioViagem, contentType) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
      let validarDados = await validarDadosUsuarioViagem(usuarioViagem);

      if (!validarDados) {
        let result = await usuarioViagemDAO.setInsertUserTravel(usuarioViagem);

        if (result) {
          let lastId = await usuarioViagemDAO.getSelectLastIdUserTravel();

          if (lastId) {
            usuarioViagem.id_usuario_viagem = lastId[0].id_usuario_viagem;

            MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status;
            MESSAGE.HEADER.status_code =
              MESSAGE.SUCCESS_CREATED_ITEM.status_code;
            MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message;
            MESSAGE.HEADER.response = usuarioViagem;

            return MESSAGE.HEADER;
          } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
          }
        } else {
          return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
        }
      } else {
        return validarDados;
      }
    } else {
      return MESSAGE.ERROR_CONTENT_TYPE;
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

//ATUALIZAR

const atualizarUsuarioViagem = async function (usuarioViagem, id, contentType) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
      let validarDados = await validarDadosUsuarioViagem(usuarioViagem);

      if (!validarDados) {
        let validarId = await buscarUsuarioViagemId(id);

        if (validarId.status_code == 200) {
          usuarioViagem.id = id;
          let result = await usuarioViagemDAO.setUpdateUserTravel(
            usuarioViagem
          );

          if (result) {
            MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status;
            MESSAGE.HEADER.status_code =
              MESSAGE.SUCCESS_CREATED_ITEM.status_code;
            MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message;
            MESSAGE.HEADER.response = usuarioViagem;

            return MESSAGE.HEADER;
          } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
          }
        } else {
          return validarId;
        }
      } else {
        return validarDados;
      }
    } else {
      return MESSAGE.ERROR_CONTENT_TYPE;
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

//EXCLUIR TODAS AS VIAGENS POR ID_USUARIO

const excluirUsuarioViagemByUsuarioId = async function (usuarioId) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (
      usuarioId != '' &&
      usuarioId != null &&
      usuarioId != undefined &&
      !isNaN(usuarioId) &&
      usuarioId > 0
    ) {
      let result = await usuarioViagemDAO.setDeleteUserTravelByUserId(
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

//EXCLUIR USUARIO POR ID

const excluirUsuarioViagem = async function (id) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    let validarId = await buscarUsuarioViagemId(id);

    if (validarId.status_code == 200) {
      let result = await usuarioViagemDAO.setDeleteUserTravel(id);

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

//VALIDAÇÃO DOS DADOS

const validarDadosUsuarioViagem = async function (usuarioViagem) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  if (
    !usuarioViagem.id_usuario ||
    isNaN(usuarioViagem.id_usuario) ||
    usuarioViagem.id_usuario <= 0
  ) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field =
      'Atributo [ID_USUARIO] inválido';
    return MESSAGE.ERROR_REQUIRED_FIELDS;
  }

  if (
    !usuarioViagem.id_viagem ||
    isNaN(usuarioViagem.id_viagem) ||
    usuarioViagem.id_viagem <= 0
  ) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field =
      'Atributo [ID_VIAGEM] inválido';
    return MESSAGE.ERROR_REQUIRED_FIELDS;
  }

  return false;
};

module.exports = {
  listarUsuarioViagem,
  buscarUsuarioViagemId,
  listarViagensUsuarioId,
  listarUsuariosViagemId,
  inserirUsuarioViagem,
  atualizarUsuarioViagem,
  excluirUsuarioViagemByUsuarioId,
  excluirUsuarioViagem,
};
