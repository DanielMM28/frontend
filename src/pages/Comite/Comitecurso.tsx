import React, { useState } from "react";
import { FaHome, FaClipboardList, FaUsers, FaHistory, FaUser, FaCog, FaBell, FaChevronDown } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Comitecurso.css";

type Acta = {
  fecha: string;
  acta: string;
  tipo: string;
  casos: number;
  retraso: string;
};

const datosIniciales: Acta[] = [
  { fecha: "2025/01/12", acta: "ACT-2025-001", tipo: "Comité Extraordinario", casos: 10, retraso: "5 días" },
  { fecha: "2025/01/12", acta: "ACT-2025-002", tipo: "Comité Extraordinario", casos: 8, retraso: "2 dias" },
  { fecha: "2025/01/14", acta: "ACT-2025-003", tipo: "Comité de inicio", casos: 30, retraso: "3 días" },
  { fecha: "2025/01/16", acta: "ACT-2025-004", tipo: "Comité de cierre", casos: 25, retraso: "1 dia" },
  { fecha: "2025/01/18", acta: "ACT-2025-005", tipo: "Comité Extraordinario", casos: 12, retraso: "1 día" },
  { fecha: "2025/01/20", acta: "ACT-2025-006", tipo: "Comité de inicio", casos: 15, retraso: "3 dias " },
];

interface Props {
  cambiarVista: (vista: string) => void;
}

const ComitesEnCurso: React.FC<Props> = () => {
  const [submenuOpen, setSubmenuOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState<string>("Comité");
  const [selectedSub, setSelectedSub] = useState<string>("Comités en curso");
  const [tipoFiltro, setTipoFiltro] = useState<string>("Todos");
  const [fechaDesde, setFechaDesde] = useState<string>("");
  const [fechaHasta, setFechaHasta] = useState<string>("");
  const [pagina, setPagina] = useState<number>(1);
  const itemsPorPagina = 3;


  const handleRegistrar = (acta: string) => alert(`Registrar decisión: ${acta}`);
  const handleCerrar = (acta: string) => alert(`Cerrar acta: ${acta}`);

  const datosFiltrados = datosIniciales.filter((d) => {
    const cumpleTipo = tipoFiltro === "Todos" || d.tipo === tipoFiltro;
    const fecha = new Date(d.fecha);
    const cumpleDesde = fechaDesde ? fecha >= new Date(fechaDesde) : true;
    const cumpleHasta = fechaHasta ? fecha <= new Date(fechaHasta) : true;
    return cumpleTipo && cumpleDesde && cumpleHasta;
  });

  const totalPaginas = Math.ceil(datosFiltrados.length / itemsPorPagina);
  const datosPaginados = datosFiltrados.slice((pagina - 1) * itemsPorPagina, pagina * itemsPorPagina);

  const cambiarPagina = (n: number) => {
    if (n < 1) n = 1;
    if (n > totalPaginas) n = totalPaginas;
    setPagina(n);
  };

  return (
    <div className="d-flex vh-100">
  
      <main className="flex-grow-1 p-4 overflow-auto">
        

        <section>
          <h2>Comités en curso</h2>
          <p className="text-muted mb-4">Revise los comités que están activos y finalice el acta dentro del tiempo límite.</p>


<div className="card mb-4 shadow-sm">
  <div className="card-body">
    <h5 className="card-title">Filtros</h5>
    <div className="row g-3">
      <div className="col-md-4">
        <label className="form-label">Tipo de comité</label>
        <select className="form-select" value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value)}>
          <option>Todos</option>
          <option>Comité Extraordinario</option>
          <option>Comité de inicio</option>
          <option>Comité de cierre</option>
        </select>
      </div>
      <div className="col-md-4">
        <label className="form-label">Fecha desde</label>
        <input type="date" className="form-control" value={fechaDesde} onChange={(e) => setFechaDesde(e.target.value)} />
      </div>
      <div className="col-md-4">
        <label className="form-label">Fecha hasta</label>
        <input type="date" className="form-control" value={fechaHasta} onChange={(e) => setFechaHasta(e.target.value)} />
      </div>
    </div>
    
  </div>
</div>

<div className="card shadow-sm mb-4">
  <div className="card-body">
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-primary">
          <tr>
            <th>Fecha</th>
            <th>N°. Acta</th>
            <th>Tipo de comité</th>
            <th className="text-center">Casos</th>
            <th className="text-center">Retraso</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datosPaginados.map((r) => (
            <tr key={r.acta}>
              <td>{r.fecha}</td>
              <td>{r.acta}</td>
              <td>{r.tipo}</td>
              <td className="text-center">{r.casos}</td>
              <td className="text-center">{r.retraso}</td>
              <td className="text-end">
                <button className="btn btn-success btn-sm me-1" onClick={() => handleRegistrar(r.acta)}>
                  <i className="bi bi-check-circle me-1"></i>Registrar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleCerrar(r.acta)}>
                  <i className="bi bi-x-circle me-1"></i>Cerrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <nav className="mt-3">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${pagina === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => cambiarPagina(pagina - 1)}>&lt;</button>
        </li>
        {Array.from({ length: totalPaginas }, (_, i) => (
          <li key={i} className={`page-item ${pagina === i + 1 ? "active" : ""}`}>
            <button className="page-link" onClick={() => cambiarPagina(i + 1)}>{i + 1}</button>
          </li>
        ))}
        <li className={`page-item ${pagina === totalPaginas ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => cambiarPagina(pagina + 1)}>&gt;</button>
        </li>
      </ul>
    </nav>
  </div>
</div>
        </section>
      </main>
    </div>
  );
}

export default ComitesEnCurso;
