import express from "express";

import reservaController
    from "../controller/reservaController.js";


const router = express.Router();


// =====================================
// LISTAR TODAS AS RESERVAS
// =====================================

router.get(
    "/",
    reservaController.getAll
);


// =====================================
// LISTAR RESERVAS DE UM CLIENTE
// =====================================

router.get(
    "/cliente/:id_cliente",
    reservaController.getByCliente
);


// =====================================
// BUSCAR RESERVA POR ID
// =====================================

router.get(
    "/:id",
    reservaController.getById
);


// =====================================
// CRIAR RESERVA
// =====================================

router.post(
    "/",
    reservaController.create
);


// =====================================
// ATUALIZAR RESERVA
// =====================================

router.put(
    "/:id",
    reservaController.update
);


// =====================================
// CANCELAR RESERVA
// =====================================

router.put(
    "/:id/cancelar",
    reservaController.cancelar
);


// =====================================
// EXCLUIR RESERVA
// =====================================

router.delete(
    "/:id",
    reservaController.remove
);


export default router;
