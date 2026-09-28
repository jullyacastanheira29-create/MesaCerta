import axios from "axios";


const api = axios.create({

  baseURL:
    import.meta.env?.VITE_API_URL ||
    "http://localhost:3000",

  headers: {
    "Content-Type": "application/json"
  }

});


/* =========================
   TRATAMENTO DE ERROS
========================= */

api.interceptors.response.use(

  (resposta) => resposta,

  (erro) => {

    const mensagem =
      erro.response?.data?.mensagem ||
      erro.response?.data?.message ||
      erro.message ||
      "Erro inesperado ao comunicar com o servidor.";

    return Promise.reject(
      new Error(mensagem)
    );

  }

);


/* =========================
   CLIENTES
========================= */

export async function listarClientes() {

  const { data } =
    await api.get("/api/clientes");

  return data;

}


export async function buscarClientePorId(id) {

  const { data } =
    await api.get(
      `/api/clientes/${id}`
    );

  return data;

}


export async function criarCliente(cliente) {

  const { data } =
    await api.post(
      "/api/clientes",
      cliente
    );

  return data;

}


export async function atualizarCliente(
  id,
  cliente
) {

  const { data } =
    await api.put(
      `/api/clientes/${id}`,
      cliente
    );

  return data;

}


export async function excluirCliente(id) {

  await api.delete(
    `/api/clientes/${id}`
  );

}


/* =========================
   RESERVAS
========================= */

export async function listarReservas() {

  const { data } =
    await api.get(
      "/api/reservas"
    );

  return data;

}


export async function buscarReservaPorId(id) {

  const { data } =
    await api.get(
      `/api/reservas/${id}`
    );

  return data;

}


export async function criarReserva(
  reserva
) {

  const { data } =
    await api.post(
      "/api/reservas",
      reserva
    );

  return data;

}


export async function atualizarReserva(
  id,
  reserva
) {

  const { data } =
    await api.put(
      `/api/reservas/${id}`,
      reserva
    );

  return data;

}


/* =========================
   CANCELAR RESERVA
========================= */

export async function cancelarReserva(id) {

  const { data } =
    await api.put(
      `/api/reservas/${id}/cancelar`
    );

  return data;

}


/* =========================
   EXCLUIR RESERVA
========================= */

export async function excluirReserva(id) {

  await api.delete(
    `/api/reservas/${id}`
  );

}


/* =========================
   RESERVAS POR CLIENTE
========================= */

export async function listarReservasPorCliente(
  id_cliente
) {

  const { data } =
    await api.get(
      `/api/reservas/cliente/${id_cliente}`
    );

  return data;

}


/* =========================
   LOGIN
========================= */

export const loginCliente = async ({ email_cliente, senha_cliente }) => { const { data } = await api.post( "/api/clientes/login", { email_cliente, senha_cliente } ); return data; };
// RESTAURANTES

export async function listarRestaurantes() {
  const { data } = await api.get("/api/restaurantes");
  return data;
}

export async function buscarRestaurantePorId(id) {
  const { data } = await api.get(`/api/restaurantes/${id}`);
  return data;
}

