import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { listarClientes, atualizarCliente } from "../services/api";
import ClienteForm from "./ClienteForm";
import "./EditarCliente.css";

export default function EditarCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregar();
  }, [id]);

  async function carregar() {
    setCarregando(true);
    setErro("");
    try {
      // Se seu backend tiver GET /api/clientes/:id, troque por essa chamada direta.
      const todos = await listarClientes();
      const encontrado = (todos ?? []).find((c) => String(c.id_cliente) === String(id));
      if (!encontrado) {
        setErro("Cliente não encontrado.");
      } else {
        setCliente(encontrado);
      }
    } catch (e) {
      setErro("Não foi possível carregar o cliente. " + e.message);
    } finally {
      setCarregando(false);
    }
  }

  async function salvar(form) {
    if (!form.nome_cliente.trim() || !form.email_cliente.trim()) {
      setErro("Preencha ao menos nome e e-mail.");
      return;
    }

    setSalvando(true);
    setErro("");
    try {
      const payload = { ...form };
      if (!payload.senha_cliente.trim()) delete payload.senha_cliente;
      await atualizarCliente(id, payload);
      navigate("/");
    } catch (e) {
      setErro("Não foi possível salvar as alterações. " + e.message);
      setSalvando(false);
    }
  }

  if (carregando) {
    return <p className="catalogo__estado">Abrindo a ficha...</p>;
  }

  if (erro && !cliente) {
    return (
      <div className="aviso aviso--erro">
        {erro} <Link to="/">Voltar para a lista</Link>
      </div>
    );
  }

  return (
    <div className="catalogo__pagina catalogo__pagina--formulario">
      <ClienteForm
        modoEdicao
        valoresIniciais={{
          nome_cliente: cliente.nome_cliente ?? "",
          email_cliente: cliente.email_cliente ?? "",
          senha_cliente: "",
        }}
        salvando={salvando}
        erro={erro}
        onSalvar={salvar}
        onCancelar={() => navigate("/")}
      />
    </div>
  );
}
