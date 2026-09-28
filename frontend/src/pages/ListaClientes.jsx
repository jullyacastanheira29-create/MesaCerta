import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarClientes, excluirCliente } from "../services/api";
import "./ListaClientes.css";


export default function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [confirmandoId, setConfirmandoId] = useState(null);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    setCarregando(true);
    setErro("");
    try {
      const dados = await listarClientes();
      setClientes(dados ?? []);
    } catch (e) {
      setErro("Não foi possível carregar os clientes. " + e.message);
    } finally {
      setCarregando(false);
    }
  }

  async function confirmarExclusao(id) {
    setErro("");
    try {
      await excluirCliente(id);
      setClientes((atual) => atual.filter((c) => c.id_cliente !== id));
    } catch (e) {
      setErro("Não foi possível excluir o registro. " + e.message);
    } finally {
      setConfirmandoId(null);
    }
  }

  return (
    <div className="catalogo__pagina">
      <div className="catalogo__topo">
        <h2>Todos os registros</h2>
        <Link to="/novo" className="botao botao--primario">
          + Novo cliente
        </Link>
      </div>

      {erro && <div className="aviso aviso--erro">{erro}</div>}

      <div className="catalogo__gaveta">
        {carregando ? (
          <p className="catalogo__estado">Abrindo o fichário...</p>
        ) : clientes.length === 0 ? (
          <p className="catalogo__estado">
            Nenhum cliente cadastrado ainda. <Link to="/novo">Adicione o primeiro</Link>.
          </p>
        ) : (
          <ul className="catalogo__lista">
            {clientes.map((cliente) => (
              <li key={cliente.id_cliente} className="ficha">
                <span className="ficha__inicial">
                  {(cliente.nome_cliente || "?").charAt(0).toUpperCase()}
                </span>
                <div className="ficha__dados">
                  <strong>{cliente.nome_cliente}</strong>
                  <span>{cliente.email_cliente}</span>
                  <span className="ficha__id">Nº {cliente.id_cliente}</span>
                </div>
                <div className="ficha__botoes">
                  <Link to={`/editar/${cliente.id_cliente}`} className="botao botao--pequeno">
                    Editar
                  </Link>
                  {confirmandoId === cliente.id_cliente ? (
                    <span className="ficha__confirmar">
                      Excluir?
                      <button
                        className="botao botao--pequeno botao--perigo"
                        onClick={() => confirmarExclusao(cliente.id_cliente)}
                      >
                        Sim
                      </button>
                      <button className="botao botao--pequeno" onClick={() => setConfirmandoId(null)}>
                        Não
                      </button>
                    </span>
                  ) : (
                    <button
                      className="botao botao--pequeno botao--perigo"
                      onClick={() => setConfirmandoId(cliente.id_cliente)}
                    >
                      Excluir
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
