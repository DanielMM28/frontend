import React from "react";
import './UserProfileSec.css'
import key from './assets/key.svg'
import shield from './assets/shield-lock.svg'

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
        <img className="icon-de-seguridad" src={icon} alt="icono"/>
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
        <ItemsSec
          title="Contraseña"
          subtitle="Última actualización: hace 2 meses"
          icon={key}
          btnT="Cambiar Contraseña"
          action={cambiarContra}
        />

        <ItemsSec
          title="Autenticación de Dos Factores (2FA)"
          subtitle="No habilitada"
          icon={shield}
          btnT="Habilitar 2FA"
          action={habilitar2FA}
        />
      </div>
    </div>
  )
}

export default UserProfileSecurity
