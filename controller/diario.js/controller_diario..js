/*********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 05/12/2025
 * Autor: Davi de Almeida
 * Versão: 1.0
 **********************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no BD
const diarioDAO = require('../../model/dao/diario.js')


const MESSAGE_DEFAULT = require("../modulo/message_conf.js")

const UPLOAD = require('../upload/controller_upload_azure.js')




const listarDiario = async function () {
  //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
    //Chama a função do DAO para retornar a lista de diretores
    let result = await diarioDAO.getSelectAllDiario()

    if (result) { 
      if (result.length > 0) {
        MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
        MESSAGE.HEADER.response.total_diario = result.length
        MESSAGE.HEADER.response.diario = result

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

const listarDiarioId = async function (id) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
    if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
      let result = await diarioDAO.getSelectDIarioById(id)

      if (result) {
        if (result.length > 0) {
            MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
            MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
            MESSAGE.HEADER.response.diario
            MESSAGE.HEADER.response.diario = result
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


const inserirDiario = async function (dados, img, contentType) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        // Verificação do Content-Type
        if (!contentType || !contentType.toLowerCase().includes('multipart/form-data')) {
            return MESSAGE.ERROR_CONTENT_TYPE; // 415
        }

        // Valida se o arquivo foi enviado corretamente
        if (!img || !img.originalname || !img.buffer) {
            console.log("Arquivo de imagem inválido:", img);
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
        }

        // Upload da imagem
        let urlImg = await UPLOAD.uploadFiles(img);

        if (!urlImg) {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
        }

        // Adiciona a URL da imagem nos dados
        dados.capa = urlImg;

        // Inserção no banco
        let resultado = await diarioDAO.setInsertDiairio(dados);

        if (resultado) {
            MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status;
            MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code;
            MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message;
            MESSAGE.HEADER.response = dados;

            return MESSAGE.HEADER;
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
        }

    } catch (error) {
        console.log("Erro inserirUsuario:", error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

const atualizarDiario = async function (diario, id, contentType) {
  //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
    if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
      let validarId = await listarLocalId(id)

      if (validarId.status_code == 200) {

        let validarDados = await validarDadosDiario(diario)

        if (!validarDados) {
          //Adicionando o ID no JSON com os dados do ator
          diario.id = parseInt(id)

          let result = await diarioDAO.setupdateDiario(diario)

          if (result) {
            MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATED_ITEM.status
            MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
            MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATED_ITEM.message
            MESSAGE.HEADER.response = diario

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
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
  }
}


const excluirDiairo = async function (id) {
  //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
    let validarId = await listarDiarioId(id)

    if (validarId.status_code == 200) {


      let result = await diarioDAO.setDeleteDiairio(id)

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


const validarDadosDiario = function (diario) {

  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  // NOME
  if (diario.nome == '' || diario.nome == null || diario.nome == undefined || diario.nome.length > 100) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [NOME] invalido`
    return MESSAGE.ERROR_REQUIRED_FIELDS //400

    
  }else if (typeof diario.is_publico !== "boolean") {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = "Atributo [IS_PUBLICO] inválido";
    return MESSAGE.ERROR_REQUIRED_FIELDS //400
// Converter para inteiro para salvar no banco


  } else if (diario.descricao == '' || diario.descricao == null || diario.descricao == undefined || diario.descricao.length > 200) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [DESCRIÇÃO] invalido`
    return MESSAGE.ERROR_REQUIRED_FIELDS //400

  } else if (diario.criado_em == '' || diario.criado_em == null || diario.criado_em == undefined || diario.criado_em.length > 50) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [] invalido`
    return MESSAGE.ERROR_REQUIRED_FIELDS //400

    
  } else if (diario.atualizado_em == '' || diario.atualizado_em == null || diario.atualizado_em == undefined || diario.atualizado_em.length > 50) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [ATUALIZADO_EM] invalido`
    return MESSAGE.ERROR_REQUIRED_FIELDS //400


  
  } else if (diario.img == null) {
    return false

    
  } else if (diario.img == '' || diario.img == undefined) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [FOTO] invalido`
    return MESSAGE.ERROR_REQUIRED_FIELDS //400

  } else if (diario.id_usuario != '' && diario.id_usuario != null && diario.id_usuario != undefined && diario.id_usuario == String && diario.id_usuario > 0) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [FOTO] invalido`
    return MESSAGE.ERROR_REQUIRED_FIELDS //400

  } else if (diario.id_local != '' && diario.id_local != null && diario.id_local != undefined && diario.id_local == String && diario.id_local > 0) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [FOTO] invalido`
    return MESSAGE.ERROR_REQUIRED_FIELDS //400

  } else if (diario.id_viagem != '' && diario.id_viagem != null && diario.id_viagem != undefined && diario.id_viagem == String && diario.id_viagem > 0) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [FOTO] invalido`
    return MESSAGE.ERROR_REQUIRED_FIELDS //400
  }
  
// tranforma os dados do booleam em 1 ou 0 para o banco 
  diario.is_publico = diario.is_publico ? 1 : 0;

  return false; // validação OK
}






module.exports = {
  listarDiario,
  listarDiarioId,
  validarDadosDiario,
  inserirDiario,
  atualizarDiario,
  excluirDiairo
}