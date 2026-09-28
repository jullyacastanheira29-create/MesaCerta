import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginCliente } from "../services/api";
import { salvarClienteLogado } from "../services/auth";

import "./Login.css";


export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);


  // =====================================
  // LOGIN
  // =====================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setErro("");
    setCarregando(true);


    try {

      const resposta =
        await loginCliente({

          email_cliente: email,
          senha_cliente: senha

        });


      console.log(
        "Resposta do login:",
        resposta
      );


      // =====================================
      // CLIENTE RETORNADO PELO BACKEND
      // =====================================

      const cliente =
        resposta?.cliente;


      if (!cliente) {

        throw new Error(
          "Não foi possível identificar o cliente."
        );

      }


      console.log(
        "Cliente encontrado:",
        cliente
      );


      // =====================================
      // SALVAR CLIENTE
      // =====================================

      salvarClienteLogado(cliente);


      console.log(
        "Cliente salvo no localStorage."
      );


      // =====================================
      // IR PARA RESTAURANTES
      // =====================================

      window.location.href =
        "/restaurantes";


    } catch (error) {

      console.error(
        "Erro no login:",
        error
      );


      setErro(
        error.message ||
        "E-mail ou senha incorretos."
      );


    } finally {

      setCarregando(false);

    }

  };


  return (

    <div className="login-container">


      <div className="login-card">


        {/* LOGO */}

        <div className="login-logo">

          <span>
            🍽️
          </span>

          <h1>
            MesaCerta
          </h1>

        </div>


        {/* TÍTULO */}

        <h2>
          Bem-vindo de volta!
        </h2>


        <p className="login-subtitulo">
          Entre para continuar sua reserva.
        </p>


        {/* ERRO */}

        {erro && (

          <div className="login-erro">
            {erro}
          </div>

        )}


        {/* FORMULÁRIO */}

        <form onSubmit={handleSubmit}>


          {/* E-MAIL */}

          <div className="login-campo">

            <label>
              E-mail
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="seuemail@email.com"
              required
            />

          </div>


          {/* SENHA */}

          <div className="login-campo">

            <label>
              Senha
            </label>

            <input
              type="password"
              value={senha}
              onChange={(e) =>
                setSenha(e.target.value)
              }
              placeholder="Digite sua senha"
              required
            />

          </div>


          {/* BOTÃO */}

          <button
            type="submit"
            className="login-botao"
            disabled={carregando}
          >

            {carregando
              ? "Entrando..."
              : "Entrar"
            }

          </button>


        </form>


        {/* CADASTRO */}

        <div className="login-cadastro">

          <span>
            Ainda não possui uma conta?
          </span>

          <button
            type="button"
            onClick={() =>
              navigate("/novo")
            }
          >
            Criar conta
          </button>

        </div>


      </div>

    </div>

  );

}

