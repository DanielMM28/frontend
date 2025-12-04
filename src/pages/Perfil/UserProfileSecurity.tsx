import React from "react";
import './UserProfileSec.css'

const UserProfileSecurity: React.FC = () => {
  const ItemsSec: React.FC<{
    title: string
    subtitle: string
    icon: string
    btnT: string
    action: () => void
  }> = ({ title, subtitle, icon, btnT, action }) => (
    <div className="carta-de-seguridad">
      <div className="info-de-seguridad">
        <span className="icon-de-seguridad">{icon}</span>
        <div>
          <p className="titulo-de-seguridad">{title}</p>
          <p className="subtititulo-de-seguridad">{subtitle}</p>
        </div>
      </div>
      <button className="btn-de-seguridad" onClick={action}>
        {btnT}
      </button>
    </div>
  )

  const cambiarContra = () => {
    console.log("Action: Cambiar contraseña");
    alert("Cambio de contraseña...")
  }

  const habilitar2FA = () => {
    console.log("Action: Habilitar 2FA")
    alert("Autenticación de dos factores")
  }

  return (
    <div className="containers">
      <h2>Seguridad</h2>
      <p className="descripcion-de-seguridad">Gestiona la seguridad de tu cuenta</p>

      <div className="lista-de-seguridad">
        <ItemsSec title="Contraseña" subtitle="Última actualización: hace 2 meses" icon="🔑" btnT="Cambiar Contraseña" action={cambiarContra}></ItemsSec>
        <ItemsSec title="Autenticación de Dos Factores (2FA)" subtitle="No habilitada" icon="🛡️" btnT="Habilitar 2FA" action={habilitar2FA}></ItemsSec>
      </div>
    </div>
  )
}

export default UserProfileSecurity