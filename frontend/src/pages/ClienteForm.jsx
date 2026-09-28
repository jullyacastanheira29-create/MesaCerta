import React, { useState } from "react";
import "./ClienteForm.css";

const FORM_VAZIO = {
  nome_cliente: "",
  email_cliente: "",
  senha_cliente: ""
};

export default function ClienteForm({
  valoresIniciais = FORM_VAZIO,
  modoEdicao = false,
  salvando = false,
  erro = "",
  onSalvar,
  onCancelar,
}) {
  const [form, setForm] = useState(valoresIniciais);

  function mudar(campo, valor) {
    setForm((atual) => ({
      ...atual,
      [campo]: valor
    }));
  }

  function enviar(e) {
    e.preventDefault();
    onSalvar(form);
  }

  return (
    <div className="formulario-container">

      {!modoEdicao && (
        <div className="titulo-cadastro">
          <h1>Crie sua conta agora</h1>
          <p>
            Cadastre-se no MesaCerta e faça suas reservas
            de forma rápida e fácil.
          </p>
        </div>
      )}

      <form
        className="ficha ficha--formulario"
        onSubmit={enviar}
      >

        {erro && (
          <div className="aviso aviso--erro">
            {erro}
          </div>
        )}

        <label className="campo">
          <span>Nome</span>

          <input
            type="text"
            value={form.nome_cliente}
            onChange={(e) =>
              mudar("nome_cliente", e.target.value)
            }
            placeholder="Nome completo"
            autoFocus
          />
        </label>

        <label className="campo">
          <span>E-mail</span>

          <input
            type="email"
            value={form.email_cliente}
            onChange={(e) =>
              mudar("email_cliente", e.target.value)
            }
            placeholder="nome@exemplo.com"
          />
        </label>

        <label className="campo">
          <span>
            {modoEdicao
              ? "Nova senha (opcional)"
              : "Senha"}
          </span>

          <input
            type="password"
            value={form.senha_cliente}
            onChange={(e) =>
              mudar("senha_cliente", e.target.value)
            }
            placeholder={
              modoEdicao
                ? "Deixe em branco para manter"
                : "Senha de acesso"
            }
          />
        </label>

        <div className="ficha__acoes">

          <button
            type="submit"
            className="botao botao--primario"
            disabled={salvando}
          >
            {salvando
              ? "Salvando..."
              : modoEdicao
                ? "Salvar alterações"
                : "Criar conta"}
          </button>

          <button
            type="button"
            className="botao botao--texto"
            onClick={onCancelar}
          >
            Cancelar
          </button>

        </div>

      </form>
    </div>
  );
}