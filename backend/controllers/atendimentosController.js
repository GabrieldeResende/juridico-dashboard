const fs = require("fs");
const path = require("path");

const loadData = () => {
  const filePath = path.join(__dirname, "../data/atendimentos.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
};

exports.listar = (req, res) => {
  try {
    let dados = loadData();
    const { busca, realizado, page = 1, limit = 10 } = req.query;

    if (busca) {
      const termo = busca.toLowerCase();
      dados = dados.filter(
        (item) =>
          (item.nome_do_assistido || "").toLowerCase().includes(termo) ||
          (item.responsavel_agendamento || "").toLowerCase().includes(termo) ||
          (item.organizacao || "").toLowerCase().includes(termo),
      );
    }

    if (realizado) {
      dados = dados.filter((item) => item.agendamento_realizado === realizado);
    }

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.max(1, parseInt(limit));
    const total = dados.length;
    const totalPages = Math.ceil(total / limitNum);
    const inicio = (pageNum - 1) * limitNum;
    const resultado = dados.slice(inicio, inicio + limitNum);

    res.json({
      data: resultado,
      pagination: { total, page: pageNum, limit: limitNum, totalPages },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao carregar atendimentos" });
  }
};

exports.metricas = (req, res) => {
  try {
    const dados = loadData();

    const total = dados.length;
    const realizados = dados.filter(
      (i) => i.agendamento_realizado === "Sim",
    ).length;
    const naoRealizados = dados.filter(
      (i) => i.agendamento_realizado === "Não",
    ).length;

    const porStatus = {
      Realizado: realizados,
      "Não Realizado": naoRealizados,
    };

    const porMes = dados.reduce((acc, i) => {
      const dataStr = i.data_agendamento;
      if (!dataStr) return acc;
      const partes = dataStr.split("/");
      if (partes.length < 3) return acc;
      const mes = `${partes[2]}-${String(partes[0]).padStart(2, "0")}`;
      acc[mes] = (acc[mes] || 0) + 1;
      return acc;
    }, {});

    const evolucaoMensal = Object.entries(porMes)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([mes, quantidade]) => ({ mes, quantidade }));

    res.json({ total, realizados, naoRealizados, porStatus, evolucaoMensal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao calcular métricas" });
  }
};
