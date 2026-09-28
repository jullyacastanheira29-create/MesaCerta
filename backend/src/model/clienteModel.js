import pool from "../config/db.js";

// Buscar todos os clientes
const getAll = async () => {
  const result = await pool.query(`
    SELECT 
      c.idCliente,
      p.idPessoa,
      p.nomePessoa,
      p.emailPessoa,
      p.dataCadastro
    FROM cliente c
    INNER JOIN pessoa p ON c.idPessoa = p.idPessoa
    ORDER BY c.idCliente
  `);

  return result.rows;
};

// Buscar cliente por ID
const getById = async (id) => {
  const result = await pool.query(`
    SELECT 
      c.idCliente,
      p.idPessoa,
      p.nomePessoa,
      p.emailPessoa,
      p.dataCadastro
    FROM cliente c
    INNER JOIN pessoa p ON c.idPessoa = p.idPessoa
    WHERE c.idCliente = $1
  `, [id]);

  return result.rows[0];
};

// Criar cliente
const create = async (nome, email, senha) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Primeiro cria a pessoa
    const pessoaResult = await client.query(`
      INSERT INTO pessoa (
        nomePessoa,
        emailPessoa,
        senhaPessoa,
        dataCadastro
      )
      VALUES ($1, $2, $3, CURRENT_DATE)
      RETURNING idPessoa, nomePessoa, emailPessoa, dataCadastro
    `, [nome, email, senha]);

    const pessoa = pessoaResult.rows[0];

    // Depois cria o cliente relacionado à pessoa
    const clienteResult = await client.query(`
      INSERT INTO cliente (idPessoa)
      VALUES ($1)
      RETURNING idCliente, idPessoa
    `, [pessoa.idpessoa]);

    await client.query("COMMIT");

    return {
      idCliente: clienteResult.rows[0].idcliente,
      idPessoa: pessoa.idpessoa,
      nomePessoa: pessoa.nomepessoa,
      emailPessoa: pessoa.emailpessoa,
      dataCadastro: pessoa.datacadastro
    };

  } catch (error) {
    await client.query("ROLLBACK");
    throw error;

  } finally {
    client.release();
  }
};

// Atualizar cliente
const update = async (id, nome, email, senha) => {
  const result = await pool.query(`
    UPDATE pessoa
    SET
      nomePessoa = $1,
      emailPessoa = $2,
      senhaPessoa = $3
    WHERE idPessoa = (
      SELECT idPessoa
      FROM cliente
      WHERE idCliente = $4
    )
    RETURNING idPessoa, nomePessoa, emailPessoa, dataCadastro
  `, [nome, email, senha, id]);

  return result.rows[0];
};

// Excluir cliente
const remove = async (id) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Descobre a pessoa relacionada ao cliente
    const pessoaResult = await client.query(`
      SELECT idPessoa
      FROM cliente
      WHERE idCliente = $1
    `, [id]);

    if (pessoaResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return null;
    }

    const idPessoa = pessoaResult.rows[0].idpessoa;

    // Exclui o cliente
    const clienteResult = await client.query(`
      DELETE FROM cliente
      WHERE idCliente = $1
      RETURNING *
    `, [id]);

    // Exclui a pessoa
    await client.query(`
      DELETE FROM pessoa
      WHERE idPessoa = $1
    `, [idPessoa]);

    await client.query("COMMIT");

    return clienteResult.rows[0];

  } catch (error) {
    await client.query("ROLLBACK");
    throw error;

  } finally {
    client.release();
  }
};

// Login
const login = async (email, senha) => {
  const result = await pool.query(`
    SELECT
      c.idCliente,
      p.idPessoa,
      p.nomePessoa,
      p.emailPessoa
    FROM cliente c
    INNER JOIN pessoa p ON c.idPessoa = p.idPessoa
    WHERE p.emailPessoa = $1
      AND p.senhaPessoa = $2
  `, [email, senha]);

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
