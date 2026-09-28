import pool from "../config/db.js";

// =====================================
// LISTAR TODAS AS RESERVAS
// =====================================

const getAll = async () => {

    const result = await pool.query(
        `SELECT
            r.id_reserva,
            r.id_cliente,

            c.nome_cliente,
            c.email_cliente,

            r.id_restaurante,
            rest.nome_restaurante,
            rest.tipo_cozinha,

            r.data_reserva,
            r.horario_reserva,
            r.quantidade_pessoas,
            r.status_reserva

        FROM reserva r

        INNER JOIN cliente c
            ON r.id_cliente = c.id_cliente

        LEFT JOIN restaurante rest
            ON r.id_restaurante = rest.id_restaurante

        ORDER BY r.id_reserva DESC`
    );

    return result.rows;
};


// =====================================
// BUSCAR RESERVA POR ID
// =====================================

const getById = async (id) => {

    const result = await pool.query(
        `SELECT
            r.id_reserva,
            r.id_cliente,

            c.nome_cliente,
            c.email_cliente,

            r.id_restaurante,
            rest.nome_restaurante,
            rest.tipo_cozinha,

            r.data_reserva,
            r.horario_reserva,
            r.quantidade_pessoas,
            r.status_reserva

        FROM reserva r

        INNER JOIN cliente c
            ON r.id_cliente = c.id_cliente

        LEFT JOIN restaurante rest
            ON r.id_restaurante = rest.id_restaurante

        WHERE r.id_reserva = $1`,
        [id]
    );

    return result.rows[0];
};


// =====================================
// RESERVAS DO CLIENTE
// =====================================

const getByCliente = async (id_cliente) => {

    const result = await pool.query(
        `SELECT
            r.id_reserva,
            r.id_cliente,

            c.nome_cliente,
            c.email_cliente,

            r.id_restaurante,
            rest.nome_restaurante,
            rest.tipo_cozinha,

            r.data_reserva,
            r.horario_reserva,
            r.quantidade_pessoas,
            r.status_reserva

        FROM reserva r

        INNER JOIN cliente c
            ON r.id_cliente = c.id_cliente

        LEFT JOIN restaurante rest
            ON r.id_restaurante = rest.id_restaurante

        WHERE r.id_cliente = $1

        ORDER BY
            r.data_reserva DESC,
            r.horario_reserva DESC`,
        [id_cliente]
    );

    return result.rows;
};


// =====================================
// CRIAR RESERVA
// =====================================

const create = async (
    id_cliente,
    id_restaurante,
    data_reserva,
    horario_reserva,
    quantidade_pessoas,
    status_reserva = "Pendente"
) => {

    const result = await pool.query(
        `INSERT INTO reserva (
            id_cliente,
            id_restaurante,
            data_reserva,
            horario_reserva,
            quantidade_pessoas,
            status_reserva
        )

        VALUES ($1, $2, $3, $4, $5, $6)

        RETURNING *`,
        [
            id_cliente,
            id_restaurante,
            data_reserva,
            horario_reserva,
            quantidade_pessoas,
            status_reserva
        ]
    );

    return result.rows[0];
};


// =====================================
// ATUALIZAR RESERVA
// =====================================

const update = async (
    id,
    id_cliente,
    id_restaurante,
    data_reserva,
    horario_reserva,
    quantidade_pessoas,
    status_reserva
) => {

    const result = await pool.query(
        `UPDATE reserva

        SET
            id_cliente = $1,
            id_restaurante = $2,
            data_reserva = $3,
            horario_reserva = $4,
            quantidade_pessoas = $5,
            status_reserva = $6

        WHERE id_reserva = $7

        RETURNING *`,
        [
            id_cliente,
            id_restaurante,
            data_reserva,
            horario_reserva,
            quantidade_pessoas,
            status_reserva,
            id
        ]
    );

    return result.rows[0];
};


// =====================================
// CANCELAR RESERVA
// =====================================

const cancelar = async (id) => {

    const result = await pool.query(
        `UPDATE reserva

        SET status_reserva = 'Cancelada'

        WHERE id_reserva = $1

        RETURNING *`,
        [id]
    );

    return result.rows[0];
};


// =====================================
// EXCLUIR RESERVA
// =====================================

const remove = async (id) => {

    const result = await pool.query(
        `DELETE FROM reserva

        WHERE id_reserva = $1

        RETURNING *`,
        [id]
    );

    return result.rows[0];
};


export default {
    getAll,
    getById,
    getByCliente,
    create,
    update,
    cancelar,
    remove
};

