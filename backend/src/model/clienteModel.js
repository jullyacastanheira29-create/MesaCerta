import pool from "../config/db.js";

const getAll = async () => {
    const result = await pool.query(
        "SELECT * FROM cliente ORDER BY id_cliente"
    );

    return result.rows;
};

const getById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM cliente WHERE id_cliente = $1",
        [id]
    );

    return result.rows[0];
};

const create = async (nome, email, senha) => {
    const result = await pool.query(
        `INSERT INTO cliente
        (nome_cliente, email_cliente, senha_cliente)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [nome, email, senha]
    );

    return result.rows[0];
};

const update = async (id, nome, email, senha) => {
    const result = await pool.query(
        `UPDATE cliente
        SET nome_cliente = $1,
            email_cliente = $2,
            senha_cliente = $3
        WHERE id_cliente = $4
        RETURNING *`,
        [nome, email, senha, id]
    );

    return result.rows[0];
};

const remove = async (id) => {
    const result = await pool.query(
        "DELETE FROM cliente WHERE id_cliente = $1 RETURNING *",
        [id]
    );

    return result.rows[0];
};

const login = async (email_cliente, senha_cliente) => {
    const result = await pool.query(
        `SELECT
            id_cliente,
            nome_cliente,
            email_cliente
        FROM cliente
        WHERE email_cliente = $1
        AND senha_cliente = $2`,
        [email_cliente, senha_cliente]
    );

    return result.rows[0];
};

export default {
    getAll,
    getById,
    create,
    update,
    remove,
    login
};