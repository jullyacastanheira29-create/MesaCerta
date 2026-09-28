import reservaModel from "../model/reservaModel.js";


/* =========================
   LISTAR TODAS AS RESERVAS
   ========================= */

const getAll = async (req, res) => {

    try {

        const reservas =
            await reservaModel.getAll();

        res.status(200).json(reservas);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao buscar reservas"
        });

    }
};


/* =========================
   BUSCAR RESERVA POR ID
   ========================= */

const getById = async (req, res) => {

    try {

        const { id } = req.params;

        const reserva =
            await reservaModel.getById(id);

        if (!reserva) {

            return res.status(404).json({
                mensagem: "Reserva não encontrada"
            });

        }

        res.status(200).json(reserva);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao buscar reserva"
        });

    }
};


/* =========================
   RESERVAS DO CLIENTE
   ========================= */

const getByCliente = async (req, res) => {

    try {

        const { id_cliente } = req.params;

        console.log(
            "Buscando reservas do cliente:",
            id_cliente
        );

        const reservas =
            await reservaModel.getByCliente(
                id_cliente
            );

        res.status(200).json(reservas);

    } catch (error) {

        console.error(
            "ERRO AO BUSCAR RESERVAS:",
            error
        );

        res.status(500).json({

            mensagem:
                "Erro ao buscar reservas do cliente",

            erro: error.message

        });

    }
};


/* =========================
   CRIAR RESERVA
   ========================= */

const create = async (req, res) => {

    try {

        const {

            id_cliente,

            id_restaurante,

            data_reserva,

            horario_reserva,

            quantidade_pessoas,

            status_reserva

        } = req.body;


        /* =========================
           VALIDAR CAMPOS
           ========================= */

        if (
            !id_cliente ||
            !id_restaurante ||
            !data_reserva ||
            !horario_reserva ||
            !quantidade_pessoas
        ) {

            return res.status(400).json({

                mensagem:
                    "Preencha todos os campos obrigatórios"

            });

        }


        /* =========================
           CRIAR RESERVA
           ========================= */

        const reserva =
            await reservaModel.create(

                id_cliente,

                id_restaurante,

                data_reserva,

                horario_reserva,

                quantidade_pessoas,

                status_reserva

            );


        res.status(201).json(reserva);

    } catch (error) {

        console.error(error);

        res.status(500).json({

            mensagem:
                "Erro ao cadastrar reserva",

            erro:
                error.message

        });

    }
};


/* =========================
   ATUALIZAR RESERVA
   ========================= */

const update = async (req, res) => {

    try {

        const { id } = req.params;


        const {

            id_cliente,

            id_restaurante,

            data_reserva,

            horario_reserva,

            quantidade_pessoas,

            status_reserva

        } = req.body;


        if (
            !id_cliente ||
            !id_restaurante ||
            !data_reserva ||
            !horario_reserva ||
            !quantidade_pessoas ||
            !status_reserva
        ) {

            return res.status(400).json({

                mensagem:
                    "Preencha todos os campos"

            });

        }


        const reserva =
            await reservaModel.update(

                id,

                id_cliente,

                id_restaurante,

                data_reserva,

                horario_reserva,

                quantidade_pessoas,

                status_reserva

            );


        if (!reserva) {

            return res.status(404).json({

                mensagem:
                    "Reserva não encontrada"

            });

        }


        res.status(200).json(reserva);

    } catch (error) {

        console.error(error);

        res.status(500).json({

            mensagem:
                "Erro ao atualizar reserva",

            erro:
                error.message

        });

    }
};


/* =========================
   CANCELAR RESERVA
   ========================= */

const cancelar = async (req, res) => {

    try {

        const { id } = req.params;


        const reserva =
            await reservaModel.cancelar(id);


        if (!reserva) {

            return res.status(404).json({

                mensagem:
                    "Reserva não encontrada"

            });

        }


        res.status(200).json({

            mensagem:
                "Reserva cancelada com sucesso",

            reserva

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            mensagem:
                "Erro ao cancelar reserva",

            erro:
                error.message

        });

    }
};


/* =========================
   EXCLUIR RESERVA
   ========================= */

const remove = async (req, res) => {

    try {

        const { id } = req.params;


        const reserva =
            await reservaModel.remove(id);


        if (!reserva) {

            return res.status(404).json({

                mensagem:
                    "Reserva não encontrada"

            });

        }


        res.status(200).json({

            mensagem:
                "Reserva excluída com sucesso",

            reserva

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            mensagem:
                "Erro ao excluir reserva",

            erro:
                error.message

        });

    }
};


export default {

    getAll,
    getById,
    getByCliente,
    create,
    update,
    cancelar,
    remove

};

