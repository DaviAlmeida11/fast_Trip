/*********************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de ator no Banco de Dados MySQL
 * Data: 27/11/2025
 * Autor: DAvi de Almeida
 * Versão: 1.0
 **********************************************************************************************/

//Import da biblioteca do PrismaClient

//Import da biblioteca do PrismaClient
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getSelectAllUser = async function() {
    try {
        let sql = 'select * from tb_usuario order by id_usuario desc;'

        let result = await prisma.$queryRawUnsafe(sql)

        if(result){
            return result
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}


module.exports = {

    getSelectAllUser
}

