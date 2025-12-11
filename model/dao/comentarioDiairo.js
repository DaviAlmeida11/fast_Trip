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

const listarDiarioComentario = async function  (id) {
  try {
    sql = `
  SELECT *
FROM tb_diario d
INNER JOIN tb_comentario c ON d.id_diario = c.id_diario
WHERE d.id_diario = ${id} `

    let result = await prisma.$queryRawUnsafe(sql)
    return result || false

  } catch (error) {
   
    return false
  }
}

    module.exports = {
        listarDiarioComentario
    }