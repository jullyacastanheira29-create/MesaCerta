import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { criarCliente } from "../services/api";
import { salvarClienteLogado } from "../services/auth";

import ClienteForm from "./ClienteForm";

import "./NovoCliente.css";


export default function NovoCliente() {

  const navigate = useNavigate();

  const [salvando, setSalvando] = useState(false);

  const [erro, setErro] = useState("");


  // =====================================
  // SALVAR NOVO CLIENTE
  // =====================================

  async function salvar(form) {

    // =====================================
    // VALIDAÇÕES
    // =====================================

    if (
      !form.nome_cliente.trim() ||
      !form.email_cliente.trim()
    ) {

      setErro(
        "Preencha ao menos nome e e-mail."
      );

      return;

    }


    if (!form.senha_cliente.trim()) {

      setErro(
        "A senha é obrigatória para um novo cliente."
      );

      return;

    }


    setSalvando(true);
    setErro("");


    try {

      // =====================================
      // CRIAR CLIENTE NO BANCO
      // =====================================

      const clienteCriado =
        await criarCliente(form);


      console.log(
        "Cliente criado:",
        clienteCriado
      );


      // =====================================
      // SALVAR COMO CLIENTE LOGADO
      // =====================================

      salvarClienteLogado(
        clienteCriado
      );


      console.log(
        "Cliente salvo como logado."
      );


      // =====================================
      // VOLTAR PARA HOME
      // =====================================

      window.location.href = "/";


    } catch (e) {

      console.error(
        "Erro ao criar cliente:",
        e
      );


      setErro(
        "Não foi possível salvar o registro. " +
        e.message
      );


      setSalvando(false);

    }

  }


  return (

    <div className="novo-cliente">

      <ClienteForm

        modoEdicao={false}

        salvando={salvando}

        erro={erro}

        onSalvar={salvar}

        onCancelar={() =>
          navigate("/")
        }

      />

    </div>

  );

}
