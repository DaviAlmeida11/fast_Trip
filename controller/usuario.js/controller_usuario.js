/*********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 27/11/2025
 * Autor: Davi de Almeida
 * Versão: 1.0
 **********************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no BD
const cripitografia = require('../../cripitografia/cripitografia.js');

const UPLOAD = require('../upload/controller_upload_azure.js')

const userDAO = require('../../model/dao/usuario')

const MESSAGE_DEFAULT = require('../modulo/message_conf')


  

// Lista todos os objetos relacionados a esta tabela no banco de dados
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

const inserirUsuario = async function (dados, img, contentType) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        // Verificação do Content-Type
        if (!contentType || !contentType.toLowerCase().includes('multipart/form-data')) {
            return MESSAGE.ERROR_CONTENT_TYPE; // 415
        }

        // Validação de campos obrigatórios
        if (!dados.email || !dados.senha) {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = "Campos obrigatórios vazios";
            return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
        }

        // Criptografia da senha
        dados.senha = await cripitografia.criptografarSenha(dados.senha);

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
        dados.img = urlImg;

        // Inserção no banco
        let resultado = await userDAO.insertUsuario(dados);

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

const atualizarUsuario = async function (usuario, id, contentType, img) {
  // Cópia profunda do objeto MESSAGE_DEFAULT
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
      // 1. Verificar Content-Type
      if (!contentType || !contentType.toLowerCase().includes("multipart/form-data")) {
          return MESSAGE.ERROR_CONTENT_TYPE; // 415
      }

      // 2. Verificar se o ID existe
      const validarId = await listarUsuarioId(id);
      if (validarId.status_code !== 200) {
          return validarId; // 404 ou outro erro
      }

      // 3. Validar campos obrigatórios
      if (!usuario.email || !usuario.senha) {
          MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = "Campos obrigatórios vazios";
          return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
      }

      // 4. Criptografar a senha
      usuario.senha = await cripitografia.criptografarSenha(usu.senha);

      // 5. Verificar imagem enviada
      if (!img || !img.originalname || !img.buffer) {
          console.log("Arquivo de imagem inválido:", img);
          return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
      }

      // 6. Upload da imagem
      const urlImg = await UPLOAD.uploadFiles(img);
      if (!urlImg) {
          return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
      }

      // 7. Adiciona URL ao objeto
      usuario.img = urlImg;

      // 8. Validar dados do usuário
      const validarDados = validarDadosUsuario(usuario);
      if (validarDados) {
          return validarDados; // retorna erro de validação
      }

      // 9. Atualizar usuário no banco
      usuario.id = parseInt(id);

      const result = await userDAO.setupdateUser(usuario);
      if (!result) {
          return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
      }

      // 10. Sucesso
      MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATED_ITEM.status;
      MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code;
      MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATED_ITEM.message;
      MESSAGE.HEADER.response = usuario;

      return MESSAGE.HEADER; // 200

  } catch (error) {
      console.error(error);
      return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
  }
};


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
