/*********************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de ator no Banco de Dados MySQL
 * Data: 04/11/2025
 * Autor: Davi de Almeida
 * Versão: 1.0
 **********************************************************************************************/

//Import da biblioteca do PrismaClient

//Import da biblioteca do PrismaClient
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getSelectAllSeguidor = async function () {
    try {
        let sql = 'select * from tb_seguidor order by id_seguidor desc'


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



const getSelectSeguidorById = async function (id) {
    try {
        let sql = `select * from tb_seguidor where id_seguidor =${id}`

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

const getSelectLastId = async function () {
    try {
        let sql = 'select id_seguidor from tb_seguidor order by id_seguidor desc limit 1'

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

const setInsertSeguidor = async function (seguidor) {
    try {
     if (seguidor.img == null) {

           sql = `INSERT INTO tb_seguidor
    (nome, nickname, genero, img)
    VALUES (
        '${seguidor.nome}',
        '${seguidor.nickname}',
        '${seguidor.genero}',
        '${seguidor.img}'
    )`

        } else {

 sql = `INSERT INTO tb_seguidor
    (nome, nickname, genero, img)
    VALUES (
        '${seguidor.nome}',
        '${seguidor.nickname}',
        '${seguidor.genero}',
        '${seguidor.img}'
    )`

        } 

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return result
        } else {
            return false
        }
    } catch (error) { console.log(error)

        return false
    }
}

const setupdateFolower = async function (seguidor) {
    try {
        let sql = "";

        if (seguidor.img == null) {
           
            sql = `
                UPDATE tb_seguidor
                SET 
                    nome = '${seguidor.nome}',
                    nickname = '${seguidor.nickname}',
                    genero = '${seguidor.genero}'
                WHERE id_seguidor = ${seguidor.id};
            `;

        } else {

            // ATUALIZA A IMAGEM
            sql = `
                UPDATE tb_seguidor
                SET 
                    nome = '${seguidor.nome}',
                    nickname = '${seguidor.nickname}',
                    genero = '${seguidor.genero}',
                    img = '${seguidor.img}'
                WHERE id_seguidor = ${seguidor.id};
            `
        }

        

        let result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            return result // UPDATE OK
        } else {
            return false; // UPDATE não afetou linhas
        }

    } catch (error) {
        return false
    }
}


const setDeleteSeguidor = async function (id) {
    try{
        let sql = `delete from tb_seguidor where id_seguidor = ${id}` 
        let result = await prisma.$executeRawUnsafe(sql)

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
    getSelectAllSeguidor,
    getSelectSeguidorById,
    getSelectLastId,
    setInsertSeguidor,
    setupdateFolower,
    setDeleteSeguidor
    
}