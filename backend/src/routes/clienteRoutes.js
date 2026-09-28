import express from "express";

import clienteController from "../controller/clienteController.js";

const router = express.Router();

router.get("/teste", (req, res) => {
    res.json({
        mensagem: "Rota de clientes funcionando!"
    });
});

router.post(
  "/login",
  clienteController.login
);


router.get(
  "/",
  clienteController.getAll
);


router.get(
  "/:id",
  clienteController.getById
);


router.post(
  "/",
  clienteController.create
);


router.put(
  "/:id",
  clienteController.update
);


router.delete(
  "/:id",
  clienteController.remove
);


export default router;