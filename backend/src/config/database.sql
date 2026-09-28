CREATE TABLE pessoa (
    idPessoa serial not null primary key,
    nomePessoa varchar not null,
    emailPessoa varchar not null unique,
    senhaPessoa varchar not null,
    dataCadastro date not null
);

CREATE TABLE cliente (
    idCliente serial not null primary key,
    idPessoa int not null unique references pessoa(idPessoa)
);

CREATE TABLE proprietario (
    idProprietaio serial not null primary key,
    idRestaurante int not null references restaurante(idRestaurante),
    idPessoa int not null unique references pessoa(idPessoa)
);

CREATE TABLE restaurante (
    idrestaurante serial not null primary key,
    nomeRestaurante varchar not null unique,
    cnpjRestaurante varchar not null unique,
    telefoneRestaurante varchar not null,
    enderecoRestaurante varchar not null,
    horarioAbertura time not null,
    horarioFechamento time not null
);

CREATE TABLE reserva (
    idReserva serial not null primary key,
    idRestaurante int not null references restaurante(idRestaurante),
    idMesa int not null references mesa(idMesa),
    dataReserva date not null,
    horarioReserva time not null,
    quantidadePessoasReserva int not null,
    statusReserva varchar not null,
    codigoReserva varchar not null
);

CREATE TABLE mesa (
    idMesa serial not null primary key,
    numeroMesa varchar not null,
    capacidadeMesa int not null,
    statusReserva varchar not null
);