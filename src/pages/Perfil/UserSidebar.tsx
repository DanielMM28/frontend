import React from "react";
import './UserSidebar.css'

interface UserSidebarProps {
  user: {
    name: string,
    lastName: string,
    emailIns: string,
    rol: string,
    avatarUrl?: string;
  };
}

const UserSidebar: React.FC<UserSidebarProps> = ({ user }) => {
  const NombreCompl = `${user.name} ${user.lastName}`;
  const fechaDeAcceso = "2025-12-02 10:30";

  return (
    <div className="sidebar-container">
      <div className="contenedo-marginado">
        <h3 className="title-left-profile">Información de Usuario</h3>

        <div className="avatar-sesion">
          <div className="container-img">
            {user.avatarUrl && user.avatarUrl.length > 0 ? (
              <img src={user.avatarUrl} alt={`Avatar de ${NombreCompl}`} className="avatar-image" width={120} height={120} />
            ) : (
              <div className="avatar-placeholder">{NombreCompl.charAt(0)}</div>
            )}
          </div>
          <p className="user-nombr-compl">{NombreCompl}</p>
          <p className="user-email-ins">{user.emailIns}</p>
          <div className="user-rol"><span className="role-useer">{user.rol}</span></div>
          <button className="cambiar-foto-btn">Cambiar foto</button>
        </div>

        <div className="info-detalles">
          <p className="center-text"><i className="icon-sena iconos"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#494949"><path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/></svg></i>Centro Industrial y de Aviación</p>
          <p className="center-text"><i className="icon-calendario iconos"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#494949"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg></i>Miembro desde: Enero 2007</p>
          <p className="center-text"><i className="icon-reloj iconos"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#494949"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/></svg></i>Último acceso: {fechaDeAcceso}</p>
        </div>
      </div>
    </div>
  )
}

export default UserSidebar;