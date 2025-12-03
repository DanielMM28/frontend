import { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaEye } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Comite {
  comId: number;
  comTip: string;
  comDes: string;
}

const HistorialComite = () => {
  const [comites, setComites] = useState<Comite[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const cargarComites = async () => {
    try {
      const res = await fetch("http://localhost:3000/comites");
      const data: Comite[] = await res.json();
      setComites(data);
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

  return (
    <div className="container py-4">
      <h1 className="mb-4">Historial de Comités</h1>

   
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

    
      {loading ? (
        <div className="text-center py-4">Cargando comités...</div>
      ) : (
        <div className="card shadow-sm rounded-4 border-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-primary text-dark">
                <tr>
                  <th>Tipo de Comité</th>
                  <th>Descripción</th>
                  <th className="text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {comitesFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-4">
                      No hay comités registrados.
                    </td>
                  </tr>
                ) : (
                  comitesFiltrados.map((c, index) => (
                    <tr
                      key={c.comId}
                      className={index % 2 === 0 ? "table-light" : ""}
                      style={{ transition: "all 0.3s", cursor: "pointer" }}
                    >
                      <td>{c.comTip}</td>
                      <td>{c.comDes}</td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-primary shadow-sm">
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
