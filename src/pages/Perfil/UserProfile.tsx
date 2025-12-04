import React from "react";
import './UserProfile.css'
import UserSidebar from "./UserSidebar";
import UserForm from "./UserForm";
import UserProfileSecurity from "./UserProfileSecurity";
import UserPermission from "./UserPermission";

interface UserProfileProps {
  user: {
    id: number;
    name: string;
    lastName: string;
    rol: string;
    number: string;
    email: string;
    emailIns: string;
    direccion: string;
    avataraUrl?: string;
  }
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="profile-container">
      <div className="menu"></div>
      <div className="container-all">
        <div className="menu-superior"></div>
        <div className="separator">
          <h1 className="title-my-profile">Mi Perfil</h1>
          <p className="info-my-profile">Gestiona tu información personal y configuración de cuenta</p>

          <div className="contenedor-general">
            <div className="profile-content">
              <div className="left-user-profile">
                <UserSidebar user={user}></UserSidebar>
              </div>
              <div className="right-user-profile">
                <UserForm user={user}></UserForm>
              </div>
            </div>

            <div className="profile-security">
              <UserProfileSecurity></UserProfileSecurity>
            </div>

            <div className="profile-permission">
              <UserPermission></UserPermission>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile;