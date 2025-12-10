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

const getSelectAllComentario = async function () {
    try {
        let sql = 'select * from tb_comentario order by id_comentario desc'


        let result = await prisma.$queryRawUnsafe(sql)



        if (result) {
            return result
        } else {
            return false
        }
    } catch (error) {
        console.log(error)

        return false
    }
}


const getSelectComentarioById = async function (id) {
    try {
        let sql = 'select * from tb_comentario order by id_comentario desc'

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
        let sql = 'select id_comentario from tb_comentario order by id_comentario desc limit 1 '

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


const setInsertComentario = async function (comentario) {



    try {
        let sql = `insert into tb_comentario(conteudo, id_diario, id_usuario
          )values('${comentario.conteudo}', '${comentario.id_diario}', '${comentario.id_usuario}')`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return result
        } else {
            return false
        }
    } catch (error) {

        return false
    }
}

const setUpdateComentario = async function (comentario) {



    try {
        let sql = `update tb_comentario
         set 
         conteudo ='${comentario.conteudo}',
         id_diario = '${comentario.id_diario}',
         id_usuario = '${comentario.id_usuario}'
         where id_comentario = '${comentario.id}'`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return result
        } else {
            return false
        }
    } catch (error) {

        return false
    }
}

const setDeleteComentario = async function (id) {
    try {
        let sql = `delete from tb_comentario where id_comentario = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

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
    getSelectAllComentario,
    getSelectComentarioById,
    getSelectLastId,
    setInsertComentario,
    setUpdateComentario,
    setDeleteComentario



}