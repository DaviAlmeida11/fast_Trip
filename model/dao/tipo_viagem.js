/*********************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de ator no Banco de Dados MySQL
 * Data: 08/12/2025
 * Autor: Davi de Almeida
 * Versão: 1.0
 **********************************************************************************************/

//Import da biblioteca do PrismaClient

//Import da biblioteca do PrismaClient
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getSelectAllTypeTravel = async function () {
    try {
        let sql = 'select * from tb_tipo_viagem order by id_tipo_viagem desc'


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

const getSelectTypeTravelById = async function (id) {
    try {
        let sql = `select * from tb_tipo_viagem where id_tipo_viagem = ${id}`


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

const getSelectLastIdTypeTravel = async function () {
    try {
        let sql = `select id_tipo_viagem from tb_tipo_viagem order by id_tipo_viagem desc limit 1`


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

const setInsertTypeTravel = async function (viagem) {
    try {
        let sql = `
    insert into tb_tipo_viagem (nome )
    values ('${viagem.nome}')`

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

const setUpdateTypeTravel = async function (viagem) {
    try {
        let sql = `update tb_tipo_viagem
                    set nome = '${viagem.nome}' 
                    where id_tipo_viagem = ${viagem.id}`


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

const setDeleteTypeTravel = async function (id) {
    try {
        let sql = `delete from tb_tipo_viagem where id_tipo_viagem = ${id}`


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
    getSelectAllTypeTravel,
    getSelectTypeTravelById,
    getSelectLastIdTypeTravel,
    setInsertTypeTravel,
    setUpdateTypeTravel,
    setDeleteTypeTravel

}