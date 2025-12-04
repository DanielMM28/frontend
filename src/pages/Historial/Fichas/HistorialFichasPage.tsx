import React, { useEffect, useState } from "react";
import { Button, Spinner, Dropdown } from "react-bootstrap";
import CrearFicha from "./crearfichas";
import EditarFicha from "./editarfichas";
import EliminarFicha from "./eliminarfichas";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./HistorialFichas.css"; 

const Fichas = () => {
  const [fichas, setFichas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [mostrarCrear, setMostrarCrear] = useState(false);
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);

  const [fichaSeleccionada, setFichaSeleccionada] = useState<any>(null);

  const cargarFichas = async () => {
    setLoading(true);
    try {
      const resp = await fetch("http://localhost:3000/fichas");
      const data = await resp.json();
      setFichas(data);
    } catch (err) {
      console.error("Error cargando fichas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarFichas();
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between    align-items-center mb-4">
        <h2 className="mb-4" style={{fontSize:"30px"}} >Gestión de Fichas</h2>
        <Button variant="primary" onClick={() => setMostrarCrear(true)}>
          Crear Ficha
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="card shadow-sm rounded-4 border-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-primary text-dark">
                <tr>
                  <th>Ficha</th>
                  <th>Programa</th>
                  <th>Jornada</th>
                  <th>Cantidad</th>
                  <th>Instructor Líder</th>
                  <th>Estado</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {fichas.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-4">
                      No hay fichas registradas.
                    </td>
                  </tr>
                ) : (
                  fichas.map((f, index) => (
                    <tr
                      key={f.ficId}
                      className={index % 2 === 0 ? "table-light" : ""}
                      style={{ transition: "all 0.3s", cursor: "default" }}
                    >
                      <td>{f.numeroFicha}</td>
                      <td>{f.programa}</td>
                      <td>{f.jornada}</td>
                      <td>{f.cantidad}</td>
                      <td>{f.instructorLider}</td>
                      <td>{f.estado}</td>
                      <td>{f.fechas.inicio}</td>
                      <td>{f.fechas.fin}</td>

                     <td>
                      <div className="dropdown" id="menu">
                        <button
                          className="btn action-btn"
                          data-bs-toggle="dropdown"
                        >
                          <BsThreeDotsVertical style={{ width: 18, height: 18 }} />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <button
                              className="dropdown-item"
                             onClick={() => {
                                setFichaSeleccionada(f);
                                setMostrarEditar(true);
                              }}
                              
                            >
                              Editar
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item text-danger"
                              onClick={() => {
                                setFichaSeleccionada(f);
                                setMostrarEliminar(true);
                              }}
                          
                            >
                              Eliminar
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      
      <CrearFicha
        show={mostrarCrear}
        onClose={() => setMostrarCrear(false)}
        onCreate={() => {
          cargarFichas();
          setMostrarCrear(false);
        }}
      />

      <EditarFicha
        show={mostrarEditar}
        onClose={() => setMostrarEditar(false)}
        ficha={fichaSeleccionada}
        onUpdate={() => {
          cargarFichas();
          setMostrarEditar(false);
        }}
      />

      <EliminarFicha
        show={mostrarEliminar}
        onClose={() => setMostrarEliminar(false)}
        ficha={fichaSeleccionada}
        onDelete={() => {
          cargarFichas();
          setMostrarEliminar(false);
        }}
      />
    </div>
  );
};

export default Fichas;
