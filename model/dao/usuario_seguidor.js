/*********************************************************************************************
 * Objetivo: DAO responsável pelo CRUD de usuario_seguidor no Banco de Dados MySQL
 * Data: 06/12/2025
 * Autor: Aline Alves de Souza
 * Versão: 1.0
 **********************************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Selecionar todos os vínculos
const getSelectAllUserFollower = async function () {
    try {
        let sql = `SELECT * FROM tb_usuario_seguidor ORDER BY id_usuario_seguidor DESC`;
        let result = await prisma.$queryRawUnsafe(sql);

        if (Array.isArray(result)) {
            return result;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

// Selecionar por ID
const getSelectByIdUserFollower = async function (id) {
    try {
        let sql = `SELECT * FROM tb_usuario_seguidor WHERE id_usuario_seguidor = ${id}`;
        let result = await prisma.$queryRawUnsafe(sql);

        if (Array.isArray(result)) {
            return result;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};
// Selecionar seguidores de um usuário
const getFollowersByUserId = async function (idUsuario) {
    try {
        let sql = `
                  SELECT tb_seguidor.*
                  FROM tb_usuario_seguidor
                INNER JOIN tb_seguidor
                ON tb_seguidor.id_seguidor = tb_usuario_seguidor.id_seguidor
                WHERE tb_usuario_seguidor.id_usuario = ${idUsuario};
            `
        let result = await prisma.$queryRawUnsafe(sql);

        if (Array.isArray(result)) {
            return result;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};



const getSelectLastIdUserFollower = async function () {
    try {
        let sql = `SELECT id_usuario_seguidor FROM tb_usuario_seguidor ORDER BY id_usuario_seguidor DESC LIMIT 1`;
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

const setInsertUserFollower= async function (data) {

    try {
        let sql = ` INSERT INTO tb_usuario_seguidor(id_usuario, id_seguidor)
            VALUES (${data.id_usuario}, ${data.id_seguidor})`

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


// Atualizar vínculo
const setUpdateUserFollower = async function (data) {
    try {
        let sql = `
            UPDATE tb_usuario_seguidor 
            SET id_usuario = ${data.id_usuario}, 
                id_seguidor = ${data.id_seguidor}
            WHERE id_usuario_seguidor = ${data.id}
        `;
        let result = await prisma.$executeRawUnsafe(sql);

    
           if (result) {
            return result
        } else {
            return false
        }
    } catch (error) {

        return false
    }
}
// Deletar por ID
const setDeleteUserFollower = async function (id) {
    try {
        let sql = `DELETE FROM tb_usuario_seguidor WHERE id_usuario_seguidor = ${id}`;
        let result = await prisma.$executeRawUnsafe(sql);

           if (result) {
            return result
        } else {
            return false
        }
    } catch (error) {

        return false
    }
}
// Deletar todos seguidores de um usuário
const setDeleteFollowersByUserId = async function (idUsuario) {
    try {
        let sql = `DELETE FROM tb_usuario_seguidor WHERE id_usuario = ${idUsuario}`;
        let result = await prisma.$executeRawUnsafe(sql);


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
    getSelectAllUserFollower,
    getSelectByIdUserFollower,
    getFollowersByUserId,
    getSelectLastIdUserFollower,
    setInsertUserFollower,
    setUpdateUserFollower,
    setDeleteUserFollower,
    setDeleteFollowersByUserId,
};