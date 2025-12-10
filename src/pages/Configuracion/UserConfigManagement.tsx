import React from "react";
import ConfigUserForm from "./UserBasicDates";
import './userConfigManagement.css'
import arrowLeft from './assets/arrow-left.svg'

interface userConfigGenerlProps {
  user: {
    tipoIdentificacion: string,
    documento: string,
    fechaExpedicionDoc: string,
    paisExpedicionDoc: string,
    municipioExpedicionDoc: string,
    firstName: string,
    secondName: string,
    firstLastName: string,
    secondLastName: string,
    fechaNacimiento: string,
    email: string,
    emailSoySena: string,
    paisNacimiento: string,
    departamentoNacimiento: string,
    municipioNacimiento: string,
    paisActual: string,
    departamentoActual: string,
    municipioActual: string,
    direccionResidencia: string,
    celular: string;
  };
}

const UserConfig: React.FC<userConfigGenerlProps> = ({ user }) => {
  return (
    <div className="contenedor">
      <div className="menu-top"></div>
      <div className="grid-de-prueba">
        <div className="menu-left"></div>
        <div className="informacion">
          <div className="contenedor-initiall">
            <span className="btnLeft">
              <img src={arrowLeft}></img>
            </span>
            <div className="textoo">
              <h2>Datos Personales</h2>
              <p>Actualiza tu información personal, de residencia y mejora tu seguridad</p>
            </div>
          </div>
          <ConfigUserForm user={user}></ConfigUserForm>
        </div>
      </div>
    </div>
  )
}

export default UserConfig;