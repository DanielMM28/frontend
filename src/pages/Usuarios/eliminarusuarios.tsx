
interface User {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  estado: "Activo" | "Inactivo";
  rol: {
    id: number;
    nombre: string;
  };
}

interface DeleteModalProps {
  usuario: User | null;
  onDelete: () => void;
}

const ModalEliminarUsuario = ({ usuario, onDelete }: DeleteModalProps) => {
  return (
    <div className="modal fade" id="modalConfirmarEliminar" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Confirmar eliminación</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body">
            {usuario ? (
              <p>¿Seguro que deseas eliminar a <strong>{usuario.nombre}</strong>?</p>
            ) : (
              "Cargando..."
            )}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>

            <button
              className="btn btn-danger"
              onClick={onDelete}
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

export default ModalEliminarUsuario;
