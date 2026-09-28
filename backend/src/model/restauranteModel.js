import pool from "../config/db.js";

// =====================================
// LISTAR RESTAURANTES
// =====================================

const getAll = async () => {

    const result = await pool.query(
        `SELECT *
         FROM restaurante
         ORDER BY id_restaurante`
    );

    return result.rows;
};


// =====================================
// BUSCAR RESTAURANTE POR ID
// =====================================

const getById = async (id) => {

    const result = await pool.query(
        `SELECT *
         FROM restaurante
         WHERE id_restaurante = $1`,
        [id]
    );

    return result.rows[0];
};


// =====================================
// CRIAR RESTAURANTE
// =====================================

const create = async (
    nome_restaurante,
    endereco_restaurante,
    telefone_restaurante,
    tipo_cozinha,
    avaliacao
) => {

    const result = await pool.query(
        `INSERT INTO restaurante (
            nome_restaurante,
            endereco_restaurante,
            telefone_restaurante,
            tipo_cozinha,
            avaliacao
        )

        VALUES ($1, $2, $3, $4, $5)

        RETURNING *`,
        [
            nome_restaurante,
            endereco_restaurante,
            telefone_restaurante,
            tipo_cozinha,
            avaliacao
        ]
    );

    return result.rows[0];
};


// =====================================
// ATUALIZAR RESTAURANTE
// =====================================

const update = async (
    id,
    nome_restaurante,
    endereco_restaurante,
    telefone_restaurante,
    tipo_cozinha,
    avaliacao
) => {

    const result = await pool.query(
        `UPDATE restaurante

         SET
            nome_restaurante = $1,
            endereco_restaurante = $2,
            telefone_restaurante = $3,
            tipo_cozinha = $4,
            avaliacao = $5

         WHERE id_restaurante = $6

         RETURNING *`,
        [
            nome_restaurante,
            endereco_restaurante,
            telefone_restaurante,
            tipo_cozinha,
            avaliacao,
            id
        ]
    );

    return result.rows[0];
};


// =====================================
// EXCLUIR RESTAURANTE
// =====================================

const remove = async (id) => {

    const result = await pool.query(
        `DELETE FROM restaurante

         WHERE id_restaurante = $1

         RETURNING *`,
        [id]
    );

    return result.rows[0];
};


// =====================================
// EXPORTAR
// =====================================

export default {

    getAll,
    getById,
    create,
    update,
    remove

};
