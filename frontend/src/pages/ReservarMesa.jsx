import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  buscarRestaurantePorId,
  criarReserva
} from "../services/api";

import { obterClienteLogado } from "../services/auth";

import "./ReservarMesa.css";


export default function ReservarMesa() {

  const { id_restaurante } = useParams();
  const navigate = useNavigate();

  const cliente = obterClienteLogado();

  const [restaurante, setRestaurante] = useState(null);

  const [dataReserva, setDataReserva] = useState("");
  const [horarioReserva, setHorarioReserva] = useState("");
  const [quantidadePessoas, setQuantidadePessoas] = useState(2);

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");


  // =====================================
  // BUSCAR RESTAURANTE
  // =====================================

  useEffect(() => {

    const carregarRestaurante = async () => {

      try {

        setCarregando(true);
        setErro("");

        const dados =
          await buscarRestaurantePorId(id_restaurante);

        setRestaurante(dados);

      } catch (error) {

        console.error(error);

        setErro(
          error.message ||
          "Erro ao carregar restaurante."
        );

      } finally {

        setCarregando(false);

      }

    };

    carregarRestaurante();

  }, [id_restaurante]);


  // =====================================
  // CONFIRMAR RESERVA
  // =====================================

  const handleReservar = async (e) => {

    e.preventDefault();

    setErro("");


    // Verifica cliente logado

    if (!cliente) {

      navigate("/login");

      return;

    }


    // Validação

    if (
      !dataReserva ||
      !horarioReserva ||
      !quantidadePessoas
    ) {

      setErro(
        "Preencha todos os campos da reserva."
      );

      return;

    }


    try {

      setSalvando(true);


      const id_cliente =
        cliente.id_cliente;


      await criarReserva({

        id_cliente,

        id_restaurante,

        data_reserva: dataReserva,

        horario_reserva: horarioReserva,

        quantidade_pessoas:
          quantidadePessoas,

        status_reserva: "Pendente"

      });


      // Depois de reservar,
      // vai para Minhas Reservas

      navigate("/minhas-reservas");

    } catch (error) {

      console.error(error);

      setErro(
        error.message ||
        "Erro ao realizar reserva."
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

      <div className="reservar-container">

        <div className="reservar-carregando">

          <span>🍽️</span>

          <p>
            Carregando restaurante...
          </p>

        </div>

      </div>

    );

  }


  // =====================================
  // ERRO
  // =====================================

  if (erro && !restaurante) {

    return (

      <div className="reservar-container">

        <div className="reservar-erro">

          <h2>
            Ops! 😕
          </h2>

          <p>
            {erro}
          </p>

          <button
            onClick={() =>
              navigate("/restaurantes")
            }
          >
            Voltar para restaurantes
          </button>

        </div>

      </div>

    );

  }


  // =====================================
  // TELA DE RESERVA
  // =====================================

  return (

    <div className="reservar-container">


      <div className="reservar-card">


        {/* VOLTAR */}

        <button
          className="reservar-voltar"
          onClick={() =>
            navigate("/restaurantes")
          }
        >
          ← Voltar para restaurantes
        </button>


        {/* RESTAURANTE */}

        <div className="reservar-restaurante">

          <div className="reservar-restaurante__icone">
            🍽️
          </div>

          <div>

            <span>
              Você está reservando em
            </span>

            <h1>
              {restaurante?.nome_restaurante}
            </h1>

            <p>
              {restaurante?.tipo_cozinha}
            </p>

            <small>
              📍 {restaurante?.endereco_restaurante}
            </small>

          </div>

        </div>


        <div className="reservar-divisor"></div>


        {/* TÍTULO */}

        <div className="reservar-titulo">

          <span>
            MESA CERTA
          </span>

          <h2>
            Reserve sua mesa
          </h2>

          <p>
            Escolha a data, o horário e a quantidade
            de pessoas para sua reserva.
          </p>

        </div>


        {/* ERRO */}

        {erro && (

          <div className="reservar-mensagem-erro">
            {erro}
          </div>

        )}


        {/* FORMULÁRIO */}

        <form
          className="reservar-form"
          onSubmit={handleReservar}
        >


          {/* DATA */}

          <div className="reservar-campo">

            <label>
              Data da reserva
            </label>

            <input
              type="date"
              value={dataReserva}
              min={
                new Date()
                  .toISOString()
                  .split("T")[0]
              }
              onChange={(e) =>
                setDataReserva(e.target.value)
              }
            />

          </div>


          {/* HORÁRIO */}

          <div className="reservar-campo">

            <label>
              Horário
            </label>

            <input
              type="time"
              value={horarioReserva}
              onChange={(e) =>
                setHorarioReserva(e.target.value)
              }
            />

          </div>


          {/* QUANTIDADE */}

          <div className="reservar-campo">

            <label>
              Quantidade de pessoas
            </label>

            <input
              type="number"
              min="1"
              max="20"
              value={quantidadePessoas}
              onChange={(e) =>
                setQuantidadePessoas(
                  Number(e.target.value)
                )
              }
            />

          </div>


          {/* BOTÃO */}

          <button
            type="submit"
            className="reservar-botao"
            disabled={salvando}
          >

            {salvando
              ? "Realizando reserva..."
              : "Confirmar reserva →"
            }

          </button>


        </form>


      </div>

    </div>

  );

}

