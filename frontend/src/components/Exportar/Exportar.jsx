import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getAtendimentos } from "../../services/api";

function Exportar({ filtros }) {
  const buscarTodosDados = async () => {
    const resultado = await getAtendimentos({
      ...filtros,
      page: 1,
      limit: 9999,
    });
    return resultado.data;
  };

  const exportarCSV = async () => {
    try {
      const dados = await buscarTodosDados();
      const cabecalho = [
        "Assistido",
        "Data",
        "Hora Início",
        "Hora Fim",
        "Responsável",
        "Organização",
        "Tipo",
        "Realizado",
      ];
      const linhas = dados.map((item) => [
        item["nome_assistido"],
        item["data_agendamento"],
        item["hora_inicio"],
        item["hora_fim"],
        item["responsavel_agendamento"] || "",
        item["organizacao"] || "",
        item["tipo"],
        item["agendamento_realizado"],
      ]);
      const conteudo = [cabecalho, ...linhas]
        .map((linha) => linha.map((cel) => `"${cel}"`).join(","))
        .join("\n");
      const blob = new Blob(["\uFEFF" + conteudo], {
        type: "text/csv;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "agendamentos.csv";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Erro ao exportar CSV");
    }
  };

  const exportarPDF = async () => {
    try {
      const dados = await buscarTodosDados();
      const doc = new jsPDF({ orientation: "landscape" });
      doc.setFontSize(14);
      doc.text("Relatório de Agendamentos Jurídicos", 14, 16);
      doc.setFontSize(10);
      doc.text(`Gerado em: ${new Date().toLocaleString("pt-BR")}`, 14, 22);
      autoTable(doc, {
        startY: 28,
        head: [
          [
            "Assistido",
            "Data",
            "Hora",
            "Responsável",
            "Organização",
            "Tipo",
            "Realizado",
          ],
        ],
        body: dados.map((item) => [
          item["nome_do_assistido"],
          item["data_agendamento"],
          item["hora_inicio"],
          item["responsavel_agendamento"] || "—",
          item["organizacao"] || "—",
          item["tipo"],
          item["agendamento_realizado"],
        ]),
        styles: { fontSize: 8 },
        headStyles: { fillColor: [79, 70, 229] },
        alternateRowStyles: { fillColor: [249, 250, 251] },
      });
      doc.save("agendamentos.pdf");
    } catch (err) {
      alert("Erro ao exportar PDF");
    }
  };

  const btnStyle = (cor) => ({
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    background: cor,
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  });

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
      <button style={btnStyle("#16a34a")} onClick={exportarCSV}>
        ⬇ Exportar CSV
      </button>
      <button style={btnStyle("#dc2626")} onClick={exportarPDF}>
        ⬇ Exportar PDF
      </button>
    </div>
  );
}

export default Exportar;
