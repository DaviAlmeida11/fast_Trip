/*********************************************************************************************
 * Objetivo: DAO do relacionamento diario_tipo_viagem
 * Data: 06/12/2025
 * Autor: Aline Alves de Souza
 * Versão: 1.0
 **********************************************************************************************/
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getSelectAllDiaryTravelType = async function () {
  try {
    let sql = `SELECT * FROM tb_diario_tipo_viagem ORDER BY id_diario_tipo_viagem DESC`;
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
const getSelectByIdDiaryTravelType = async function (id) {
  try {
    let sql = `SELECT * FROM tb_diario_tipo_viagem WHERE id_diario_tipo_viagem = ${id}`;
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
const getTravelTypesByDiaryId = async function (idDiario) {
  try {
    let sql = `
            SELECT tb_tipo_viagem.*
            FROM tb_diario_tipo_viagem
            INNER JOIN tb_tipo_viagem
                ON tb_tipo_viagem.id_tipo_viagem = tb_diario_tipo_viagem.id_tipo_viagem
            WHERE tb_diario_tipo_viagem.id_diario = ${idDiario}
        `;
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

const getSelectLastIdDiaryTravelType = async function () {
  try {
    let sql = `
            SELECT id_diario_tipo_viagem
            FROM tb_diario_tipo_viagem
            ORDER BY id_diario_tipo_viagem DESC LIMIT 1
        `;
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

const setInsertDiaryTravelType = async function (data) {
  try {
    let sql = `
            INSERT INTO tb_diario_tipo_viagem (id_diario, id_tipo_viagem)
            VALUES (${data.id_diario}, ${data.id_tipo_viagem})
        `;
    let result = await prisma.$executeRawUnsafe(sql);
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
const setUpdateDiaryTravelType = async function (data) {
  try {
    let sql = `
            UPDATE tb_diario_tipo_viagem
            SET id_diario = ${data.id_diario},
                id_tipo_viagem = ${data.id_tipo_viagem}
            WHERE id_diario_tipo_viagem = ${data.id}
        `;
    let result = await prisma.$executeRawUnsafe(sql);
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
const setDeleteDiaryTravelType = async function (id) {
  try {
    let sql = `DELETE FROM tb_diario_tipo_viagem WHERE id_diario_tipo_viagem = ${id}`;
    let result = await prisma.$executeRawUnsafe(sql);
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
const setDeleteDiaryTravelTypeByDiaryId = async function (idDiario) {
  try {
    let sql = `DELETE FROM tb_diario_tipo_viagem WHERE id_diario = ${idDiario}`;
    let result = await prisma.$executeRawUnsafe(sql);
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
module.exports = {
  getSelectAllDiaryTravelType,
  getSelectByIdDiaryTravelType,
  getTravelTypesByDiaryId,
  getSelectLastIdDiaryTravelType,
  setInsertDiaryTravelType,
  setUpdateDiaryTravelType,
  setDeleteDiaryTravelType,
  setDeleteDiaryTravelTypeByDiaryId,
};
