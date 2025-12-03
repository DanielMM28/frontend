import type { Acta } from "./types";

interface EliminarActaModalProps {
  acta: Acta | null;
  recargarActas: () => Promise<void>;
}

const EliminarActaModal = ({ acta, recargarActas }: EliminarActaModalProps) => {
  const eliminarActa = async () => {
    if (!acta) return;
    try {
      const resp = await fetch(`http://localhost:3000/actas/${acta.ID}`, {
        method: "DELETE",
      });
      if (!resp.ok) throw new Error("Error al eliminar acta");
      await recargarActas();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar acta");
    }
  };

  if (!acta) return null;

  return (
    <div className="modal fade" id="modalEliminarActa" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Eliminar Acta</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body">
            <p>
              ¿Está seguro que desea eliminar el acta{" "}
              <strong>{acta.tema}</strong>?
            </p>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button
              className="btn btn-danger"
              onClick={eliminarActa}
              data-bs-dismiss="modal"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EliminarActaModal;
