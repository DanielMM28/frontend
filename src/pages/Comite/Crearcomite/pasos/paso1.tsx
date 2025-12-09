const Step1InfoBasica = ({ formData, onChange }: any) => {
  return (
    <>
      <h3><b>Información del comité</b></h3>
      <p className="sub">Datos generales del comité</p>

      <div className="form-grid">

        <div className="field">
          <label>Nombre del comité</label>
          <input type="text" name="nombreComite" value={formData.nombreComite} onChange={onChange} />
        </div>

        <div className="field">
          <label>Tipo de comité</label>
          <input type="text" name="tipoComite" value={formData.tipoComite} onChange={onChange} />
        </div>

        <div className="form-inline">
          <div className="field">
            <label>Fecha de sesión</label>
            <input type="date" name="fechaSesion" value={formData.fechaSesion} onChange={onChange} />
          </div>
          <div className="field">
            <label>Hora</label>
            <input type="time" name="hora" value={formData.hora} onChange={onChange} />
          </div>
        </div>

        <div className="field">
          <label>Centro</label>
          <input type="text" name="centro" value={formData.centro} onChange={onChange} />
        </div>

        <div className="field">
          <label>Lugar</label>
          <input type="text" name="lugar" value={formData.lugar} onChange={onChange} />
        </div>
      </div>
    </>
  );
};

export default Step1InfoBasica;
