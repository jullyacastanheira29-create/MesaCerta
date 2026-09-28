import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate
} from "react-router-dom";

import {
  obterClienteLogado,
  sair
} from "./services/auth";

// ==============================
// PÁGINAS
// ==============================

import Home from "./pages/Home";
import Login from "./pages/Login";
import ListaClientes from "./pages/ListaClientes";
import NovoCliente from "./pages/NovoCliente";
import EditarCliente from "./pages/EditarCliente";
import MinhasReservas from "./pages/MinhasReservas";
import EditarReserva from "./pages/EditarReserva";
import Restaurantes from "./pages/Restaurantes";
import ReservarMesa from "./pages/ReservarMesa";
import Perfil from "./pages/Perfil";
import EditarPerfil from "./pages/EditarPerfil";

import "./App.css";

export default function App() {

  // =====================================
  // VERIFICAR CLIENTE LOGADO
  // =====================================

  const cliente = obterClienteLogado();

  return (
    <BrowserRouter>

      <div className="mesa-certa">

        {/* =====================================
            NAVBAR
        ====================================== */}

        <header className="mesa-certa__header">

          {/* =====================================
              LOGO
          ====================================== */}

          <div className="mesa-certa__logo">

            {/* IMAGEM DA LOGO */}
            <img
              src="/logo.png"
              alt="Logo MesaCerta"
              className="mesa-certa__logo-imagem"
            />

            {/* NOME DO SITE */}
            <div className="mesa-certa__logo-texto">

              <h1>
                MesaCerta
              </h1>

              <span>
                Reserve sua mesa com facilidade
              </span>

            </div>

          </div>

          {/* =====================================
              MENU
          ====================================== */}

          <nav className="mesa-certa__nav">

            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "mesa-certa__link mesa-certa__link--ativo"
                  : "mesa-certa__link"
              }
            >
              Início
            </NavLink>

            <NavLink
              to="/restaurantes"
              className={({ isActive }) =>
                isActive
                  ? "mesa-certa__link mesa-certa__link--ativo"
                  : "mesa-certa__link"
              }
            >
              Restaurantes
            </NavLink>

            <NavLink
              to="/minhas-reservas"
              className={({ isActive }) =>
                isActive
                  ? "mesa-certa__link mesa-certa__link--ativo"
                  : "mesa-certa__link"
              }
            >
              Minhas reservas
            </NavLink>

          </nav>

          {/* =====================================
              PERFIL
          ====================================== */}

          <div className="mesa-certa__perfil">

            {cliente ? (

              <>

                {/* LINK DO PERFIL */}

                <NavLink
                  to="/perfil"
                  className="mesa-certa__perfil-link"
                >

                <img
                  src="/perfil.png"
                  alt="Perfil"
                  className="mesa-certa__perfil-icone"
                />

                  <span className="mesa-certa__perfil-nome">
                    {cliente.nome_cliente}
                  </span>

                </NavLink>

                {/* BOTÃO SAIR */}

                <button
                  type="button"
                  className="mesa-certa__sair"
                  onClick={sair}
                >
                  Sair
                </button>

              </>

            ) : (

              <NavLink
  to="/login"
  className="mesa-certa__perfil-link"
>
  <img
    src="/perfil.png"
    alt="Entrar"
    className="mesa-certa__perfil-icone"
  />

  <span className="mesa-certa__perfil-nome">
    Entrar
  </span>
</NavLink>

            )}

          </div>

        </header>

        {/* =====================================
            CONTEÚDO
        ====================================== */}

        <main className="mesa-certa__conteudo">

          <Routes>

            {/* HOME */}

            <Route
              path="/"
              element={<Home />}
            />

            {/* LOGIN */}

            <Route
              path="/login"
              element={<Login />}
            />

            {/* CLIENTES */}

            <Route
              path="/clientes"
              element={<ListaClientes />}
            />

            {/* NOVO CLIENTE */}

            <Route
              path="/novo"
              element={<NovoCliente />}
            />

            {/* EDITAR CLIENTE */}

            <Route
              path="/editar/:id"
              element={<EditarCliente />}
            />

            {/* RESTAURANTES */}

            <Route
              path="/restaurantes"
              element={
                cliente
                  ? <Restaurantes />
                  : <Navigate to="/login" />
              }
            />

            {/* RESERVAR MESA */}

            <Route
              path="/reservar/:id_restaurante"
              element={
                cliente
                  ? <ReservarMesa />
                  : <Navigate to="/login" />
              }
            />

            {/* MINHAS RESERVAS */}

            <Route
              path="/minhas-reservas"
              element={
                cliente
                  ? <MinhasReservas />
                  : <Navigate to="/login" />
              }
            />

            {/* EDITAR RESERVA */}

            <Route
              path="/editar-reserva/:id"
              element={
                cliente
                  ? <EditarReserva />
                  : <Navigate to="/login" />
              }
            />

            {/* PERFIL */}

            <Route
              path="/perfil"
              element={
                cliente
                  ? <Perfil />
                  : <Navigate to="/login" />
              }
            />

            {/* ROTA INEXISTENTE */}

            <Route
              path="*"
              element={<Navigate to="/" />}
            />

            <Route
  path="/editar-perfil"
  element={<EditarPerfil />}
/>

          </Routes>

        </main>

        {/* =====================================
            RODAPÉ
        ====================================== */}

        <footer className="mesa-certa__footer">

          <div>

            <strong>
              MesaCerta
            </strong>

            <p>
              Sua mesa reservada,
              sem filas e sem complicação.
            </p>

          </div>

          <span>
            © 2026 MesaCerta
          </span>

        </footer>

      </div>

    </BrowserRouter>
  );
}

