import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

function Graficos({ metricas }) {
  if (!metricas) return null;

  const dadosStatus = Object.entries(metricas.porStatus).map(
    ([name, value]) => ({
      name,
      value,
    }),
  );

  const dadosMensal = metricas.evolucaoMensal.map((item) => ({
    mes: item.mes,
    quantidade: item.quantidade,
  }));

  return (
    <div
      style={{
        display: "flex",
        gap: "24px",
        flexWrap: "wrap",
        marginBottom: "24px",
      }}
    >
      {/* Gráfico de barras - por status */}
      <div
        style={{
          flex: "1 1 300px",
          background: "#fff",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ margin: "0 0 16px", fontSize: "15px", color: "#374151" }}>
          Atendimentos por Status
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={dadosStatus}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de linha - evolução mensal */}
      <div
        style={{
          flex: "1 1 300px",
          background: "#fff",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ margin: "0 0 16px", fontSize: "15px", color: "#374151" }}>
          Evolução Mensal
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={dadosMensal}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="quantidade"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Graficos;
