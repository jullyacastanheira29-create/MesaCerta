import restauranteModel from "../model/restauranteModel.js";


// ============================
// LISTAR
// ============================

const getAll = async (req, res) => {

    try {

        const restaurantes =
            await restauranteModel.getAll();

        res.status(200).json(restaurantes);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao buscar restaurantes"
        });

    }
};


// ============================
// BUSCAR POR ID
// ============================

const getById = async (req, res) => {

    try {

        const { id } = req.params;

        const restaurante =
            await restauranteModel.getById(id);

        if (!restaurante) {

            return res.status(404).json({
                mensagem: "Restaurante não encontrado"
            });

        }

        res.status(200).json(restaurante);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao buscar restaurante"
        });

    }
};


// ============================
// CRIAR
// ============================

const create = async (req, res) => {

    try {

        const {
            nome_restaurante,
            endereco_restaurante,
            telefone_restaurante,
            tipo_cozinha,
            avaliacao
        } = req.body;


        if (
            !nome_restaurante ||
            !endereco_restaurante ||
            !tipo_cozinha
        ) {

            return res.status(400).json({
                mensagem: "Preencha os campos obrigatórios"
            });

        }


        const restaurante =
            await restauranteModel.create(
                nome_restaurante,
                endereco_restaurante,
                telefone_restaurante,
                tipo_cozinha,
                avaliacao || 5.0
            );


        res.status(201).json(restaurante);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao cadastrar restaurante"
        });

    }
};


// ============================
// ATUALIZAR
// ============================

const update = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            nome_restaurante,
            endereco_restaurante,
            telefone_restaurante,
            tipo_cozinha,
            avaliacao
        } = req.body;


        if (
            !nome_restaurante ||
            !endereco_restaurante ||
            !tipo_cozinha ||
            avaliacao === undefined
        ) {

            return res.status(400).json({
                mensagem: "Preencha todos os campos"
            });

        }


        const restaurante =
            await restauranteModel.update(
                id,
                nome_restaurante,
                endereco_restaurante,
                telefone_restaurante,
                tipo_cozinha,
                avaliacao
            );


        if (!restaurante) {

            return res.status(404).json({
                mensagem: "Restaurante não encontrado"
            });

        }


        res.status(200).json(restaurante);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao atualizar restaurante"
        });

    }
};


// ============================
// EXCLUIR
// ============================

const remove = async (req, res) => {

    try {

        const { id } = req.params;

        const restaurante =
            await restauranteModel.remove(id);


        if (!restaurante) {

            return res.status(404).json({
                mensagem: "Restaurante não encontrado"
            });

        }


        res.status(200).json({
            mensagem: "Restaurante excluído com sucesso",
            restaurante
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao excluir restaurante"
        });

    }
};


export default {
    getAll,
    getById,
    create,
    update,
    remove
};

