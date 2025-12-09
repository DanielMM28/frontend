import { useState, type ChangeEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface CrearUsuarioProps {
  recargarUsuarios?: () => void; 
}

interface FormUsuario {
  usuId: string;
  usuNom: string;
  usuApe: string;
  usuCorreo: string;
  usuTel: string;
  usuEst: string;
  usuFir: string;
  usuCon: string;
  areaId: string;
  rolId: string;
}

const CrearUsuario: React.FC<CrearUsuarioProps> = ({ recargarUsuarios }) => {
  const [show, setShow] = useState(false);

  const [form, setForm] = useState<FormUsuario>({
    usuId: "",
    usuNom: "",
    usuApe: "",
    usuCorreo: "",
    usuTel: "",
    usuEst: "Activo",
    usuFir: "",
    usuCon: "",
    areaId: "",
    rolId: "",
  });

  // Para inputs y select
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    if (
      !form.usuId ||
      !form.usuNom ||
      !form.usuApe ||
      !form.usuCorreo ||
      !form.usuCon ||
      !form.rolId
    ) {
      alert("Todos los campos obligatorios deben ser llenados");
      return;
    }

    try {
      const resp = await fetch("http://localhost:3000/Usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await resp.json();

      if (!resp.ok) {
        alert("Error: " + data.mensaje);
        return;
      }

      alert("Usuario creado correctamente");

      setShow(false);
      setForm({
        usuId: "",
        usuNom: "",
        usuApe: "",
        usuCorreo: "",
        usuTel: "",
        usuEst: "Activo",
        usuFir: "",
        usuCon: "",
        areaId: "",
        rolId: "",
      });

      if (recargarUsuarios) recargarUsuarios();
    } catch (err) {
      console.error("Error al crear usuario:", err);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <>
      
      <button className="btn btn-success" onClick={() => setShow(true)}>
        Nuevo Usuario
      </button>

      
      {show && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Crear Usuario</h5>
                <button
                  className="btn-close"
                  onClick={() => setShow(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-4">
                    <label>ID *</label>
                    <input
                      type="number"
                      className="form-control"
                      name="usuId"
                      value={form.usuId}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-8">
                    <label>Correo *</label>
                    <input
                      type="email"
                      className="form-control"
                      name="usuCorreo"
                      value={form.usuCorreo}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-6">
                    <label>Nombre *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="usuNom"
                      value={form.usuNom}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-6">
                    <label>Apellido *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="usuApe"
                      value={form.usuApe}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-6">
                    <label>Teléfono</label>
                    <input
                      type="text"
                      className="form-control"
                      name="usuTel"
                      value={form.usuTel}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-6">
                    <label>Rol *</label>
                    <select
                      className="form-select"
                      name="rolId"
                      value={form.rolId}
                      onChange={handleChange}
                    >
                      <option value="">Seleccione...</option>
                      <option value="1">ADMINISTRADOR</option>
                      <option value="2">INSTRUCTOR</option>

                      <option value="3">COORDINADOR</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label>Contraseña *</label>
                    <input
                      type="password"
                      className="form-control"
                      name="usuCon"
                      value={form.usuCon}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShow(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={handleGuardar}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CrearUsuario;
