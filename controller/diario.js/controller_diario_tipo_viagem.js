/*********************************************************************************************
 * Objetivo: Controller do relacionamento diario_tipo_viagem
 * (Validações, tratamento, respostas, erros, etc)
 * Data: 06/12/2025
 * Autor: Aline Alves de Souza
 * Versão: 1.0
 **********************************************************************************************/

// Import DAO
const diarioTipoViagemDAO = require('../../model/dao/diario_tipo_viagem.js');

// Import mensagens padrão
const MESSAGE_DEFAULT = require('../modulo/message_conf.js');

//LISTAR TODOS

const listarDiarioTipoViagem = async function () {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    let result = await diarioTipoViagemDAO.getSelectAllDiaryTravelType();

    if (result) {
      if (result.length > 0) {
        MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status;
        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code;
        MESSAGE.HEADER.response.total_diary_travel_types = result.length;
        MESSAGE.HEADER.response.diary_travel_types = result;

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

//BUSCAR POR ID

const buscarDiarioTipoViagemId = async function (id) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
      let result = await diarioTipoViagemDAO.getSelectByIdDiaryTravelType(id);

      if (result) {
        if (result.length > 0) {
          MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status;
          MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code;
          MESSAGE.HEADER.response.diary_travel_type = result;

          return MESSAGE.HEADER;
        } else {
          return MESSAGE.ERROR_NOT_FOUND;
        }
      } else {
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
      }
    } else {
      MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field =
        'Atributo [ID_DIARIO_TIPO_VIAGEM] inválido!';
      return MESSAGE.ERROR_REQUIRED_FIELDS;
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};



const buscarDiarioTipoViagemIdTipoViagem =  async function ( id) {
      let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if(id != '' && id != null && id != undefined && !isNaN(id) && id > 0){
            let result = await diarioTipoViagemDAO.getSelectIdTipoviagemDiario(id)

            if(result){
                if(result.length > 0){
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.travels = result

                    return MESSAGE.HEADER //200
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else{
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [ID] invalido`
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}



const listarTiposViagemPorDiarioId = async function (diarioId) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (  diarioId != '' &&diarioId != null &&diarioId != undefined &&!isNaN(diarioId) &&diarioId > 0) {
      let result = await diarioTipoViagemDAO.getTravelTypesByDiaryId(diarioId);

      if (result) {
        if (result.length > 0) {
          MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status;
          MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code;
          MESSAGE.HEADER.response.travel_types = result;

          return MESSAGE.HEADER;
        } else {
          return MESSAGE.ERROR_NOT_FOUND;
        }
      } else {
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
      }
    } else {
      MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field =
        'Atributo [ID_DIARIO] inválido!';
      return MESSAGE.ERROR_REQUIRED_FIELDS;
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

const BuscarInformaçõesImgIdTipoviagemDiairo = async function (diarioId) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (  diarioId != '' && diarioId != null &&  diarioId != undefined && !isNaN(diarioId) &&diarioId > 0 ) {
      let result =
        await diarioTipoViagemDAO.getSelectEspecifcInformations(diarioId);

      if (result) {
        if (result.length > 0) {

          
          let lastId =
            await diarioTipoViagemDAO.getSelectLastIdDiaryTravelType();

          if (lastId) {
            MESSAGE.HEADER.last_id_diario_tipo_viagem =
              lastId.id_diario_tipo_viagem
          }

          MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status;
          MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code;
          
          MESSAGE.HEADER.response.travel_types = result;

          return MESSAGE.HEADER;
        } else {
          return MESSAGE.ERROR_NOT_FOUND;
        }
      } else {
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
      }
    } else {
      MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field =
        'Atributo [ID_DIARIO] inválido!';
      return MESSAGE.ERROR_REQUIRED_FIELDS;
    }
  } catch (error) {
    
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

//INSERIR

const inserirDiarioTipoViagem = async function (data, contentType) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
      let validar = await validarDadosDiarioTipoViagem(data);

      if (!validar) {
        let result = await diarioTipoViagemDAO.setInsertDiaryTravelType(data);

        if (result) {
          let lastId =
            await diarioTipoViagemDAO.getSelectLastIdDiaryTravelType();

          if (lastId) {
            data.id_diario_tipo_viagem = lastId.id_diario_tipo_viagem;

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
          return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
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



const atualizarDiarioTipoViagem = async function (data, id, contentType) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
      let validar = await validarDadosDiarioTipoViagem(data);

      if (!validar) {
        let validarId = await buscarDiarioTipoViagemId(id);

        if (validarId.status_code == 200) {
          data.id = id;
          let result = await diarioTipoViagemDAO.setUpdateDiaryTravelType(data);

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

//EXCLUIR TODOS POR ID_DIARIO

const excluirDiarioTipoViagemByDiarioId = async function (diarioId) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (  diarioId != '' &&diarioId != null &&  diarioId != undefined &&   !isNaN(diarioId) && diarioId > 0  ) {
      let result = await diarioTipoViagemDAO.setDeleteDiaryTravelTypeByDiaryId(
        diarioId
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
        'Atributo [ID_DIARIO] inválido!';
      return MESSAGE.ERROR_REQUIRED_FIELDS;
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

//EXCLUIR POR ID

const excluirDiarioTipoViagem = async function (id) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    let validarId = await buscarDiarioTipoViagemId(id);

    if (validarId.status_code == 200) {
      let result = await diarioTipoViagemDAO.setDeleteDiaryTravelType(id);

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

const validarDadosDiarioTipoViagem = async function (data) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  if (!data.id_diario || isNaN(data.id_diario) || data.id_diario <= 0) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field =
      'Atributo [ID_DIARIO] inválido';
    return MESSAGE.ERROR_REQUIRED_FIELDS;
  }

  if (
    !data.id_tipo_viagem ||
    isNaN(data.id_tipo_viagem) ||
    data.id_tipo_viagem <= 0
  ) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field =
      'Atributo [ID_TIPO_VIAGEM] inválido';
    return MESSAGE.ERROR_REQUIRED_FIELDS;
  }

  return false;
};

module.exports = {
  listarDiarioTipoViagem,
  buscarDiarioTipoViagemId,
  listarTiposViagemPorDiarioId,
  inserirDiarioTipoViagem,
  atualizarDiarioTipoViagem,
  excluirDiarioTipoViagemByDiarioId,
  excluirDiarioTipoViagem,
  buscarDiarioTipoViagemIdTipoViagem,
  BuscarInformaçõesImgIdTipoviagemDiairo
};