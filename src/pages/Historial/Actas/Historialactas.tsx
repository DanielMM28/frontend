import { useEffect, useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaBuilding,
  FaUsers,
  FaIdBadge,
} from "react-icons/fa";
import EditarActaModal from "./editaractas";
import EliminarActaModal from "./eliminaractas";
import CrearActaModal from "./crearacta";
import type { Acta } from "./types";

const HistorialActasPage = () => {
  const [actas, setActas] = useState<Acta[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actaAEditar, setActaAEditar] = useState<Acta | null>(null);
  const [actaAEliminar, setActaAEliminar] = useState<Acta | null>(null);

  const cargarActas = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/actas");
      const data: Acta[] = await res.json();
      setActas(data);
    } catch (error) {
      console.error("Error cargando actas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarActas();
  }, []);

  const filteredActas = actas.filter((acta) => {
    const asistenteNombre = acta.asistente?.nombre ?? "";
    return `${acta.tema ?? ""} ${acta.objetivo ?? ""} ${asistenteNombre} ${
      acta.descripcion ?? ""
    } ${acta.conclusion ?? ""} ${acta.comiteTipo ?? ""} ${
      acta.centroDescripcion ?? ""
    } `
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Historial de Actas</h1>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalCrearActa"
        >
          <FaPlus className="me-1" /> Crear Acta
        </button>
      </div>

 
      <div className="mb-4">
        <div className="input-group">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por tema, objetivo, asistente, comité, centro o ficha..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Contenido */}
      {loading ? (
        <p className="text-center">Cargando actas...</p>
      ) : filteredActas.length === 0 ? (
        <p className="text-center">No hay actas registradas.</p>
      ) : (
        <div className="row g-4">
          {filteredActas.map((acta) => (
            <div className="col-md-6 col-lg-4" key={acta.ID}>
              <div className="card h-100 shadow-sm border-0">
               
                <div className="card-header bg-secondary text-white">
                  <h5 className="card-title mb-1">{acta.tema ?? "Sin tema"}</h5>
                </div>

                <div className="card-body">
                  
                  <p className="card-text">
                    <strong>Descripción:</strong>{" "}
                    {acta.descripcion?.length > 100
                      ? acta.descripcion.slice(0, 100) + "..."
                      : acta.descripcion ?? "N/A"}
                  </p>
                  <p className="card-text">
                    <strong>Conclusión:</strong>{" "}
                    {acta.conclusion?.length > 80
                      ? acta.conclusion.slice(0, 80) + "..."
                      : acta.conclusion ?? "N/A"}
                  </p>

                  <hr />

                  <p className="mb-1">
                    <FaCalendarAlt className="me-1 text-primary" />{" "}
                    {acta.fecha
                      ? new Date(acta.fecha).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p className="mb-1">
                    <FaClock className="me-1 text-primary" />{" "}
                    {acta.horaInicio ?? "N/A"} - {acta.horaFin ?? "N/A"}
                  </p>
                  <p className="mb-1">
                    <FaUser className="me-1 text-primary" />{" "}
                    {acta.asistente?.nombre ?? "N/A"}
                  </p>
                  <p className="mb-1">
                    <FaUsers className="me-1 text-primary" />{" "}
                    {acta.comiteTipo ?? "N/A"}
                  </p>
                  <p className="mb-1">
                    <FaBuilding className="me-1 text-primary" />{" "}
                    {acta.centroDescripcion ?? "N/A"}
                  </p>
                  <p className="mb-1">
                    <FaIdBadge className="me-1 text-primary" />
                    {acta.Ficha ? JSON.stringify(acta.Ficha) : "N/A"}
                  </p>
                </div>

                
                <div className="card-footer d-flex justify-content-between">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target={`#modalVerActa${acta.ID}`}
                  >
                    Ver más
                  </button>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => setActaAEditar(acta)}
                      data-bs-toggle="modal"
                      data-bs-target="#modalEditarActa"
                    >
                      <FaEdit className="me-1" /> Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => setActaAEliminar(acta)}
                      data-bs-toggle="modal"
                      data-bs-target="#modalEliminarActa"
                    >
                      <FaTrash className="me-1" /> Eliminar
                    </button>
                  </div>
                </div>

                
                <div
                  className="modal fade"
                  id={`modalVerActa${acta.ID}`}
                  tabIndex={-1}
                >
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                      <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">
                          {acta.tema ?? "Sin tema"}
                        </h5>
                        <small>{acta.objetivo ?? "Sin objetivo"}</small>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <p>
                          <strong>Descripción:</strong>{" "}
                          {acta.descripcion ?? "N/A"}
                        </p>
                        <p>
                          <strong>Conclusión:</strong>{" "}
                          {acta.conclusion ?? "N/A"}
                        </p>
                        <p>
                          <FaCalendarAlt className="me-1 text-primary" />{" "}
                          {acta.fecha
                            ? new Date(acta.fecha).toLocaleDateString()
                            : "N/A"}
                        </p>
                        <p>
                          <FaClock className="me-1 text-primary" />{" "}
                          {acta.horaInicio ?? "N/A"} - {acta.horaFin ?? "N/A"}
                        </p>
                        <p>
                          <FaUser className="me-1 text-primary" />{" "}
                          {acta.asistente?.nombre ?? "N/A"}
                        </p>
                        <p>
                          <FaUsers className="me-1 text-primary" />{" "}
                          {acta.comiteTipo ?? "N/A"}
                        </p>
                        <p>
                          <FaBuilding className="me-1 text-primary" />{" "}
                          {acta.centroDescripcion ?? "N/A"}
                        </p>
                        <p className="mb-1">
                          <FaIdBadge className="me-1 text-primary" />
                          {acta.Ficha ? JSON.stringify(acta.Ficha) : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modales */}
      <CrearActaModal recargarActas={cargarActas} />
      <EditarActaModal acta={actaAEditar} recargarActas={cargarActas} />
      <EliminarActaModal acta={actaAEliminar} recargarActas={cargarActas} />
    </div>
  );
};

export default HistorialActasPage;
