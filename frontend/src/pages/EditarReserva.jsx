import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  buscarReservaPorId,
  atualizarReserva
} from "../services/api";

import { obterClienteLogado } from "../services/auth";

import "./EditarReserva.css";

export default function EditarReserva() {

  const navigate = useNavigate();
  const { id } = useParams();

  const cliente = obterClienteLogado();

  // =====================================
  // RESERVA
  // =====================================

  const [reserva, setReserva] = useState({
    id_cliente: "",
    id_restaurante: "",
    data_reserva: "",
    horario_reserva: "",
    quantidade_pessoas: ""
  });

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  // =====================================
  // BUSCAR RESERVA
  // =====================================

  useEffect(() => {

    const carregarReserva = async () => {

      try {

        setCarregando(true);
        setErro("");

        const dados = await buscarReservaPorId(id);

        // =====================================
        // VERIFICAR SE A RESERVA PERTENCE AO CLIENTE
        // =====================================

        if (
          !dados ||
          Number(dados.id_cliente) !== Number(cliente?.id_cliente)
        ) {

          setErro("Você não pode editar esta reserva.");

          return;
        }

        // =====================================
        // PREENCHER FORMULÁRIO
        // =====================================

        setReserva({
          id_cliente: dados.id_cliente,
          id_restaurante: dados.id_restaurante,

          data_reserva: dados.data_reserva
            ? dados.data_reserva.split("T")[0]
            : "",

          horario_reserva: dados.horario_reserva
            ? dados.horario_reserva.slice(0, 5)
            : "",

          quantidade_pessoas: dados.quantidade_pessoas
        });

      } catch (error) {

        console.error(error);

        setErro(
          error.message || "Erro ao carregar a reserva."
        );

      } finally {

        setCarregando(false);

      }

    };

    if (id && cliente) {

      carregarReserva();

    } else {

      setCarregando(false);

    }

  }, [id]);

  // =====================================
  // ALTERAR CAMPOS
  // =====================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setReserva((reservaAtual) => ({
      ...reservaAtual,
      [name]: value
    }));

  };

  // =====================================
  // SALVAR ALTERAÇÕES
  // =====================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setErro("");
    setSalvando(true);

    try {

      await atualizarReserva(id, {

        id_cliente: Number(reserva.id_cliente),

        id_restaurante: Number(reserva.id_restaurante),

        data_reserva: reserva.data_reserva,

        horario_reserva: reserva.horario_reserva,

        quantidade_pessoas: Number(
          reserva.quantidade_pessoas
        )

      });

      alert("Reserva atualizada com sucesso!");

      navigate("/minhas-reservas");

    } catch (error) {

      console.error(error);

      setErro(
        error.message || "Erro ao atualizar reserva."
      );

    } finally {

      setSalvando(false);

    }

  };

  // =====================================
  // SEM LOGIN
  // =====================================

  if (!cliente) {

    return (

      <div className="editar-reserva-container">

        <div className="editar-reserva-card">

          <h1>Faça login primeiro</h1>

          <p>
            Para editar uma reserva, você precisa estar conectado.
          </p>

          <button
            className="botao-voltar"
            onClick={() => navigate("/login")}
          >
            Ir para o login
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

      <div className="editar-reserva-container">

        <div className="editar-reserva-card">

          <h1>Carregando...</h1>

          <p>
            Estamos buscando sua reserva.
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

      <div className="editar-reserva-container">

        <div className="editar-reserva-card">

          <h1>Ops!</h1>

          <p className="editar-erro">
            {erro}
          </p>

          <button
            className="botao-voltar"
            onClick={() => navigate("/minhas-reservas")}
          >
            Voltar para minhas reservas
          </button>

        </div>

      </div>

    );

  }

  // =====================================
  // FORMULÁRIO
  // =====================================

  return (

    <div className="editar-reserva-container">

      <div className="editar-reserva-card">

        {/* =================================
            TOPO
        ================================== */}

        <div className="editar-reserva-topo">

          <span className="editar-etiqueta">
            MESACERTA
          </span>

          <h1>
            Editar Reserva
          </h1>

          <p>
            Altere os dados da sua reserva.
          </p>

        </div>

        {/* =================================
            FORMULÁRIO
        ================================== */}

        <form onSubmit={handleSubmit}>

          {/* =================================
              DATA
          ================================== */}

          <div className="campo">

            <label>
              Data da reserva
            </label>

            <input
              type="date"
              name="data_reserva"
              value={reserva.data_reserva}
              onChange={handleChange}
              required
            />

          </div>

          {/* =================================
              HORÁRIO
          ================================== */}

          <div className="campo">

            <label>
              Horário
            </label>

            <input
              type="time"
              name="horario_reserva"
              value={reserva.horario_reserva}
              onChange={handleChange}
              required
            />

          </div>

          {/* =================================
              QUANTIDADE DE PESSOAS
          ================================== */}

          <div className="campo">

            <label>
              Quantidade de pessoas
            </label>

            <input
              type="number"
              name="quantidade_pessoas"
              min="1"
              value={reserva.quantidade_pessoas}
              onChange={handleChange}
              required
            />

          </div>

          {/* =================================
              BOTÕES
          ================================== */}

          <div className="editar-reserva-acoes">

            <button
              type="button"
              className="botao-voltar"
              onClick={() => navigate("/minhas-reservas")}
            >
              ← Voltar
            </button>

            <button
              type="submit"
              className="botao-salvar"
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

