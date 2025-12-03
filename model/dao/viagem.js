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

const getSelectAllTravel = async function () {
    try {
        let sql = 'select * from tb_viagem order by id_viagem desc'


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

const getSelectTravelById = async function (id) {
    try {
        let sql = `select * from tb_viagem where id_viagem = ${id}`


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

const getSelectLastIdTravel = async function (id) {
    try {
        let sql = `select id_viagem from tb_viagem order by id_viagem desc limit 1`


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

const setInsertTravel = async function (viagem) {
    try {
        let sql = `
    insert into tb_viagem (nome, data_ida, data_volta, tempo_viagem, id_local)
    values ('${viagem.nome}', '${viagem.data_ida}', '${viagem.data_volta}', '${viagem.tempo_viagem}', '${viagem.id_local}')`
        console.log(sql)

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

const setUpdateTravel = async function (viagem) {
    try {
        let sql = `update tb_viagem 
                    set nome = '${viagem.nome}', 
                    data_ida = '${viagem.data_ida}', 
                    data_volta = '${viagem.data_volta}', 
                    tempo_viagem = '${viagem.tempo_viagem}'
                    where id_viagem = ${viagem.id}`


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

const setDeleteTravel = async function (id) {
    try {
        let sql = `delete from tb_viagem where id_viagem = ${id}`


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
    getSelectAllTravel,
    getSelectTravelById,
    getSelectLastIdTravel,
    setInsertTravel,
    setUpdateTravel,
    setDeleteTravel
}