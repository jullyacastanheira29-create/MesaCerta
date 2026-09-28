import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="home">

      {/* =========================
          HERO PRINCIPAL
      ========================== */}

      <section className="home__hero">

        <div className="home__hero-conteudo">

          <div className="home__marca">
            <span className="home__marca-linha"></span>
            <span>MESA CERTA</span>
          </div>

          <h1>
            O seu momento
            <br />
            começa <span>aqui.</span>
          </h1>

          <p>
            Encontre restaurantes, escolha o melhor horário
            e reserve sua mesa com praticidade, rapidez
            e tranquilidade.
          </p>

          <div className="home__hero-acoes">

            <button
              className="home__botao home__botao--principal"
              onClick={() => navigate("/restaurantes")}
            >
              Encontrar restaurante
              <span>→</span>
            </button>

            <button
              className="home__botao home__botao--link"
              onClick={() => navigate("/minhas-reservas")}
            >
              Consultar minhas reservas
              <span>↗</span>
            </button>

          </div>

        </div>


        <div className="home__hero-lateral">

          <div className="home__frase-lateral">
            <span>UMA NOVA FORMA DE RESERVAR</span>

            <p>
              Mais organização para o restaurante.
              Mais tranquilidade para você.
            </p>
          </div>


          <div className="home__numeros">

            <div className="home__numero-item">
              <strong>01</strong>

              <div>
                <h3>Escolha</h3>
                <p>Encontre o restaurante ideal.</p>
              </div>
            </div>


            <div className="home__numero-item">
              <strong>02</strong>

              <div>
                <h3>Reserve</h3>
                <p>Defina data, horário e pessoas.</p>
              </div>
            </div>


            <div className="home__numero-item">
              <strong>03</strong>

              <div>
                <h3>Aproveite</h3>
                <p>Chegue preparado para seu momento.</p>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* =========================
          FRASE DE DESTAQUE
      ========================== */}

      <section className="home__destaque">

        <div className="home__destaque-numero">
          01
        </div>

        <div className="home__destaque-texto">

          <span>POR QUE USAR O MESACERTA?</span>

          <h2>
            Menos espera.
            <br />
            Mais tempo para aproveitar.
          </h2>

        </div>

        <p>
          O MesaCerta foi pensado para tornar a experiência
          de ir a um restaurante mais simples, evitando filas,
          atrasos e situações de espera desnecessárias.
        </p>

      </section>


      {/* =========================
          BENEFÍCIOS
      ========================== */}

      <section className="home__beneficios">

        <article className="home__beneficio">

          <span className="home__beneficio-numero">
            01
          </span>

          <div>
            <h3>Evite filas</h3>

            <p>
              Faça sua reserva antes de sair de casa
              e reduza o tempo de espera.
            </p>
          </div>

        </article>


        <article className="home__beneficio">

          <span className="home__beneficio-numero">
            02
          </span>

          <div>
            <h3>Tenha praticidade</h3>

            <p>
              Escolha as informações da reserva
              em poucos passos.
            </p>
          </div>

        </article>


        <article className="home__beneficio">

          <span className="home__beneficio-numero">
            03
          </span>

          <div>
            <h3>Organize seu momento</h3>

            <p>
              Planeje sua visita e aproveite melhor
              o tempo com quem você gosta.
            </p>
          </div>

        </article>

      </section>


      {/* =========================
          COMO FUNCIONA
      ========================== */}

      <section className="home__funcionamento">

        <div className="home__secao-cabecalho">

          <div>
            <span>COMO FUNCIONA</span>

            <h2>
              Uma experiência
              <br />
              simples do início ao fim.
            </h2>
          </div>

          <p>
            Com o MesaCerta, você realiza sua reserva
            de forma rápida e acompanha suas informações
            em um só lugar.
          </p>

        </div>


        <div className="home__etapas">

          <div className="home__etapa">

            <div className="home__etapa-topo">
              <span>01</span>
              <span className="home__etapa-seta">↗</span>
            </div>

            <h3>
              Encontre um restaurante
            </h3>

            <p>
              Consulte os restaurantes disponíveis
              e escolha o que mais combina com você.
            </p>

          </div>


          <div className="home__etapa">

            <div className="home__etapa-topo">
              <span>02</span>
              <span className="home__etapa-seta">↗</span>
            </div>

            <h3>
              Faça sua reserva
            </h3>

            <p>
              Informe a data, o horário e a quantidade
              de pessoas para sua reserva.
            </p>

          </div>


          <div className="home__etapa">

            <div className="home__etapa-topo">
              <span>03</span>
              <span className="home__etapa-seta">↗</span>
            </div>

            <h3>
              Aproveite o momento
            </h3>

            <p>
              Consulte suas reservas e vá ao restaurante
              com mais tranquilidade.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          CHAMADA FINAL
      ========================== */}

      <section className="home__final">

        <div className="home__final-texto">

          <span>MESA CERTA</span>

          <h2>
            Sua mesa.
            <br />
            Seu momento.
          </h2>

          <p>
            Comece agora a planejar sua próxima experiência.
          </p>

        </div>


        <button
          className="home__final-botao"
          onClick={() => navigate("/restaurantes")}
        >
          Fazer uma reserva
          <span>→</span>
        </button>

      </section>

    </main>
  );
}