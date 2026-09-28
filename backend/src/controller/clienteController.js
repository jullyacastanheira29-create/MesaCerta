import clienteModel from "../model/clienteModel.js";

const getAll = async (req, res) => {
    try {
        const clientes = await clienteModel.getAll();

        res.status(200).json(clientes);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao buscar clientes"
        });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;

        const cliente = await clienteModel.getById(id);

        if (!cliente) {
            return res.status(404).json({
                mensagem: "Cliente não encontrado"
            });
        }

        res.status(200).json(cliente);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao buscar cliente"
        });
    }
};

const create = async (req, res) => {
    try {
        const {
            nome_cliente,
            email_cliente,
            senha_cliente
        } = req.body;

        if (!nome_cliente || !email_cliente || !senha_cliente) {
            return res.status(400).json({
                mensagem: "Preencha todos os campos"
            });
        }

        const cliente = await clienteModel.create(
            nome_cliente,
            email_cliente,
            senha_cliente
        );

        res.status(201).json(cliente);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao cadastrar cliente"
        });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            nome_cliente,
            email_cliente,
            senha_cliente
        } = req.body;

        const cliente = await clienteModel.update(
            id,
            nome_cliente,
            email_cliente,
            senha_cliente
        );

        if (!cliente) {
            return res.status(404).json({
                mensagem: "Cliente não encontrado"
            });
        }

        res.status(200).json(cliente);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao atualizar cliente"
        });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;

        const cliente = await clienteModel.remove(id);

        if (!cliente) {
            return res.status(404).json({
                mensagem: "Cliente não encontrado"
            });
        }

        res.status(200).json({
            mensagem: "Cliente excluído com sucesso",
            cliente
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao excluir cliente"
        });
    }
};

const login = async (req, res) => {
    try {
        const {
            email_cliente,
            senha_cliente
        } = req.body;

        if (!email_cliente || !senha_cliente) {
            return res.status(400).json({
                mensagem: "Informe o e-mail e a senha"
            });
        }

        const cliente = await clienteModel.login(
            email_cliente,
            senha_cliente
        );

        if (!cliente) {
            return res.status(401).json({
                mensagem: "E-mail ou senha incorretos"
            });
        }

        res.status(200).json({
            mensagem: "Login realizado com sucesso",
            cliente
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao realizar login"
        });
    }
};

export default {
    getAll,
    getById,
    create,
    update,
    remove,
    login
};