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



const listarDiarioPuclico = async function ( ) {
    try{
    sql = `SELECT * FROM tb_diario WHERE is_publico = 1`

   
        let result = await prisma.$queryRawUnsafe(sql)



        if (result) {
            return result
        } else {
            return false
        }
    } catch (error) { console.log(error)

        return false
    }
}

    module.exports = {
        listarDiarioPuclico
    }