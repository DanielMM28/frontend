import React from "react";
import './UserForm.css'
import person from '../../assets/person.svg'
import email from '../../assets/email.svg'
import calling from '../../assets/call.svg'
import location from '../../assets/location.svg'

interface UserFormProps {
  user: {
    name: string,
    lastName: string,
    email: string,
    emailIns: string,
    number: string,
    direccion: string;
  }
}
const UserForm: React.FC<UserFormProps> = ({ user }) => {
  return (
    <div className="form-wrapper">

    <div className="form-card">
      <h3 className="title-right">Datos Personales</h3>
      <p className="parragraph-right">Actualiza tu Información de contacto</p>

      <div className="form-section">

        <div className="form-grid">
          <FormDatosUsu label="Nombre" value={user.name} icon={person} readOnly={true} />
          <FormDatosUsu label="Correo Personal" value={user.email} icon={email} readOnly={true} />
        </div>

        <div className="form-grid">
          <FormDatosUsu label="Apellidos" value={user.lastName} icon={person} readOnly={true} />
          <FormDatosUsu
            label="Correo Institucional"
            value={user.emailIns}
            icon={email}
            readOnly={true}
            mensaje="El correo institucional no se puede modificar"
          />
        </div>

        <div className="form-grid-solo">
          <FormDatosUsu label="Teléfono" value={user.number} icon={calling} readOnly={true} />
        </div>

        <div className="form-grid-solo">
          <FormDatosUsu label="Dirección" value={user.direccion} icon={location} readOnly={true} />
        </div>
      </div>

      <div className="contenedo-btn">
        <button className="btn btn-success">Modificar datos</button>
      </div>
    </div>
    </div>
  );
};
interface FormDatosUsuProps {
  label: string;
  value: string;
  icon: string;
  readOnly?: boolean;
  mensaje?: string;
}

const FormDatosUsu: React.FC<FormDatosUsuProps> = ({ label, value, readOnly = false, icon, mensaje }) => (
  <div className="grupo-campo">
    <label className="title-camps">{label}</label>
    <div className="input-with-icon">
      <div className="otro-div-marginado">
        <span className="input-icon">
          <img className="iconos-input" alt="iconos acompañantes" width={25} height={25} src={icon}></img>
        </span>
        <input type="text" value={value} readOnly={readOnly} className={readOnly ? 'input-readonly' : ''}></input>
      </div>
    </div>
    {mensaje && <p className="field-mensaje">{mensaje}</p>}
  </div>
)

export default UserForm