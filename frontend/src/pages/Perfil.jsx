import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  buscarClientePorId,
  excluirCliente
} from "../services/api";

import {
  obterClienteLogado,
  sair
} from "../services/auth";

import "./Perfil.css";

export default function Perfil() {
  const navigate = useNavigate();
  const clienteLogado = obterClienteLogado();

  const [cliente, setCliente] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [excluindo, setExcluindo] = useState(false);

  useEffect(() => {
    async function carregarCliente() {
      if (!clienteLogado?.id_cliente) {
        navigate("/login");
        return;
      }

      try {
        const dados = await buscarClientePorId(clienteLogado.id_cliente);
        setCliente(dados);
      } catch (error) {
        console.error(error);
        setErro(error.message || "Erro ao carregar seu perfil.");
      } finally {
        setCarregando(false);
      }
    }

    carregarCliente();
  }, [clienteLogado?.id_cliente, navigate]);

  const handleExcluirConta = async () => {
    const primeiraConfirmacao = window.confirm(
      "Tem certeza que deseja excluir sua conta?"
    );

    if (!primeiraConfirmacao) return;

    const segundaConfirmacao = window.confirm(
      "Essa ação não poderá ser desfeita. Deseja realmente excluir sua conta?"
    );

    if (!segundaConfirmacao) return;

    try {
      setExcluindo(true);
      setErro("");

      await excluirCliente(clienteLogado.id_cliente);

      sair();

      alert("Sua conta foi excluída com sucesso.");

      navigate("/");
    } catch (error) {
      console.error(error);
      setErro(error.message || "Não foi possível excluir sua conta.");
      setExcluindo(false);
    }
  };

  if (carregando) {
    return (
      <div className="perfil-container">
        <div className="perfil-card">
          <h2>Carregando seu perfil...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <div className="perfil-card">

        {/* Cabeçalho do perfil */}
        <div className="perfil-cabecalho">

          <span className="perfil-icone">
            <img
              src="/perfil.png"
              alt="Perfil"
              className="perfil-imagem"
            />
          </span>

          <div>
            <span className="perfil-tag">MESACERTA</span>

            <h1>Meu Perfil</h1>

            <p>
              Confira suas informações pessoais.
            </p>
          </div>

        </div>

        {/* Mensagem de erro */}
        {erro && (
          <div className="perfil-erro">
            {erro}
          </div>
        )}

        {/* Informações do cliente */}
        {cliente && (
          <div className="perfil-informacoes">

            <div className="perfil-informacao">
              <span className="perfil-informacao-label">
                Nome completo
              </span>

              <strong>
                {cliente.nome_cliente}
              </strong>
            </div>

            <div className="perfil-informacao">
              <span className="perfil-informacao-label">
                E-mail
              </span>

              <strong>
                {cliente.email_cliente}
              </strong>
            </div>

            <div className="perfil-informacao">
              <span className="perfil-informacao-label">
                Senha
              </span>

              <strong className="perfil-senha">
                ••••••••
              </strong>

              <small>
                Sua senha é mantida em segurança.
              </small>
            </div>

            {/* Botões */}
            <div className="perfil-acoes">

              <button
                type="button"
                className="perfil-botao-secundario"
                onClick={() => navigate("/restaurantes")}
              >
                Voltar
              </button>

              <button
                type="button"
                className="perfil-botao"
                onClick={() => navigate("/editar-perfil")}
              >
                Editar meus dados
              </button>

            </div>

          </div>
        )}

        {/* Excluir conta */}
        <div className="perfil-excluir">

          <div>
            <h3>Excluir conta</h3>

            <p>
              Ao excluir sua conta, seus dados de acesso serão removidos.
            </p>
          </div>

          <button
            type="button"
            className="perfil-botao-excluir"
            onClick={handleExcluirConta}
            disabled={excluindo}
          >
            {excluindo
              ? "Excluindo..."
              : "Excluir minha conta"}
          </button>

        </div>

      </div>
    </div>
  );
}