import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  buscarClientePorId,
  atualizarCliente
} from "../services/api";

import {
  obterClienteLogado,
  salvarClienteLogado
} from "../services/auth";

import "./EditarPerfil.css";


export default function EditarPerfil() {

  const navigate = useNavigate();

  const clienteLogado = obterClienteLogado();

  const [form, setForm] = useState({
    nome_cliente: "",
    email_cliente: "",
    senha_cliente: ""
  });

  const [carregando, setCarregando] =
    useState(true);

  const [salvando, setSalvando] =
    useState(false);

  const [erro, setErro] =
    useState("");

  const [mensagem, setMensagem] =
    useState("");


  // =====================================
  // CARREGAR DADOS
  // =====================================

  useEffect(() => {

    async function carregarCliente() {

      if (!clienteLogado?.id_cliente) {

        navigate("/login");

        return;

      }

      try {

        const cliente =
          await buscarClientePorId(
            clienteLogado.id_cliente
          );

        setForm({
          nome_cliente:
            cliente.nome_cliente || "",

          email_cliente:
            cliente.email_cliente || "",

          senha_cliente: ""
        });

      } catch (error) {

        console.error(error);

        setErro(
          error.message ||
          "Erro ao carregar seus dados."
        );

      } finally {

        setCarregando(false);

      }

    }

    carregarCliente();

  }, []);


  // =====================================
  // ALTERAR CAMPOS
  // =====================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((anterior) => ({
      ...anterior,
      [name]: value
    }));

  };


  // =====================================
  // SALVAR
  // =====================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setErro("");
    setMensagem("");
    setSalvando(true);


    try {

      const dados = {
        nome_cliente:
          form.nome_cliente,

        email_cliente:
          form.email_cliente
      };


      if (form.senha_cliente.trim()) {

        dados.senha_cliente =
          form.senha_cliente;

      }


      const clienteAtualizado =
        await atualizarCliente(
          clienteLogado.id_cliente,
          dados
        );


      salvarClienteLogado(
        clienteAtualizado
      );


      setMensagem(
        "Dados atualizados com sucesso!"
      );


      setTimeout(() => {

        navigate("/perfil");

      }, 800);


    } catch (error) {

      console.error(error);

      setErro(
        error.message ||
        "Não foi possível atualizar seus dados."
      );

    } finally {

      setSalvando(false);

    }

  };


  // =====================================
  // CARREGANDO
  // =====================================

  if (carregando) {

    return (

      <div className="editar-perfil-container">

        <div className="editar-perfil-card">

          <h2>
            Carregando seus dados...
          </h2>

        </div>

      </div>

    );

  }


  return (

    <div className="editar-perfil-container">

      <div className="editar-perfil-card">


        {/* CABEÇALHO */}

        <div className="editar-perfil-cabecalho">

          <span className="editar-perfil-icone">
            ✏️
          </span>

          <div>

            <span className="editar-perfil-tag">
              MESACERTA
            </span>

            <h1>
              Editar meus dados
            </h1>

            <p>
              Altere suas informações pessoais.
            </p>

          </div>

        </div>


        {/* MENSAGEM */}

        {mensagem && (

          <div className="editar-perfil-sucesso">
            {mensagem}
          </div>

        )}


        {erro && (

          <div className="editar-perfil-erro">
            {erro}
          </div>

        )}


        {/* FORMULÁRIO */}

        <form
          className="editar-perfil-form"
          onSubmit={handleSubmit}
        >


          <div className="editar-perfil-campo">

            <label>
              Nome completo
            </label>

            <input
              type="text"
              name="nome_cliente"
              value={form.nome_cliente}
              onChange={handleChange}
              required
            />

          </div>


          <div className="editar-perfil-campo">

            <label>
              E-mail
            </label>

            <input
              type="email"
              name="email_cliente"
              value={form.email_cliente}
              onChange={handleChange}
              required
            />

          </div>


          <div className="editar-perfil-campo">

            <label>
              Nova senha
            </label>

            <input
              type="password"
              name="senha_cliente"
              value={form.senha_cliente}
              onChange={handleChange}
              placeholder="Digite apenas se quiser alterar"
            />

            <small>
              Deixe em branco para manter sua senha atual.
            </small>

          </div>


          {/* BOTÕES */}

          <div className="editar-perfil-acoes">

            <button
              type="button"
              className="editar-perfil-voltar"
              onClick={() =>
                navigate("/perfil")
              }
            >
              Cancelar
            </button>


            <button
              type="submit"
              className="editar-perfil-salvar"
              disabled={salvando}
            >

              {salvando
                ? "Salvando..."
                : "Salvar alterações"
              }

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}