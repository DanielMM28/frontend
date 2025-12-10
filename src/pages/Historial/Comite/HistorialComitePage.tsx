import { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaEye } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Centro {
  cenId: number;
  cenDes: string;
}

interface Municipio {
  munId: number;
  munDes: string;
}

interface Acta {
  actId: number;
  actTema: string;
  actFecha: string;
}

interface Comite {
  comId: number;
  comNom: string;
  comTip: string;
  comDes: string;
  comHora: string | null;
  comFecha: string;
  centro: Centro;
  municipio: Municipio;
  actas: Acta[];
}

const HistorialComite = () => {
  const [comites, setComites] = useState<Comite[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
const [comiteSeleccionado, setComiteSeleccionado] = useState<Comite | null>(null);

const abrirModal = (comite: Comite) => {
  setComiteSeleccionado(comite);
  setShowModal(true);
};

const cerrarModal = () => {
  setShowModal(false);
  setComiteSeleccionado(null);
};


  const cargarComites = async () => {
  try {
    const res = await fetch("http://localhost:3000/comites");
    const data: Comite[] = await res.json(); // ✅ ES ARRAY
    setComites(data); // ✅ DIRECTO
  } catch (error) {
    console.error("Error al cargar comités:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    cargarComites();
  }, []);

  const comitesFiltrados = comites.filter(c =>
    `${c.comTip} ${c.comDes}`.toLowerCase().includes(search.toLowerCase())
  );
{showModal && comiteSeleccionado && (
  <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content rounded-4">

        <div className="modal-header bg-primary text-white">
          <h5 className="modal-title">Información del Comité</h5>
          <button className="btn-close btn-close-white" onClick={cerrarModal}></button>
        </div>

        <div className="modal-body">
          <div className="row g-3">

            <div className="col-md-6"><strong>ID:</strong> {comiteSeleccionado.comId}</div>
            <div className="col-md-6"><strong>Nombre:</strong> {comiteSeleccionado.comNom}</div>
            <div className="col-md-6"><strong>Tipo:</strong> {comiteSeleccionado.comTip}</div>
            <div className="col-md-6"><strong>Fecha:</strong> {comiteSeleccionado.comFecha}</div>
            <div className="col-md-6"><strong>Hora:</strong> {comiteSeleccionado.comHora || "—"}</div>
            <div className="col-md-6"><strong>Centro:</strong> {comiteSeleccionado.centro?.cenDes}</div>
            <div className="col-md-6"><strong>Municipio:</strong> {comiteSeleccionado.municipio?.munDes}</div>

            <div className="col-12">
              <strong>Descripción:</strong>
              <p className="mt-1">{comiteSeleccionado.comDes}</p>
            </div>

            <div className="col-12">
             <strong>Total de Actas:</strong> {comiteSeleccionado.actas?.length || 0}

            </div>

          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={cerrarModal}>
            Cerrar
          </button>
        </div>

      </div>
    </div>
  </div>
)}

return (
  <div className="container py-4">
    <h1 className="mb-4">Historial de Comités</h1>

    {/* ✅ MODAL BIEN UBICADO */}
    {showModal && comiteSeleccionado && (
      <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content rounded-4">

            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Información del Comité</h5>
              <button className="btn-close btn-close-white" onClick={cerrarModal}></button>
            </div>

            <div className="modal-body">
              <div className="row g-3">

                <div className="col-md-6"><strong>ID:</strong> {comiteSeleccionado.comId}</div>
                <div className="col-md-6"><strong>Nombre:</strong> {comiteSeleccionado.comNom}</div>
                <div className="col-md-6"><strong>Tipo:</strong> {comiteSeleccionado.comTip}</div>
                <div className="col-md-6"><strong>Fecha:</strong> {comiteSeleccionado.comFecha}</div>
                <div className="col-md-6"><strong>Hora:</strong> {comiteSeleccionado.comHora || "—"}</div>
                <div className="col-md-6"><strong>Centro:</strong> {comiteSeleccionado.centro?.cenDes}</div>
                <div className="col-md-6"><strong>Municipio:</strong> {comiteSeleccionado.municipio?.munDes}</div>

                <div className="col-12">
                  <strong>Descripción:</strong>
                  <p className="mt-1">{comiteSeleccionado.comDes}</p>
                </div>

                <div className="col-12">
                  <strong>Total de Actas:</strong> {comiteSeleccionado.actas?.length || 0}
                </div>

              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={cerrarModal}>
                Cerrar
              </button>
            </div>

          </div>
        </div>
      </div>
    )}

    {/* ✅ BUSCADOR */}
    <div className="row mb-3 g-2 align-items-center">
      <div className="col-md-8">
        <div className="input-group shadow-sm rounded">
          <span className="input-group-text bg-light border-0"><FaSearch /></span>
          <input
            type="text"
            className="form-control border-0"
            placeholder="Buscar por tipo o descripción..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="col-md-4 text-md-end">
        <button className="btn btn-outline-primary shadow-sm">
          <FaFilter className="me-1" /> Filtrar
        </button>
      </div>
    </div>

    {/* ✅ TABLA */}
    {loading ? (
      <div className="text-center py-4">Cargando comités...</div>
    ) : (
      <div className="card shadow-sm rounded-4 border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-primary text-dark">
              <tr>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Centro</th>
                <th>Municipio</th>
                <th>Actas</th>
                <th className="text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {comitesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No hay comités registrados.
                  </td>
                </tr>
              ) : (
                comitesFiltrados.map((c, index) => (
                  <tr key={c.comId} className={index % 2 === 0 ? "table-light" : ""}>
                    <td>{c.comTip}</td>
                    <td>{c.comDes}</td>
                    <td>{c.centro?.cenDes}</td>
                    <td>{c.municipio?.munDes}</td>

                    {/* ✅ AQUÍ ESTABA EL ERROR */}
                    <td className="text-center">{c.actas?.length || 0}</td>

                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-primary shadow-sm"
                        onClick={() => abrirModal(c)}
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
);

};

export default HistorialComite;
