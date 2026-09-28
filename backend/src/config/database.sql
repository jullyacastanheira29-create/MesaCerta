CREATE TABLE pessoa (
    idPessoa SERIAL NOT NULL PRIMARY KEY,
    nomePessoa VARCHAR NOT NULL,
    emailPessoa VARCHAR NOT NULL UNIQUE,
    senhaPessoa VARCHAR NOT NULL,
    dataCadastro DATE NOT NULL
);

CREATE TABLE restaurante (
    idRestaurante SERIAL NOT NULL PRIMARY KEY,
    nomeRestaurante VARCHAR NOT NULL UNIQUE,
    cnpjRestaurante VARCHAR NOT NULL UNIQUE,
    telefoneRestaurante VARCHAR NOT NULL,
    enderecoRestaurante VARCHAR NOT NULL,
    horarioAbertura TIME NOT NULL,
    horarioFechamento TIME NOT NULL
);

CREATE TABLE mesa (
    idMesa SERIAL NOT NULL PRIMARY KEY,
    numeroMesa VARCHAR NOT NULL,
    capacidadeMesa INT NOT NULL,
    statusReserva VARCHAR NOT NULL
);

CREATE TABLE cliente (
    idCliente SERIAL NOT NULL PRIMARY KEY,
    idPessoa INT NOT NULL UNIQUE REFERENCES pessoa(idPessoa)
);

CREATE TABLE proprietario (
    idProprietaio SERIAL NOT NULL PRIMARY KEY,
    idRestaurante INT NOT NULL REFERENCES restaurante(idRestaurante),
    idPessoa INT NOT NULL UNIQUE REFERENCES pessoa(idPessoa)
);

CREATE TABLE reserva (
    idReserva SERIAL NOT NULL PRIMARY KEY,
    idRestaurante INT NOT NULL REFERENCES restaurante(idRestaurante),
    idMesa INT NOT NULL REFERENCES mesa(idMesa),
    dataReserva DATE NOT NULL,
    horarioReserva TIME NOT NULL,
    quantidadePessoasReserva INT NOT NULL,
    statusReserva VARCHAR NOT NULL,
    codigoReserva VARCHAR NOT NULL
);