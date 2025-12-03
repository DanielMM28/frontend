import { Modal, Button } from "react-bootstrap";
import type { Ficha } from "./types";

interface Props {
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
  ficha: Ficha | null;
}


const API_URL = "http://localhost:3000/fichas";

const EliminarFicha = ({ show, onClose, onDelete, ficha }: Props) => {


  const handleEliminar = async () => {
    if (!ficha || !ficha.ficId) return;

    try {
     
      const resp = await fetch(`${API_URL}/${ficha.ficId}`, {
        method: "DELETE",
      });

      if (!resp.ok) {
        throw new Error(`Error ${resp.status}: No se pudo eliminar la ficha.`);
      }
      onDelete();

    } catch (error) {
      console.error("Error al eliminar la ficha:", error);
     
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">
          <span role="img" aria-label="Alerta">
            ⚠️
          </span>{" "}
          Confirmar Eliminación
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Estás a punto de eliminar permanentemente la siguiente ficha:
        </p>
        
        <p className="fw-bold text-danger mt-3">
          ¿Estás seguro de que deseas continuar? Esta acción no se puede deshacer.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleEliminar}>
          <span role="img" aria-label="Eliminar">
            🗑️
          </span>{" "}
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EliminarFicha;