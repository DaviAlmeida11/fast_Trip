/*********************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de ator no Banco de Dados MySQL
 * Data: 03/12/2025
 * Autor: DAvi de Almeida
 * Versão: 1.0
 **********************************************************************************************/

//Import da biblioteca do PrismaClient

//Import da biblioteca do PrismaClient

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getSelectAllLocal = async function () {
    try {
        let sql = 'select * from tb_local order by id_local desc'


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


const getSelectLocalById = async function (id) {
    try {
        let sql = `select * from tb_local where id_local =${id}`

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
        let sql = 'select id_local from tb_local order by id_local desc limit 1 '

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

const setInsertLocal = async function (local) {
    try {
        let sql = `insert into tb_local(estado, pais, cidade 
        )values('${local.estado}', '${local.pais}', '${local.cidade}')`

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

const updateLocal = async function (local) {

    try {
        let sql = `update tb_local 
        set 
        nome ='${local.nome}',
        estado = '${local.estado}',
        pais = '${local.pais}',
        cidade = '${local.cidade}'
        where id_local = ${local.id}`
        

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



const setDeleteLocal = async function (id) {
    try {
        let sql = `delete from tb_local where id_local = ${id}`
      
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
    getSelectAllLocal,
    getSelectLocalById,
    getSelectLastId,
    setInsertLocal,
    updateLocal,
    setDeleteLocal,
    
}