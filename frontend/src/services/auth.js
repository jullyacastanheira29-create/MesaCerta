export function obterClienteLogado() {

  const cliente = localStorage.getItem("cliente");

  if (!cliente) {
    return null;
  }

  try {

    return JSON.parse(cliente);

  } catch (error) {

    console.error(
      "Erro ao ler cliente:",
      error
    );

    localStorage.removeItem("cliente");

    return null;
  }
}


export function salvarClienteLogado(cliente) {

  localStorage.setItem(
    "cliente",
    JSON.stringify(cliente)
  );

}


export function sair() {

  localStorage.removeItem("cliente");

  window.location.href = "/";

}

