const Step2FichasAprendices = ({ formData, onChange }: any) => {
  return (
    <>
      <h3><b>Fichas y aprendices involucrados</b></h3>
      <p className="sub">Datos de las fichas y aprendices para el comité</p>

      <div className="form-grid">

        <div className="field">
          <label>Fichas involucradas</label>
          <input type="text" name="fichasInvolucradas" value={formData.fichasInvolucradas} onChange={onChange} />
        </div>

        <div className="field">
          <label>Aprendiz involucrado</label>
          <input type="text" name="aprendiz" value={formData.aprendiz} onChange={onChange} />
        </div>

        <div className="btns-row-step2">
          <button className="btn-gray">Todos los aprendices</button>
          <button className="btn-green">Seleccionar</button>
        </div>
      </div>
    </>
  );
};

export default Step2FichasAprendices;
