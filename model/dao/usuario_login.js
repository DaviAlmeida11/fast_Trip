
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
        let sql = `
            SELECT 
                nome,
                nickname,
                email, 
                senha,
                genero,
                img
            FROM tb_usuario 
            WHERE email = '${email}'
             order by id_usuario desc LIMIT 1;`
         
         let result = await prisma.$queryRawUnsafe(sql);

        if (result) {
            return result // UPDATE OK
        } else {
            return false; // UPDATE não afetou linhas
        }

    } catch (error) { 
        return false
    }
}
        
    
        


module.exports = {
    buscarUsuarioPorEmail
}