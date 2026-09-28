import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import clienteRoutes from "./routes/clienteRoutes.js";
import reservaRoutes from "./routes/reservaRoutes.js";
import restauranteRoutes from "./routes/restauranteRoutes.js";

import pool from "./config/db.js";

dotenv.config();

const app = express();

// =========================
// MIDDLEWARES
// =========================

app.use(cors());
app.use(express.json());

// =========================
// TESTE DA API
// =========================

app.get("/", (req, res) => {
    res.status(200).json({
        mensagem: "API MesaCerta funcionando!"
    });
});

// =========================
// TESTE DO BANCO DE DADOS
// =========================

app.get("/teste-banco", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.status(200).json({
            mensagem: "Banco de dados conectado!",
            horario: result.rows[0].now
        });

    } catch (error) {
        console.error("Erro ao conectar com o banco:", error);

        res.status(500).json({
            erro: "Erro ao conectar com o banco de dados."
        });
    }
});

// =========================
// ROTAS DA API
// =========================

app.use("/api/clientes", clienteRoutes);
app.use("/api/reservas", reservaRoutes);
app.use("/api/restaurantes", restauranteRoutes);

// =========================
// TRATAMENTO DE ROTAS 404
// =========================

app.use((req, res) => {
    console.log(`Rota não encontrada: ${req.method} ${req.originalUrl}`);

    res.status(404).json({
        erro: "Rota não encontrada",
        metodo: req.method,
        rota: req.originalUrl
    });
});

// =========================
// TRATAMENTO DE ERROS
// =========================

app.use((err, req, res, next) => {
    console.error("ERRO NO SERVIDOR:", err);

    res.status(500).json({
        erro: "Erro interno do servidor."
    });
});

// =========================
// INICIAR SERVIDOR
// =========================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});