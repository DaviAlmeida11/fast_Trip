
/*********************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de ator no Banco de Dados MySQL
 * Data: 05/12/2025
 * Autor: Davi de Almeida
 * Versão: 1.0
 **********************************************************************************************/

//Import da biblioteca do PrismaClient

//Import da biblioteca do PrismaClient


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const buscarUsuarioPorEmail = async function (email) {
    try {
        let sql = `SELECT email, senha FROM tb_usuario WHERE email = '${email}'`;

        let result = await prisma.$queryRawUnsafe(sql);

        if (result.length > 0) {
            return result[0];  // retorna um único usuário
        } else {
            return false;
        }

    } catch (error) {

        return false;
    }
}

module.exports = {
    buscarUsuarioPorEmail
}