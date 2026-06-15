const express = require("express");
const router = express.Router();
const controller = require("../controllers/atendimentosController");

// GET /api/atendimentos/metricas
router.get("/metricas", controller.metricas);

// GET /api/atendimentos
router.get("/", controller.listar);

module.exports = router;
