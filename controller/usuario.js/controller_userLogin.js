/*********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 27/11/2025
 * Autor: Davi de Almeida
 * Versão: 1.0
 **********************************************************************************************/




const MESSAGE_DEFAULT = require("../modulo/message_conf.js")



const userLoginDAO = require('../../model/dao/usuario_login.js')

const cripto = require('../../cripitografia/cripitografia')


const validarLoginUsuario = async function (email, senhaDigitada) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

   
        if (!email || !senhaDigitada) {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = "Email ou senha inválidos"
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }

        let user = await userLoginDAO.buscarUsuarioPorEmail(email)
        console.log(user)

        const senhaCorreta = await cripto.compararSenha(senhaDigitada, user[0].senha)



        if (!senhaCorreta) {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = "Senha incorreta"
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }

        MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
        MESSAGE.HEADER.response.user = user

        return MESSAGE.HEADER

    } catch (error) { console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    validarLoginUsuario 
}