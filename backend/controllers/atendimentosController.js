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
          (item["Nome do assistido"] || "").toLowerCase().includes(termo) ||
          (item["Responsável pelo agendamento"] || "")
            .toLowerCase()
            .includes(termo) ||
          (item["Organização"] || "").toLowerCase().includes(termo),
      );
    }

    if (realizado) {
      dados = dados.filter(
        (item) => item["Agendamento realizado"] === realizado,
      );
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

    const valoresUnicos = [
      ...new Set(dados.map((i) => i["Agendamento realizado"])),
    ];
    // console.log("Valores únicos de Agendamento realizado:", valoresUnicos);

    const total = dados.length;
    const realizados = dados.filter(
      (i) => i["Agendamento realizado"] === "Sim",
    ).length;
    const naoRealizados = dados.filter(
      (i) => i["Agendamento realizado"] === "Não",
    ).length;

    const porStatus = {
      Realizado: realizados,
      "Não Realizado": naoRealizados,
    };

    // Evolução mensal — formato da data: "4/9/2021" (mês/dia/ano)
    const porMes = dados.reduce((acc, i) => {
      const dataStr = i["Data do agendamento"];
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

    // console.log("Evolução mensal:", evolucaoMensal);

    res.json({
      total,
      realizados,
      naoRealizados,
      porStatus,
      evolucaoMensal,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao calcular métricas" });
  }
};
