/*********************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de ator no Banco de Dados MySQL
 * Data: 11/11/2025
 * Autor: Davi de Almeida
 * Versão: 1.0
 **********************************************************************************************/

//Import da biblioteca do PrismaClient

//Import da biblioteca do PrismaClient
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const getSelectFollowerUserid = async function (id) {
    try {
        let sql = `SELECT s.nome, s.nickname
FROM tb_usuario_seguidor us
JOIN tb_seguidor s ON us.id_seguidor = s.id_seguidor
WHERE us.id_usuario =${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}


module.exports = {
    getSelectFollowerUserid
}