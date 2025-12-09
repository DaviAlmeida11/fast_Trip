/*********************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de usuario_viagem no Banco de Dados MySQL
 * Data: 05/12/2025
 * Autor: Aline Alves de Souza
 * Versão: 2.0
 **********************************************************************************************/

//Import da biblioteca do PrismaClient
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Seleciona todos os registros
const getSelectAllUserTravel = async function() {
    try {
        let sql = 'SELECT * FROM tb_usuario_viagem ORDER BY id_usuario_viagem DESC'

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

// Seleciona um registro por ID do usuario
const getSelectByIdUserTravel = async function(id) {
    try {
        let sql = `SELECT * FROM tb_usuario_viagem WHERE id_usuario_viagem = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

//Retorna viagens pelo ID do usuário
const getSelectTravelByUserId = async function(idUsuario) {
    try {
        let sql = `SELECT  tb_viagem.id_viagem, tb_viagem.nome 
                   FROM tb_usuario 
                                INNER JOIN tb_usuario_viagem 
                                ON tb_usuario.id_usuario = tb_usuario_viagem.id_usuario
                                INNER JOIN tb_viagem 
                                ON tb_viagem.id_viagem = tb_usuario_viagem.id_viagem
                                WHERE tb_usuario.id_usuario = ${idUsuario}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

// Retorna usuários pelo ID da viagem
const getSelectUserByTravelId = async function(idViagem) {
    try {
        let sql = `SELECT 
        tb_usuario.id_usuario,
        tb_usuario.nome
    FROM tb_usuario
    INNER JOIN tb_usuario_viagem
        ON tb_usuario.id_usuario = tb_usuario_viagem.id_usuario
    INNER JOIN tb_viagem
        ON tb_viagem.id_viagem = tb_usuario_viagem.id_viagem
    WHERE tb_viagem.id_viagem = ${idViagem}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

//Retorna o ultimo id da Tabela
const getSelectLastIdUserTravel = async function() {
    try {
        let sql = 'SELECT id_usuario_viagem FROM tb_usuario_viagem ORDER BY id_usuario_viagem DESC LIMIT 1'

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

// Inserir registro
const setInsertUserTravel = async function(usuarioViagem) {
    try {
        let sql = `INSERT INTO tb_usuario_viagem (id_usuario, id_viagem) values (${usuarioViagem.id_usuario}, ${usuarioViagem.id_viagem})`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

//Atualiza um vínculo da tabela usuario_viagem
const setUpdateUserTravel = async function(usuarioViagem) {
    try {
        let sql = `UPDATE tb_usuario_viagem SET  id_usuario = ${usuarioViagem.id_usuario}, id_viagem = ${usuarioViagem.id_viagem} WHERE id_usuario_viagem = ${usuarioViagem.id}  `

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}


//exclui todas as viagens associadas a um usuário específico
const setDeleteUserTravelByUserId = async function(idUsuario) {
    try {
        let sql = ` DELETE FROM tb_usuario_viagem WHERE id_usuario = ${idUsuario}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}


// Deletar registro
const setDeleteUserTravel = async function (id) {
    try {
        let sql = `DELETE FROM tb_usuario_viagem WHERE id_usuario_viagem = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllUserTravel,
    getSelectByIdUserTravel,
    getSelectTravelByUserId,
    getSelectUserByTravelId,
    getSelectLastIdUserTravel,
    setInsertUserTravel,
    setUpdateUserTravel,
    setDeleteUserTravelByUserId,
    setDeleteUserTravel 
}