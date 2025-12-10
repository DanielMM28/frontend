// CrearComite.tsx
import React, { useEffect, useState } from "react";
import "./CrearComite.css";
import type { FormDataComite } from "./types";
import { getFichas, getAprendices, getUsuariosMiembros } from "./catalogservices";
import { ToastContainer, toast } from "react-toastify";

import Step1InfoBasica from "./pasos/paso1";
import Step2FichasAprendices from "./pasos/paso2";
import Step3Asistencia from "./pasos/paso3";
import Step4Finalizacion from "./pasos/paso 4";

import "react-toastify/dist/ReactToastify.css";

const CrearComite = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // catálogos
  const [fichas, setFichas] = useState<any[]>([]);
  const [aprendices, setAprendices] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);

  // estado principal del formulario
  const [formData, setFormData] = useState<FormDataComite>({
    tema: "",
    descripcion: "",
    objetivo: "",
    conclusion: "",
    fecha: "",
    horaInicio: "",
    horaFin: "",
    version: "1.0",
    anexos: null,
    Ficha: null,
    fichasInvolucradas: [],
    aprendices: [],
    miembrosComite: [],
    asistentesExtra: [],
    agenda: [],
    objetivosLista: [],
  } as FormDataComite);

  useEffect(() => {
    // cargar catálogos al montar
    const load = async () => {
      try {
        const [f, a, u] = await Promise.all([getFichas(), getAprendices(), getUsuariosMiembros()]);
        setFichas(f);
        setAprendices(a);
        setUsuarios(u);
      } catch (err) {
        console.error("Error cargando catálogos", err);
        toast.error("No se pudieron cargar datos maestros. Revisa la conexión.");
      }
    };
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // para selects múltiples (fichas/aprendices/miembros)
  const handleSelectMany = (name: string, values: number[]) => {
    setFormData((prev) => ({ ...prev, [name]: values }));
  };

  const nextStep = () => (step < 4 ? setStep(step + 1) : handleSubmit());
  const prevStep = () => step > 1 && setStep(step - 1);

  const validateBeforeSubmit = () => {
    if (!formData.tema) {
      toast.warn("El tema (nombre del comité) es obligatorio");
      return false;
    }
    if (!formData.fecha) {
      toast.warn("Selecciona una fecha");
      return false;
    }
    if (!formData.horaInicio) {
      toast.warn("Indica hora de inicio");
      return false;
    }
    // otras validaciones según tu negocio
    return true;
  };

  const handleSubmit = async () => {
  if (!validateBeforeSubmit()) return;

  const payload: any = {
    tema: formData.tema,
    descripcion: formData.descripcion,
    objetivo: formData.objetivo,
    conclusion: formData.conclusion,
    version: formData.version ?? "1.0",
    anexos: formData.anexos ?? null,
    fecha: formData.fecha,
    horaInicio: formData.horaInicio,
    horaFin: formData.horaFin || "00:00:00",

    Ficha: formData.Ficha ?? (formData.fichasInvolucradas?.[0] ?? null),

    fichas: formData.fichasInvolucradas ?? [],
    aprendices: formData.aprendices ?? [],
    miembrosComite: formData.miembrosComite ?? [],
    asistentesExtra: formData.asistentesExtra ?? [],
    agenda: formData.agenda ?? [],
    objetivosLista: formData.objetivosLista ?? [],
  };

  try {
    setLoading(true);

    const res = await fetch("http://localhost:3000/api/comites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.message || "Error al crear el comité");
    }

    toast.success("✅ Comité creado correctamente");

    // ✅ Opcional: limpiar formulario
    setFormData({
      tema: "",
      descripcion: "",
      objetivo: "",
      conclusion: "",
      fecha: "",
      horaInicio: "",
      horaFin: "",
      version: "1.0",
      anexos: null,
      Ficha: null,
      fichasInvolucradas: [],
      aprendices: [],
      miembrosComite: [],
      asistentesExtra: [],
      agenda: [],
      objetivosLista: [],
    } as FormDataComite);

    setStep(1);

  } catch (err: any) {
    console.error("Error al crear comité:", err);
    toast.error(err.message || "❌ Error creando comité");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="crear-wrapper">
      <ToastContainer />
      <div className="crear-content">
        <div className="crear-header">
          <div>
            <h2>Crear nuevo comité</h2>
            <p>Complete la información para programar una nueva sesión</p>
          </div>
          <button className="btn-cancel">Cancelar</button>
        </div>

        <div className="stepper-card">
          <div className="stepper-header">
            <span>Paso {step} de 4</span>
            <span>{Math.round((step / 4) * 100)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }} />
          </div>
          <div className="steps-row">
            {["Información básica", "Fichas y aprendices", "Asistencia", "Finalización"].map(
              (label, index) => (
                <div key={index} className="step-item">
                  <div className={`step-circle ${step >= index + 1 ? "active" : ""}`}>{index + 1}</div>
                  <span className="step-label">{label}</span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="form-card">
          {step === 1 && <Step1InfoBasica formData={formData} onChange={handleChange} />}

          {step === 2 && (
            <Step2FichasAprendices
              formData={formData}
              onChange={handleChange}
              fichas={fichas}
              aprendices={aprendices}
              onSelectMany={(name: string, values: number[]) => handleSelectMany(name, values)}
            />
          )}

          {step === 3 && (
            <Step3Asistencia
              usuarios={usuarios}
              formData={formData}
              onChange={handleChange}
              onSelectMany={(name: string, values: number[]) => handleSelectMany(name, values)}
            />
          )}

          {step === 4 && <Step4Finalizacion formData={formData} onChange={handleChange} />}
        </div>

        <div className="step-buttons">
          <button className="btn-nav" onClick={prevStep} disabled={step === 1 || loading}>
            ‹ Anterior
          </button>
          <button className="btn-nav" onClick={nextStep} disabled={loading}>
            {loading ? "Guardando..." : step === 4 ? "Finalizar" : "Siguiente ›"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrearComite;
