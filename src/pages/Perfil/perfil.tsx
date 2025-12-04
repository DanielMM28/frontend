import { useState, useEffect } from "react";
import "./perfil.css";
import { FaUserCircle } from "react-icons/fa";

interface Usuario {
  usuNom?: string;
  usuApe?: string;
  usuCorreo?: string;
  usuTel?: string;
  usuUsuario?: string;
  usuFoto?: string;
  rol?: {
    rolDes?: string;
  };
}

const PerfilPage = () => {
  const [usuario, setUsuario] = useState<Usuario>({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUsuario(userData);
  }, []);

  return (
    <div className="perfil-container">
      <div className="perfil-card">

        {/* FOTO */}
        <div className="perfil-avatar">
          {usuario.usuFoto ? (
            <img src={usuario.usuFoto} alt="Foto de perfil" className="perfil-img" />
          ) : (
            <FaUserCircle size={120} color="#aaa" />
          )}
        </div>

        {/* NOMBRE */}
        <h2 className="perfil-nombre">
          {usuario.usuNom} {usuario.usuApe}
        </h2>

        {/* ROL */}
        <p className="perfil-rol">{usuario.rol?.rolDes || "Sin rol asignado"}</p>

        <hr />

        {/* INFO */}
        <div className="perfil-info">
          <p><strong>Correo:</strong> {usuario.usuCorreo || "No registrado"}</p>
          <p><strong>Teléfono:</strong> {usuario.usuTel || "No registrado"}</p>
          <p><strong>Usuario:</strong> {usuario.usuUsuario || "No disponible"}</p>
        </div>

        <div className="perfil-buttons">
          <button className="btn btn-primary">Editar Perfil</button>
          <button className="btn btn-secondary">Cambiar Contraseña</button>
        </div>

      </div>
    </div>
  );
};

export default PerfilPage;
