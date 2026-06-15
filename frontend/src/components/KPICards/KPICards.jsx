function KPICards({ metricas }) {
  if (!metricas) return null;

  const cards = [
    { label: "Total de Agendamentos", valor: metricas.total, cor: "#4f46e5" },
    { label: "Realizados", valor: metricas.realizados, cor: "#16a34a" },
    { label: "Não Realizados", valor: metricas.naoRealizados, cor: "#dc2626" },
    {
      label: "Taxa de Realização",
      valor: `${((metricas.realizados / metricas.total) * 100).toFixed(1)}%`,
      cor: "#ca8a04",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        marginBottom: "24px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            flex: "1 1 180px",
            background: "#fff",
            borderRadius: "8px",
            padding: "20px",
            borderLeft: `4px solid ${card.cor}`,
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
            {card.label}
          </p>
          <p
            style={{
              margin: "8px 0 0",
              fontSize: "22px",
              fontWeight: "bold",
              color: card.cor,
            }}
          >
            {card.valor}
          </p>
        </div>
      ))}
    </div>
  );
}

export default KPICards;
