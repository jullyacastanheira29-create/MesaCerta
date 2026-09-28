import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  listarReservasPorCliente,
  excluirReserva
} from "../services/api";

import { obterClienteLogado } from "../services/auth";

import "./MinhasReservas.css";


export default function MinhasReservas() {

  const navigate = useNavigate();

  const cliente = obterClienteLogado();

  const [reservas, setReservas] = useState([]);

  const [carregando, setCarregando] = useState(true);

  const [erro, setErro] = useState("");


  // =====================================
  // BUSCAR RESERVAS
  // =====================================

  useEffect(() => {

    const carregarReservas = async () => {

      try {

        setCarregando(true);
        setErro("");

        if (!cliente?.id_cliente) {
          setReservas([]);
          return;
        }

        const dados = await listarReservasPorCliente(
          cliente.id_cliente
        );

        setReservas(
          Array.isArray(dados) ? dados : []
        );

      } catch (error) {

        console.error(error);

        setErro(
          error.message ||
          "Não foi possível carregar suas reservas."
        );

      } finally {

        setCarregando(false);

      }

    };

    carregarReservas();

  }, [cliente?.id_cliente]);


  // =====================================
  // CANCELAR RESERVA
  // =====================================

  const handleCancelar = async (id) => {

    const confirmar = window.confirm(
      "Tem certeza que deseja cancelar esta reserva?"
    );

    if (!confirmar) {
      return;
    }

    try {

      // Apesar do botão ser "Cancelar",
      // aqui a reserva é excluída definitivamente
      // do banco de dados.
      await excluirReserva(id);

      alert("Reserva cancelada com sucesso!");

      // Remove a reserva da tela imediatamente
      setReservas((reservasAtuais) =>
        reservasAtuais.filter(
          (reserva) =>
            Number(reserva.id_reserva) !== Number(id)
        )
      );

    } catch (error) {

      console.error(error);

      alert(
        error.message ||
        "Não foi possível cancelar a reserva."
      );

    }

  };


  // =====================================
  // SEM LOGIN
  // =====================================

  if (!cliente) {

    return (

      <div className="reservas-container">

        <div className="sem-reservas">

          <div className="sem-reservas-icone">
            🔐
          </div>

          <h2>
            Faça login para ver suas reservas
          </h2>

          <p>
            Entre na sua conta para consultar
            e gerenciar suas reservas.
          </p>

          <button
            className="botao-nova-reserva"
            onClick={() => navigate("/login")}
          >
            Fazer login
          </button>

        </div>

      </div>

    );

  }


  // =====================================
  // CARREGANDO
  // =====================================

  if (carregando) {

    return (

      <div className="reservas-container">

        <div className="sem-reservas">

          <div className="sem-reservas-icone">
            🍽️
          </div>

          <h2>
            Carregando suas reservas...
          </h2>

          <p>
            Aguarde enquanto buscamos suas reservas.
          </p>

        </div>

      </div>

    );

  }


  // =====================================
  // ERRO
  // =====================================

  if (erro) {

    return (

      <div className="reservas-container">

        <div className="sem-reservas">

          <div className="sem-reservas-icone">
            ⚠️
          </div>

          <h2>
            Ops!
          </h2>

          <p>
            {erro}
          </p>

          <button
            className="botao-nova-reserva"
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </button>

        </div>

      </div>

    );

  }


  // =====================================
  // SEM RESERVAS
  // =====================================

  if (reservas.length === 0) {

    return (

      <div className="reservas-container">

        <div className="reservas-cabecalho">

          <div>

            <span className="reservas-etiqueta">
              MESACERTA
            </span>

            <h1>
              Minhas Reservas
            </h1>

            <p>
              Consulte e gerencie suas reservas.
            </p>

          </div>

        </div>


        <div className="sem-reservas">

          <div className="sem-reservas-icone">
            🍽️
          </div>

          <h2>
            Você ainda não possui reservas
          </h2>

          <p>
            Escolha um restaurante e faça sua
            primeira reserva pelo MesaCerta.
          </p>

          <button
            className="botao-nova-reserva"
            onClick={() => navigate("/restaurantes")}
          >
            Ver restaurantes
          </button>

        </div>

      </div>

    );

  }


  // =====================================
  // TELA PRINCIPAL
  // =====================================

  return (

    <div className="reservas-container">

      {/* =================================
          CABEÇALHO
      ================================== */}

      <div className="reservas-cabecalho">

        <div>

          <span className="reservas-etiqueta">
            MESACERTA
          </span>

          <h1>
            Minhas Reservas
          </h1>

          <p>
            Consulte e gerencie suas reservas.
          </p>

        </div>


        <button
          className="botao-nova-reserva"
          onClick={() => navigate("/restaurantes")}
        >
          + Fazer nova reserva
        </button>

      </div>


      {/* =================================
          LISTA DE RESERVAS
      ================================== */}

      <div className="lista-reservas">

        {reservas.map((reserva) => (

          <div
            className="reserva-card"
            key={reserva.id_reserva}
          >

            {/* =================================
                RESTAURANTE
            ================================== */}

            <div className="reserva-restaurante">

              <span className="restaurante-label">
                Restaurante
              </span>

              <h2>
                {reserva.nome_restaurante ||
                  "Restaurante não informado"}
              </h2>

              {reserva.tipo_cozinha && (

                <span className="restaurante-tipo">
                  {reserva.tipo_cozinha}
                </span>

              )}

            </div>


            {/* =================================
                DADOS DA RESERVA
            ================================== */}

            <div className="reserva-card__dados">

              <div className="dado-reserva">

                <div className="dado-icone">
                  📅
                </div>

                <div>

                  <strong>
                    Data
                  </strong>

                  <span>
                    {reserva.data_reserva
                      ? new Date(
                          reserva.data_reserva
                        ).toLocaleDateString("pt-BR")
                      : "Não informada"}
                  </span>

                </div>

              </div>


              <div className="dado-reserva">

                <div className="dado-icone">
                  🕐
                </div>

                <div>

                  <strong>
                    Horário
                  </strong>

                  <span>
                    {reserva.horario_reserva
                      ? reserva.horario_reserva.slice(0, 5)
                      : "Não informado"}
                  </span>

                </div>

              </div>


              <div className="dado-reserva">

                <div className="dado-icone">
                  👥
                </div>

                <div>

                  <strong>
                    Pessoas
                  </strong>

                  <span>
                    {reserva.quantidade_pessoas}{" "}
                    {Number(reserva.quantidade_pessoas) === 1
                      ? "pessoa"
                      : "pessoas"}
                  </span>

                </div>

              </div>

            </div>


            {/* =================================
                BOTÕES
            ================================== */}

            <div className="reserva-card__acoes">

              <button
                type="button"
                className="botao-editar"
                onClick={() =>
                  navigate(
                    `/editar-reserva/${reserva.id_reserva}`
                  )
                }
              >
                ✏️ Editar reserva
              </button>


              <button
                type="button"
                className="botao-cancelar"
                onClick={() =>
                  handleCancelar(
                    reserva.id_reserva
                  )
                }
              >
                ✕ Cancelar reserva
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}
