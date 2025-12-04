import { useEffect, useState, type SVGProps } from "react";
import "./Usuarios.css";
import CrearUsuario from "./CrearUsuarios";
import ModalEditarUsuario from "./editarusuarios";
import ModalEliminarUsuario from "./eliminarusuarios";
import type { JSX } from "react/jsx-runtime";

// Icono de opciones
const EllipsisVIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M9.5 13a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0-5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0-5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
  </svg>
);

// Interfaces
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
}

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("TODOS");
  const roleOptions = ["TODOS", "ADMINISTRADOR", "INSTRUCTOR"];

 
  const [usuarioAEditar, setUsuarioAEditar] = useState<User | null>(null);
  const [editForm, setEditForm] = useState<FormData>({
    usuNom: "",
    usuCorreo: "",
    usuTel: "",
    rolId: 0,
  });


  const [usuarioAEliminar, setUsuarioAEliminar] = useState<User | null>(null);

  const cargarUsuarios = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/usuarios");
      const data: User[] = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);


  const filteredUsers = users.filter((user) => {
    const searchMatch =
      `${user.nombre} ${user.apellido} ${user.correo} ${user.telefono} ${user.rol.nombre}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const roleMatch = filterRole === "TODOS" || user.rol.nombre === filterRole;
    return searchMatch && roleMatch;
  });

 
  const handleAddOrEdit = (user: User) => {
    setUsuarioAEditar(user);
    setEditForm({
      usuNom: user.nombre,
      usuCorreo: user.correo,
      usuTel: user.telefono,
      rolId: user.rol.id,
    });
  };


  const actualizarUsuario = async () => {
    if (!usuarioAEditar) return;

    try {
      const resp = await fetch(
        `http://localhost:3000/usuarios/${usuarioAEditar.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editForm),
        }
      );

      const data = await resp.json();
      if (!resp.ok) {
        alert("Error: " + data.mensaje);
        return;
      }

      alert("Usuario actualizado correctamente");
      cargarUsuarios();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      alert("Error al conectar con el servidor");
    }
  };

  const confirmarEliminacion = async () => {
    if (!usuarioAEliminar) return;

    try {
      const resp = await fetch(
        `http://localhost:3000/usuarios/${usuarioAEliminar.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await resp.json();
      if (!resp.ok) {
        alert("Error: " + data.mensaje);
        return;
      }

      alert("Usuario eliminado");
      cargarUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <>
      <div className="user-management-container">
        <h1 className="user-management-title">Gestión de Usuarios</h1>

        {/* FILTROS */}
        <div className="filters">
          <div className="search-box">
            <input
              type="text"
              placeholder=" Buscar por nombre, correo, rol..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <CrearUsuario recargarUsuarios={cargarUsuarios} />

          <div className="mb-2">
            <select
              className="form-select"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              {roleOptions.map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>

       
        {loading ? (
          <p style={{ textAlign: "center" }}>Cargando usuarios...</p>
        ) : (
          <table className="user-management-table">
            <thead>
              <tr>
                <th>Nombre Completo</th>
                <th>Rol</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    No hay usuarios que coincidan con la búsqueda.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      {user.nombre} {user.apellido}
                    </td>
                    <td>{user.rol.nombre}</td>
                    <td>{user.correo}</td>
                    <td>{user.telefono}</td>
                    <td
                      className={
                        user.estado === "Activo"
                          ? "estado estado-activo"
                          : "estado estado-inactivo"
                      }
                    >
                      {user.estado}
                    </td>
                    <td>
                      <div className="dropdown" id ="menu">
                        <button
                          className="btn action-btn"
                          data-bs-toggle="dropdown"
                        >
                          <EllipsisVIcon style={{ width: 18, height: 18 }} />
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => handleAddOrEdit(user)}
                              data-bs-toggle="modal"
                              data-bs-target="#modalEditarUsuario"
                            >
                              Editar
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item text-danger"
                              onClick={() => setUsuarioAEliminar(user)}
                              data-bs-toggle="modal"
                              data-bs-target="#modalConfirmarEliminar"
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
        )}
      </div>


      <ModalEditarUsuario
        usuario={usuarioAEditar}
        form={editForm}
        setEditForm={setEditForm}
        onSave={actualizarUsuario}
      />

      <ModalEliminarUsuario
        usuario={usuarioAEliminar}
        onDelete={confirmarEliminacion}
      />
    </>
  );
};

export default UserManagementPage;
