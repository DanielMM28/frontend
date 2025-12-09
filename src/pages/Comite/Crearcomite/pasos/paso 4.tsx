const Step4Finalizacion = ({ formData, onChange }: any) => {
  return (
    <>
      <h3><b>Finalización</b></h3>
      <p className="sub">Observaciones y documentos finales</p>

      <h4>Observaciones</h4>
      <div className="obs-doc-grid">

        <div className="field-with-add">
          <div className="field">
            <label>Agenda</label>
            <input type="text" name="agenda" value={formData.agenda} onChange={onChange} />
          </div>
          <button className="btn-add-point">+</button>
        </div>

        <div className="field-with-add">
          <div className="field">
            <label>Objetivos</label>
            <input type="text" name="objetivos" value={formData.objetivos} onChange={onChange} />
          </div>
          <button className="btn-add-point">+</button>
        </div>

        <div className="field" style={{ gridColumn: "1 / -1" }}>
          <label>Conclusiones</label>
          <textarea name="conclusiones" value={formData.conclusiones} onChange={onChange} />
        </div>
      </div>

      <h4>Documentos</h4>
      <p className="sub">Documentos previos o posteriores al comité</p>

      <div className="document-upload-card">
        <span className="icon">↑</span>
        <p>Haz clic para subir documentos</p>
      </div>
    </>
  );
};

export default Step4Finalizacion;
