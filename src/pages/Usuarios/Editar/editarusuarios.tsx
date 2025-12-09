interface User {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  estado: "Activo" | "Inactivo";
  rol: { id: number; nombre: string };
}

interface FormData {
  usuNom: string;
  usuCorreo: string;
  usuTel: string;
  rolId: number;
  usuApe: string;
}
interface EditModalProps {
  usuario: User | null;
  form: FormData;
  setEditForm: React.Dispatch<React.SetStateAction<FormData>>;
  onSave: () => Promise<void>;
}

const ModalEditarUsuario = ({
  usuario,
  form,
  setEditForm,
  onSave,
}: EditModalProps) => {
  if (!usuario) return null;

  return (
    <div className="modal fade" id="modalEditarUsuario" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Usuario</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <label>Nombre:</label>
            <input
              className="form-control"
              value={form.usuNom}
              onChange={(e) => setEditForm({ ...form, usuNom: e.target.value })}
            />
            <label className="mt-2">Apellido:</label>
            <input
              className="form-control"
              value={form.usuApe}
              onChange={(e) => setEditForm({ ...form, usuApe: e.target.value })}
            />
            <label className="mt-2">Correo:</label>
            <input
              className="form-control"
              value={form.usuCorreo}
              onChange={(e) =>
                setEditForm({ ...form, usuCorreo: e.target.value })
              }
            />

            <label className="mt-2">Teléfono:</label>
            <input
              className="form-control"
              value={form.usuTel}
              onChange={(e) => setEditForm({ ...form, usuTel: e.target.value })}
            />

            <label className="mt-2">Rol:</label>
            <select
              className="form-select"
              value={form.rolId}
              onChange={(e) =>
                setEditForm({ ...form, rolId: Number(e.target.value) })
              }
            >
              <option value={1}>ADMINISTRADOR</option>
              <option value={2}>INSTRUCTOR</option>
              <option value={3}>COORDINADOR</option>
            </select>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button
              className="btn btn-success"
              onClick={onSave}
              data-bs-dismiss="modal"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditarUsuario;
