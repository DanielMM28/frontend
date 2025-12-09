const Step3Asistencia = ({ comiteMembers = [], removeMember, formData, onChange }: any) => {
  return (
    <>
      <div className="miembros-section">
        <h4>Miembros del comité</h4>
        <p className="sub">Seleccione los miembros oficiales del comité</p>

        <div className="miembros-container">
          {comiteMembers?.map((m: string) => (
            <div key={m} className="member-tag">
              <span>{m}</span>
              <button onClick={() => removeMember(m)}>x</button>
            </div>
          ))}
        </div>

        <button className="btn-buscar-miembros">Buscar miembros</button>
      </div>

      <div className="asistentes-extra-section">
        <h4>Asistentes extras</h4>

        <div className="field">
          <label>Lista de asistentes extras</label>
          <textarea
            name="asistentesExtra"
            value={formData.asistentesExtra}
            onChange={onChange}
            placeholder="Ingrese nombres, cargos o correos..."
          />
        </div>

        <button className="btn-agregar-extras">Agregar extras</button>
      </div>
    </>
  );
};

export default Step3Asistencia;
