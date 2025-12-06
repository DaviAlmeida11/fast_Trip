/*********************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de ator no Banco de Dados MySQL
 * Data: 03
 * /12/2025
 * Autor: DAvi de Almeida
 * Versão: 1.0
 **********************************************************************************************/

//Import da biblioteca do PrismaClient

//Import da biblioteca do PrismaClient

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getSelectAllUsuarioViagemDiario = async function () {
    try {
        let sql = 'select * from vw_usuario_diarios_viagens_com_Id'


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


const getSelectUserTripDyariId = async function (nome) {
    try {
        let sql = `SELECT * FROM vw_usuario_diarios_viagens_com_Id WHERE usuario_nome = '${nome}';`
console.log(sql)
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
   getSelectAllUsuarioViagemDiario,
    getSelectUserTripDyariId
}
