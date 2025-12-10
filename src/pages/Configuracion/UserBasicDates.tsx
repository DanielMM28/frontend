import React, { useState } from "react";
import UserProfileSecurity from "./UserProfileSecurity";
import '././UserBasicDates.css'

interface userConfigProps {
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

interface inputConfigUsuProps {
  label: string;
  value: string;
  readOnly?: boolean;
  options?: string[];
  anyValueChange?: (newValue: string) => void;
  type?: "text" | "date";
}

interface ControlDropProps {
  value: string;
  readOnly: boolean;
  options?: string[];
  type: "text" | "date";
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ControlDrop: React.FC<ControlDropProps> = ({
  value,
  readOnly,
  options,
  type,
  onChange,
}) => {
  const isDropdown = options && options.length > 0;

  if (isDropdown) {
    return (
      <select
        value={value}
        disabled={readOnly}
        onChange={onChange}
        className={readOnly ? "input-readonly" : ""}
      >
        {!options.includes(value) && (
          <option value={value} disabled>
            {value}
          </option>
        )}

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type={type}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      className={readOnly ? "input-readonly" : ""}
    />
  );
};


const InputConfigUsu: React.FC<inputConfigUsuProps> = ({
  label,
  value,
  readOnly = false,
  options,
  anyValueChange,
  type = "text",
}) => {
  const isEditable = !readOnly && anyValueChange;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (isEditable) anyValueChange!(e.target.value);
  };

  return (
    <div className="group-form">
      <label className="title-camps">{label}</label>
      <div className="input">
        <ControlDrop
          value={value}
          readOnly={readOnly}
          options={options}
          type={type}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

const DefaultUser: userConfigProps = {
  user: {
    tipoIdentificacion: "Cédula de Ciudadanía",
    documento: "103258741",
    fechaExpedicionDoc: "24-01-2007",
    paisExpedicionDoc: "Colombia",
    municipioExpedicionDoc: "Bogotá D.C.",
    firstName: "Gabriella",
    secondName: "",
    firstLastName: "Julio",
    secondLastName: "Cantillo",
    fechaNacimiento: "24-01-2007",
    email: "gabriellajuliocantillo@gmail.com",
    emailSoySena: "gjulio@sena.edu.co",
    paisNacimiento: "Colombia",
    departamentoNacimiento: "Atlántico",
    municipioNacimiento: "Barranquilla",
    paisActual: "Colombia",
    departamentoActual: "Atlántico",
    municipioActual: "Barranquilla",
    direccionResidencia: "Calle 123 #45-67",
    celular: "3150231136",
  },
};

const ConfigUserForm: React.FC<{ user: userConfigProps["user"] }> = ({
  user,
}) => {
  const [usuario, setUsuario] = useState(user);

  const handleUserChange = (
    field: keyof userConfigProps["user"],
    value: string
  ) => {
    setUsuario((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const identificationOpt = [
    "Cédula de Ciudadanía",
    "Tarjeta de Identidad",
    "Cédula de Extranjería",
  ];
  const paisesOpt = ["Colombia", "Ecuador", "Perú", "Chile"];
  const departamentosOpt = ["Atlántico", "Bolívar", "Cesar", "Córdoba"];
  const municipiosOpt = [
    "Barranquilla",
    "Montebello",
    "Bogotá D.C",
    "Medellín",
  ];

  return (
    <div className="contenedor">
      <div className="contenedor-padding">
        <form>
          <div className="basic-data-form">
            <h3>Datos Básicos</h3>
            <p>Información de identificación y datos personales</p>

            <div className="container-first">
              <InputConfigUsu
                label="Tipo de identificación"
                value={usuario.tipoIdentificacion}
                options={identificationOpt}
                anyValueChange={(v) =>
                  handleUserChange("tipoIdentificacion", v)
                }
                readOnly
              />

              <InputConfigUsu
                label="Documento de identidad"
                value={usuario.documento}
                anyValueChange={(v) => handleUserChange("documento", v)}
                readOnly
              />
            </div>

            <div className="container-second">
              <InputConfigUsu
                label="Fecha Expedición Documento"
                value={usuario.fechaExpedicionDoc}
                type="date"
                anyValueChange={(v) => handleUserChange("fechaExpedicionDoc", v)}
                readOnly
              />

              <InputConfigUsu
                label="País de Expedición"
                value={usuario.paisExpedicionDoc}
                readOnly
              />

              <InputConfigUsu
                label="Municipio de Expedición"
                value={usuario.municipioExpedicionDoc}
                readOnly
              />
            </div>

            <div className="container-third">
              <InputConfigUsu
                label="Primer nombre"
                value={usuario.firstName}
                anyValueChange={(v) => handleUserChange("firstName", v)}
                readOnly
              />

              <InputConfigUsu
                label="Segundo nombre"
                value={usuario.secondName}
                anyValueChange={(v) => handleUserChange("secondName", v)}
                readOnly
              />
            </div>

            <div className="container-fourth">
              <InputConfigUsu
                label="Primer apellido"
                value={usuario.firstLastName}
                anyValueChange={(v) =>
                  handleUserChange("firstLastName", v)
                }
                readOnly
              />

              <InputConfigUsu
                label="Segundo apellido"
                value={usuario.secondLastName}
                anyValueChange={(v) =>
                  handleUserChange("secondLastName", v)
                }
                readOnly
              />
            </div>

            <div className="container-fifth">
              <InputConfigUsu
                label="Fecha de Nacimiento"
                value={usuario.fechaNacimiento}
                type="date"
                anyValueChange={(v) =>
                  handleUserChange("fechaNacimiento", v)
                }
                readOnly
              />

              <InputConfigUsu
                label="Correo Electrónico"
                value={usuario.email}
                anyValueChange={(v) => handleUserChange("email", v)}
              />
            </div>

            <div className="container-sixth">
              <InputConfigUsu
                label="Cuenta Soy SENA"
                value={usuario.emailSoySena}
                readOnly={true}
              />

              <InputConfigUsu
                label="País de Nacimiento"
                value={usuario.paisNacimiento}
                readOnly
              />

              <InputConfigUsu
                label="Departamento de Nacimiento"
                value={usuario.departamentoNacimiento}
                readOnly
              />
            </div>

            <div className="container-seventh">
              <InputConfigUsu
                label="Municipio de Nacimiento"
                value={usuario.municipioNacimiento}
                readOnly
              />
            </div>
          </div>

          <div className="residence-form">
            <h3>Lugar de Residencia</h3>
            <p>Información de tu ubicación actual</p>

            <div className="scontainer-first">
              <InputConfigUsu
                label="País"
                value={usuario.paisActual}
                options={paisesOpt}
                anyValueChange={(v) => handleUserChange("paisActual", v)}
              />

              <InputConfigUsu
                label="Departamento"
                value={usuario.departamentoActual}
                options={departamentosOpt}
                anyValueChange={(v) =>
                  handleUserChange("departamentoActual", v)
                }
              />

              <InputConfigUsu
                label="Municipio"
                value={usuario.municipioActual}
                options={municipiosOpt}
                anyValueChange={(v) =>
                  handleUserChange("municipioActual", v)
                }
              />
            </div>

            <div className="scontainer-second">
              <InputConfigUsu
                label="Dirección de Residencia"
                value={usuario.direccionResidencia}
                anyValueChange={(v) =>
                  handleUserChange("direccionResidencia", v)
                }
              />

              <InputConfigUsu
                label="Celular"
                value={usuario.celular}
                anyValueChange={(v) => handleUserChange("celular", v)}
              />
            </div>
          </div>

          <div className="security-form">
            <UserProfileSecurity />
          </div>

          <div className="container-btn">
            <button type="submit" className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-update">
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfigUserForm;