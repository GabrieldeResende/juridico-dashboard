import { useState } from "react";

function Tabela({
  dados,
  pagination,
  onBusca,
  onFiltroStatus,
  onPagina,
  loading,
}) {
  const [busca, setBusca] = useState("");
  const [realizado, setRealizado] = useState("");

  const handleBusca = (e) => {
    setBusca(e.target.value);
    onBusca(e.target.value);
  };

  const handleStatus = (e) => {
    setRealizado(e.target.value);
    onFiltroStatus(e.target.value);
  };

  const inputStyle = {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none",
  };

  const btnStyle = (ativo) => ({
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    background: ativo ? "#4f46e5" : "#fff",
    color: ativo ? "#fff" : "#374151",
    cursor: "pointer",
    fontSize: "13px",
  });

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "16px",
        }}
      >
        <input
          style={{ ...inputStyle, flex: "1 1 200px" }}
          type="text"
          placeholder="Buscar por assistido, responsável ou organização..."
          value={busca}
          onChange={handleBusca}
        />
        <select style={inputStyle} value={realizado} onChange={handleStatus}>
          <option value="">Todos</option>
          <option value="Sim">Realizado</option>
          <option value="Não">Não Realizado</option>
        </select>
      </div>

      {loading ? (
        <p style={{ textAlign: "center", color: "#6b7280" }}>Carregando...</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#f9fafb",
                  borderBottom: "2px solid #e5e7eb",
                }}
              >
                {[
                  "Assistido",
                  "Data",
                  "Hora Início",
                  "Responsável",
                  "Organização",
                  "Tipo",
                  "Realizado",
                ].map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: "10px 12px",
                      textAlign: "left",
                      color: "#374151",
                      fontWeight: "600",
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dados.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      color: "#6b7280",
                    }}
                  >
                    Nenhum resultado encontrado.
                  </td>
                </tr>
              ) : (
                dados.map((item, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: "1px solid #e5e7eb",
                      background: idx % 2 === 0 ? "#fff" : "#f9fafb",
                    }}
                  >
                    <td style={{ padding: "10px 12px" }}>
                      {item["nome_do_assistido"]}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      {item["data_agendamento"]}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      {item["hora_inicio"]}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      {item["responsavel_agendamento"] || "—"}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      {item["organizacao"] || "—"}
                    </td>
                    <td style={{ padding: "10px 12px" }}>{item["tipo"]}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <span
                        style={{
                          padding: "2px 8px",
                          borderRadius: "99px",
                          fontSize: "12px",
                          fontWeight: "500",
                          background:
                            item["agendamento_realizado"] === "Sim"
                              ? "#dcfce7"
                              : "#fee2e2",
                          color:
                            item["agendamento_realizado"] === "Sim"
                              ? "#16a34a"
                              : "#dc2626",
                        }}
                      >
                        {item["agendamento_realizado"]}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {pagination && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "16px",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "13px", color: "#6b7280" }}>
            {pagination.total} registros — Página {pagination.page} de{" "}
            {pagination.totalPages}
          </span>
          <div style={{ display: "flex", gap: "6px" }}>
            <button
              style={btnStyle(false)}
              disabled={pagination.page <= 1}
              onClick={() => onPagina(pagination.page - 1)}
            >
              ← Anterior
            </button>
            <button
              style={btnStyle(false)}
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => onPagina(pagination.page + 1)}
            >
              Próxima →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tabela;
