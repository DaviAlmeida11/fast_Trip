/*********************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de ator no Banco de Dados MySQL
 * Data: 27/11/2025
 * Autor: Davi de Almeida
 * Versão: 1.0
 **********************************************************************************************/

//Import da biblioteca do PrismaClient

//Import da biblioteca do PrismaClient
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getSelectAllUser = async function () {
    try {
        let sql = 'select * from tb_usuario order by id_usuario desc'


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



const getSelectUserById = async function (id) {
    try {
        let sql = `select * from tb_usuario where id_usuario =${id}`

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
        let sql = 'select id_usuario from tb_usuario order by id_usuario desc limit 1'

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

const insertUsuario = async function (usuario) {

    try {
        let sql = ""

        if (usuario.img == null) {

            sql = `INSERT INTO tb_usuario
                (nome, nickname, email, senha, genero, img, criado_em, atualizado_em)
                VALUES(
                    '${usuario.nome}',
                    '${usuario.nickname}',
                    '${usuario.email}',
                    '${usuario.senha}',
                    '${usuario.genero}',
                     ${usuario.img},
                    '${usuario.criado_em}',
                    '${usuario.atualizado_em}'
                )`

        } else {

            sql = `INSERT INTO tb_usuario
                (nome, nickname, email, senha, genero, img, criado_em, atualizado_em)
                VALUES(
                    '${usuario.nome}',
                    '${usuario.nickname}',
                    '${usuario.email}',
                    '${usuario.senha}',
                    '${usuario.genero}',
                    '${usuario.img}',
                    '${usuario.criado_em}',
                    '${usuario.atualizado_em}'
                )`

        }
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


const setupdateUser = async function (usuario) {
    try {
        let sql = "";

        if (usuario.img == null) {

            // NÃO ATUALIZA A IMAGEM
            sql = `
                UPDATE tb_usuario 
                SET 
                    nome = '${usuario.nome}',
                    nickname = '${usuario.nickname}',
                    email = '${usuario.email}',
                    senha = '${usuario.senha}',
                    genero = '${usuario.genero}',
                    criado_em = '${usuario.criado_em}',
                    atualizado_em = '${usuario.atualizado_em}'
                WHERE id_usuario = ${usuario.id};
            `;

        } else {

            // ATUALIZA A IMAGEM
            sql = `
                UPDATE tb_usuario 
                SET 
                    nome = '${usuario.nome}',
                    nickname = '${usuario.nickname}',
                    email = '${usuario.email}',
                    senha = '${usuario.senha}',
                    genero = '${usuario.genero}',
                    img = '${usuario.img}',
                    criado_em = '${usuario.criado_em}',
                    atualizado_em = '${usuario.atualizado_em}'
                WHERE id_usuario = ${usuario.id};
            `;
        }



        let result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            return result // UPDATE OK
        } else {
            return false; // UPDATE não afetou linhas
        }

    } catch (error) {
        console.log("Erro no update:", error);
        return false
    }
}

const setDeleteUser = async function (id) {
    try {
        let sql = `delete from tb_usuario where id_usuario = ${id}`
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
    getSelectAllUser,
    getSelectUserById,
    getSelectLastId,
    insertUsuario,
    setupdateUser,
    setDeleteUser



}

