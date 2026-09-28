import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { listarRestaurantes } from "../services/api";

import "./Restaurantes.css";

export default function Restaurantes() {

  const navigate = useNavigate();

  const [restaurantes, setRestaurantes] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");


  // =====================================
  // BUSCAR RESTAURANTES
  // =====================================

  useEffect(() => {

    const carregarRestaurantes = async () => {

      try {

        setCarregando(true);
        setErro("");

        const dados = await listarRestaurantes();

        setRestaurantes(dados);

      } catch (error) {

        console.error(error);

        setErro(
          error.message ||
          "Erro ao carregar restaurantes."
        );

      } finally {

        setCarregando(false);

      }

    };

    carregarRestaurantes();

  }, []);


  // =====================================
  // FILTRAR RESTAURANTES
  // =====================================

  const restaurantesFiltrados =
    restaurantes.filter((restaurante) => {

      const texto = busca.toLowerCase();

      return (
        restaurante.nome_restaurante
          ?.toLowerCase()
          .includes(texto) ||

        restaurante.tipo_cozinha
          ?.toLowerCase()
          .includes(texto) ||

        restaurante.endereco_restaurante
          ?.toLowerCase()
          .includes(texto)
      );

    });


  // =====================================
  // IMAGEM DO RESTAURANTE
  // =====================================

  const obterImagemRestaurante = (id) => {

    return `/restaurantes/restaurante-${id}.jpg`;

  };


  // =====================================
  // CARREGANDO
  // =====================================

  if (carregando) {

    return (

      <div className="restaurantes-container">

        <div className="restaurantes-carregando">

          <div className="restaurantes-spinner"></div>

          <p>
            Carregando restaurantes...
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

      <div className="restaurantes-container">

        <div className="restaurantes-erro">

          <div className="restaurantes-erro__icone">
            !
          </div>

          <h2>
            Ops! Algo deu errado
          </h2>

          <p>
            {erro}
          </p>

          <button
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </button>

        </div>

      </div>

    );

  }


  return (

    <div className="restaurantes-container">


      {/* =================================
          CABEÇALHO
      ================================== */}

      <section className="restaurantes-header">

        <span className="restaurantes-tag">
          MESA CERTA
        </span>

        <h1>
          Encontre o restaurante
          <strong> perfeito para você</strong>
        </h1>

        <p>
          Escolha seu restaurante favorito,
          consulte as informações e reserve
          sua mesa de forma rápida e fácil.
        </p>


        {/* BUSCA */}

        <div className="restaurantes-busca">

          <span>
            🔎
          </span>

          <input
            type="text"
            placeholder="Buscar restaurante, cozinha ou endereço..."
            value={busca}
            onChange={(e) =>
              setBusca(e.target.value)
            }
          />

          {busca && (

            <button
              type="button"
              className="restaurantes-busca__limpar"
              onClick={() => setBusca("")}
            >
              ×
            </button>

          )}

        </div>

      </section>


      {/* =================================
          RESULTADOS
      ================================== */}

      <section className="restaurantes-resultados">

        <div className="restaurantes-titulo">

          <div>

            <span className="restaurantes-titulo__tag">
              NOSSAS OPÇÕES
            </span>

            <h2>
              Restaurantes disponíveis
            </h2>

          </div>

          <span className="restaurantes-titulo__quantidade">
            {restaurantesFiltrados.length} encontrados
          </span>

        </div>


        {restaurantesFiltrados.length === 0 ? (

          <div className="restaurantes-vazio">

            <span>
              🔎
            </span>

            <h2>
              Nenhum restaurante encontrado
            </h2>

            <p>
              Tente pesquisar por outro nome,
              tipo de cozinha ou endereço.
            </p>

            <button
              onClick={() => setBusca("")}
            >
              Limpar pesquisa
            </button>

          </div>

        ) : (

          <div className="restaurantes-grid">

            {restaurantesFiltrados.map(
              (restaurante) => (

                <article
                  className="restaurante-card"
                  key={restaurante.id_restaurante}
                >


                  {/* =================================
                      IMAGEM
                  ================================== */}

                  <div className="restaurante-card__imagem">

                    <img
                      src={obterImagemRestaurante(
                        restaurante.id_restaurante
                      )}
                      alt={`Foto do restaurante ${restaurante.nome_restaurante}`}
                      onError={(e) => {

                        e.currentTarget.src =
                          "/restaurantes/restaurante-padrao.jpg";

                      }}
                    />

                    <div className="restaurante-card__imagem-overlay"></div>

                  </div>


                  {/* =================================
                      CONTEÚDO
                  ================================== */}

                  <div className="restaurante-card__conteudo">

                    <h3>
                      {restaurante.nome_restaurante}
                    </h3>


                    {/* TIPO DE COZINHA */}

                    {restaurante.tipo_cozinha && (

                      <span className="restaurante-card__cozinha">
                        {restaurante.tipo_cozinha}
                      </span>

                    )}


                    {/* ENDEREÇO */}

                    {restaurante.endereco_restaurante && (

                      <p className="restaurante-card__informacao">

                        <span className="restaurante-card__informacao-icone">
                          📍
                        </span>

                        <span>
                          {restaurante.endereco_restaurante}
                        </span>

                      </p>

                    )}


                    {/* TELEFONE */}

                    {restaurante.telefone_restaurante && (

                      <p className="restaurante-card__informacao">

                        <span className="restaurante-card__informacao-icone">
                          📞
                        </span>

                        <span>
                          {restaurante.telefone_restaurante}
                        </span>

                      </p>

                    )}


                    {/* BOTÃO */}

                    <button
                      className="restaurante-card__botao"
                      onClick={() =>
                        navigate(
                          `/reservar/${restaurante.id_restaurante}`
                        )
                      }
                    >
                      <span>
                        Reservar mesa
                      </span>

                      <span className="restaurante-card__botao-seta">
                        →
                      </span>

                    </button>

                  </div>

                </article>

              )
            )}

          </div>

        )}

      </section>

    </div>

  );

}

