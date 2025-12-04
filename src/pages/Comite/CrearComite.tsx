import { useState } from "react";
import "./CrearComite.css";

const Icon = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <span className={`icon ${className}`}>{children}</span>
);

const CrearComite = () => {
  const [step, setStep] = useState(1);
  const [comiteMembers, setComiteMembers] = useState(["Instructor 1", "Coordinador 2", "Funcionario 3"]); // Simulación de miembros

  const [formData, setFormData] = useState({
    nombreComite: "",
    tipoComite: "",
    fechaSesion: "",
    hora: "",
    modalidad: "",
    lugar: "",
    fichasInvolucradas: "",
    aprendiz: "",
    asistentesExtra: "",
    agenda: "",
    objetivos: "",
    conclusiones: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => step < 4 && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  const progress = (step / 4) * 100;

  const removeMember = (member: string) => {
    setComiteMembers(comiteMembers.filter(m => m !== member));
  };

  return (
    <div className="crear-wrapper">
      <div className="crear-content">

        {/* HEADER */}
        <div className="crear-header">
          <div>
            <h2>Crear nuevo comité</h2>
            <p>Complete la información para programar una nueva sesión</p>
          </div>
          <button className="btn-cancel">Cancelar</button>
        </div>

        {/* STEPPER */}
        <div className="stepper-card">
          <div className="stepper-header">
            <span>Paso {step} de 4</span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="steps-row">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="step-item">
                <div className={`step-circle ${step >= n ? "active" : ""}`}>
                  {n}
                </div>
                <span className="step-label">
                  {n === 1 && "Información básica"}
                  {n === 2 && "Fichas y aprendices"}
                  {n === 3 && "Asistencia"}
                  {n === 4 && "Finalización"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="form-card">

          {step === 1 && (
            <>
              <h3><b>Información del comité</b></h3>
              <p className="sub">Datos generales del comité</p>

              <div className="form-grid">

                <div className="field">
                  <label>Nombre del comité</label>
                  <input type="text" name="nombreComite" value={formData.nombreComite} onChange={handleChange} />
                </div>

                <div className="field">
                  <label>Tipo de comité</label>
                  <input type="text" name="tipoComite" value={formData.tipoComite} onChange={handleChange} />
                </div>

                <div className="form-inline">
                  <div className="field">
                    <label>Fecha de sesión</label>
                    <input type="date" name="fechaSesion" value={formData.fechaSesion} onChange={handleChange} />
                  </div>
                  <div className="field">
                    <label>Hora</label>
                    <input type="time" name="hora" value={formData.hora} onChange={handleChange} />
                  </div>
                </div>

                <div className="field">
                  <label>Modalidad</label>
                  <input type="text" name="modalidad" value={formData.modalidad} onChange={handleChange} />
                </div>

                <div className="field">
                  <label>Lugar</label>
                  <input type="text" name="lugar" value={formData.lugar} onChange={handleChange} />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3><b>Fichas y aprendices involucrados</b></h3>
              <p className="sub">Datos de las fichas y aprendices para el comité</p>

              <div className="form-grid">
                <div className="field">
                  <label>Fichas involucradas</label>
                  <input type="text" name="fichasInvolucradas" value={formData.fichasInvolucradas} onChange={handleChange} />
                </div>

                <div className="field">
                  <label>Aprendiz involucrado</label>
                  <input type="text" name="aprendiz" value={formData.aprendiz} onChange={handleChange} />
                </div>

                <div className="btns-row-step2">
                  <button className="btn-gray">Todos los aprendices</button>
                  <button className="btn-green">Seleccionar</button>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="miembros-section">
                  <h4>Miembros del comité</h4>
                  <p className="sub">Seleccione los miembros oficiales del comité</p>
                  
                  <div className="miembros-container">
                      {comiteMembers.map((member) => (
                          <div key={member} className="member-tag">
                              <span>{member}</span>
                              <button onClick={() => removeMember(member)}>x</button>
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
                          onChange={handleChange} 
                          placeholder="Ingrese nombres, cargos o correos de asistentes adicionales..."
                      />
                  </div>
                  <button className="btn-agregar-extras">Agregar extras</button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h3><b>Finalización</b></h3>
              <p className="sub">Observaciones y documentos finales</p>

              <h4>Observaciones</h4>
              <div className="obs-doc-grid">
                
                <div className="field-with-add">
                    <div className="field">
                        <label>Agenda o puntos a desarrollar</label>
                        <input type="text" name="agenda" value={formData.agenda} onChange={handleChange} />
                    </div>
                    <button className="btn-add-point">+</button>
                </div>

                <div className="field-with-add">
                    <div className="field">
                        <label>Objetivos de la reunión</label>
                        <input type="text" name="objetivos" value={formData.objetivos} onChange={handleChange} />
                    </div>
                    <button className="btn-add-point">+</button>
                </div>

                <div className="field" style={{ gridColumn: '1 / -1' }}>
                  <label>Conclusiones</label>
                  <textarea name="conclusiones" value={formData.conclusiones} onChange={handleChange} />
                </div>
              </div>
              
             
              <h4>Documentos</h4>
              <p className="sub">Documentos previos, durante o posteriores al comité</p>
              <div className="document-upload-card">
                  <span className="icon">↑</span>
                  <p>Haz clic para subir tus documentos</p>
              </div>

            </>
          )}
        </div>

        <div className="step-buttons">
          <button className="btn-nav" onClick={prevStep} disabled={step === 1}>
            ‹ Anterior
          </button>

          <button className="btn-nav" onClick={nextStep}>
            {step === 4 ? "Finalizar" : "Siguiente ›"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default CrearComite;



