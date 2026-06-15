import { useState, useEffect } from "react";
import { getAtendimentos, getMetricas } from "../../services/api";
import KPICards from "../KPICards/KPICards";
import Graficos from "../Graficos/Graficos";
import Tabela from "../Tabela/Tabela";
import Exportar from "../Exportar/Exportar";

function Dashboard() {
  const [metricas, setMetricas] = useState(null);
  const [atendimentos, setAtendimentos] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loadingMetricas, setLoadingMetricas] = useState(true);
  const [loadingTabela, setLoadingTabela] = useState(true);
  const [erroMetricas, setErroMetricas] = useState(null);
  const [erroTabela, setErroTabela] = useState(null);

  const [filtros, setFiltros] = useState({
    busca: "",
    realizado: "",
    page: 1,
    limit: 10,
  });

  // Busca métricas uma única vez
  useEffect(() => {
    const fetchMetricas = async () => {
      try {
        setLoadingMetricas(true);
        const data = await getMetricas();
        setMetricas(data);
      } catch (err) {
        setErroMetricas("Erro ao carregar métricas.");
        console.error(err);
      } finally {
        setLoadingMetricas(false);
      }
    };
    fetchMetricas();
  }, []);

  // Busca atendimentos sempre que filtros mudarem
  useEffect(() => {
    const fetchAtendimentos = async () => {
      try {
        setLoadingTabela(true);
        const data = await getAtendimentos(filtros);
        setAtendimentos(data.data);
        setPagination(data.pagination);
      } catch (err) {
        setErroTabela("Erro ao carregar atendimentos.");
        console.error(err);
      } finally {
        setLoadingTabela(false);
      }
    };
    fetchAtendimentos();
  }, [filtros]);

  const handleBusca = (valor) => {
    setFiltros((prev) => ({ ...prev, busca: valor, page: 1 }));
  };

  const handleFiltroStatus = (valor) => {
    setFiltros((prev) => ({ ...prev, realizado: valor, page: 1 }));
  };

  const handlePagina = (novaPagina) => {
    setFiltros((prev) => ({ ...prev, page: novaPagina }));
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", padding: "24px" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "22px",
            color: "#111827",
            fontWeight: "700",
          }}
        >
          Painel Jurídico
        </h1>
        <p style={{ margin: "4px 0 0", color: "#6b7280", fontSize: "14px" }}>
          Gestão de atendimentos e agendamentos
        </p>
      </div>

      {/* KPI Cards */}
      {loadingMetricas ? (
        <p style={{ color: "#6b7280" }}>Carregando métricas...</p>
      ) : erroMetricas ? (
        <p style={{ color: "#dc2626" }}>{erroMetricas}</p>
      ) : (
        <KPICards metricas={metricas} />
      )}

      {/* Gráficos */}
      {!loadingMetricas && !erroMetricas && <Graficos metricas={metricas} />}

      {/* Exportar */}
      <Exportar filtros={filtros} />

      {/* Erro tabela */}
      {erroTabela && (
        <p style={{ color: "#dc2626", marginBottom: "12px" }}>{erroTabela}</p>
      )}

      {/* Tabela */}
      <Tabela
        dados={atendimentos}
        pagination={pagination}
        onBusca={handleBusca}
        onFiltroStatus={handleFiltroStatus}
        onPagina={handlePagina}
        loading={loadingTabela}
      />
    </div>
  );
}

export default Dashboard;
