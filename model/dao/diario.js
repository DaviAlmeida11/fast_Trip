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

const getSelectAllDiario = async function () {
    try {
        let sql = 'select * from tb_diario order by id_diario desc'


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


const getSelectDIarioById = async function (id) {
    try {
        let sql = `select * from tb_diario where id_diario = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)
        console.log(result)
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
        let sql = 'select id_diario from tb_diario order by id_diario desc limit 1 '

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


const setInsertDiairio = async function (diario) {
    try {

        if (diario.img == null) {
            sql = `insert into tb_diario(nome, is_publico, descricao, criado_em, atualizado_em, img, id_usuario, id_local, id_viagem) 
        values('${diario.nome}', ${diario.is_publico}, '${diario.descricao}', '${diario.criado_em}', '${diario.atualizado_em}', '${diario.img}', '${diario.id_usuario}', '${diario.id_local}', '${diario.id_viagem}')`

        } else {

            sql = `insert into tb_diario(nome, is_publico, descricao, criado_em, atualizado_em, img, id_usuario, id_local, id_viagem) 
        values('${diario.nome}',${diario.is_publico}, '${diario.descricao}', '${diario.criado_em}', '${diario.atualizado_em}', '${diario.img}', '${diario.id_usuario}', '${diario.id_local}', '${diario.id_viagem}')`
            
        } 

        let result = await prisma.$executeRawUnsafe(sql)

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

const setupdateDiario = async function (diario) {
    try {
        let sql = "";

        if (diario.img == null) {

            // NÃO ATUALIZA A IMAGEM
            sql = `
UPDATE tb_diario
SET 
    nome = '${diario.nome}',
    is_publico = '${diario.is_publico}',
    descricao = '${diario.descricao}',
    criado_em = '${diario.criado_em}',
    atualizado_em = '${diario.atualizado_em}',
    img = '${diario.img}',
    id_usuario = '${diario.id_usuario}',
    id_local = '${diario.id_local}',
    id_viagem = '${diario.id_viagem}'
WHERE id_diario = ${diario.id};
`;

        } else {

            // ATUALIZA A IMAGEM
            sql = `
UPDATE tb_diario
SET 
    nome = '${diario.nome}',
    is_publico = '${diario.is_publico}',
    descricao = '${diario.descricao}',
    criado_em = '${diario.criado_em}',
    atualizado_em = '${diario.atualizado_em}',
    img = '${diario.img}',
    id_usuario = '${diario.id_usuario}',
    id_local = '${diario.id_local}',
    id_viagem = '${diario.id_viagem}'
WHERE id_diario = ${diario.id};
`;

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

const setDeleteDiairio = async function (id) {
    try {
        let sql = `delete from tb_diario where id_diario = ${id}`

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
    getSelectAllDiario,
    getSelectDIarioById,
    getSelectLastId,
    setInsertDiairio,
    setupdateDiario,
    setDeleteDiairio 
}