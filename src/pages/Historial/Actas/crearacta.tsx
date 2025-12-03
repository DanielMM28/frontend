import { useEffect, useState } from "react";
import type { FormActa } from "./types";

interface CrearActaModalProps {
  recargarActas: () => void;
}

interface Asistente {
  asiId: number;
  usuario: string;
}
interface Centro {
  cenId: number;
  cenDes: string;
}
interface Comite {
  comId: number;
  comTip: string;
}
interface Ficha {
  ficId: number;
  numeroFicha: number;
  programa: string;
  jornada: string;
  estado: string;
  instructorLider: string;
  cantidad: number;
  modalidad: string;
  fechas: { inicio: string; fin: string };
}

const CrearActaModal = ({ recargarActas }: CrearActaModalProps) => {
  const [form, setForm] = useState<FormActa>({
    tema: "",
    descripcion: "",
    version: "1.0",
    anexos: "",
    conclusion: "",
    objetivo: "",
    fecha: "",
    horaInicio: "",
    horaFin: "",
    comiteTipo: "",
    centroDescripcion: "",
    asistenteId: 0,
    ficha: 0,
  });

  const [asistentes, setAsistentes] = useState<Asistente[]>([]);
  const [centros, setCentros] = useState<Centro[]>([]);
  const [comites, setComites] = useState<Comite[]>([]);
  const [fichas, setFichas] = useState<Ficha[]>([]);

  
  useEffect(() => {
    const cargarSelects = async () => {
      try {
        const [asiRes, cenRes, comRes, ficRes] = await Promise.all([
          fetch("http://localhost:3000/asistentes"),
          fetch("http://localhost:3000/centros"),
          fetch("http://localhost:3000/comites"),
          fetch("http://localhost:3000/fichas"),
        ]);
        setAsistentes(await asiRes.json());
        setCentros(await cenRes.json());
        setComites(await comRes.json());
        setFichas(await ficRes.json());
      } catch (err) {
        console.error("Error cargando selects:", err);
      }
    };
    cargarSelects();
  }, []);

  const crearActa = async () => {
    try {
      if (
        !form.tema ||
        !form.descripcion ||
        !form.fecha ||
        !form.horaInicio ||
        !form.horaFin ||
        !form.comiteTipo ||
        !form.centroDescripcion ||
        !form.asistenteId ||
        !form.ficha
      ) {
        alert("Por favor completa todos los campos.");
        return;
      }

      const payload = {
        actTema: form.tema,
        actDes: form.descripcion,
        actVer: form.version,
        actAnexos: form.anexos,
        actCon: form.conclusion,
        actObj: form.objetivo,
        actFecha: form.fecha,
        actHoraInicio: form.horaInicio + ":00",
        actHoraFin: form.horaFin + ":00",
        comId: Number(form.comiteTipo),
        cenId: Number(form.centroDescripcion),
        asiId: Number(form.asistenteId),
        ficId: Number(form.ficha),
      };

      const res = await fetch("http://localhost:3000/actas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al crear acta");

      recargarActas();
      alert("Acta creada correctamente");

      setForm({
        tema: "",
        descripcion: "",
        version: "1.0",
        anexos: "",
        conclusion: "",
        objetivo: "",
        fecha: "",
        horaInicio: "",
        horaFin: "",
        comiteTipo: "",
        centroDescripcion: "",
        asistenteId: 0,
        ficha: 0,
      });
    } catch (err) {
      console.error(err);
      alert("Error al crear acta");
    }
  };

  return (
    <div className="modal fade" id="modalCrearActa" tabIndex={-1}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Crear Acta</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body">
            <input
              className="form-control mb-2"
              placeholder="Tema"
              value={form.tema}
              onChange={(e) => setForm({ ...form, tema: e.target.value })}
            />
            <textarea
              className="form-control mb-2"
              placeholder="Descripción"
              value={form.descripcion}
              onChange={(e) =>
                setForm({ ...form, descripcion: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              placeholder="Objetivo"
              value={form.objetivo}
              onChange={(e) => setForm({ ...form, objetivo: e.target.value })}
            />
            <input
              className="form-control mb-2"
              placeholder="Conclusión"
              value={form.conclusion}
              onChange={(e) => setForm({ ...form, conclusion: e.target.value })}
            />
            <input
              type="date"
              className="form-control mb-2"
              value={form.fecha}
              onChange={(e) => setForm({ ...form, fecha: e.target.value })}
            />
            <input
              type="time"
              className="form-control mb-2"
              value={form.horaInicio}
              onChange={(e) => setForm({ ...form, horaInicio: e.target.value })}
            />
            <input
              type="time"
              className="form-control mb-2"
              value={form.horaFin}
              onChange={(e) => setForm({ ...form, horaFin: e.target.value })}
            />

            {/* Select Asistente */}
            <select
              className="form-select mb-2"
              value={form.asistenteId}
              onChange={(e) =>
                setForm({ ...form, asistenteId: Number(e.target.value) })
              }
            >
              <option value={0}>Selecciona un asistente</option>
              {asistentes.map((a) => (
                <option key={a.asiId} value={a.asiId}>
                  {a.usuario}
                </option>
              ))}
            </select>
            <select
              className="form-select mb-2"
              value={form.centroDescripcion}
              onChange={(e) =>
                setForm({ ...form, centroDescripcion: e.target.value })
              }
            >
              <option value="">Selecciona un centro</option>
              {centros.map((c) => (
                <option key={c.cenId} value={c.cenId}>
                  {c.cenDes}
                </option>
              ))}
            </select>

            <select
              className="form-select mb-2"
              value={form.comiteTipo}
              onChange={(e) => setForm({ ...form, comiteTipo: e.target.value })}
            >
              <option value="">Selecciona un comité</option>
              {comites.map((c) => (
                <option key={c.comId} value={c.comId}>
                  {c.comTip}
                </option>
              ))}
            </select>

            <select
              className="form-select mb-2"
              value={form.ficha}
              onChange={(e) =>
                setForm({ ...form, ficha: Number(e.target.value) })
              }
            >
              <option value={0}>Selecciona una ficha</option>
              {fichas.map((f) => (
                <option key={f.ficId} value={f.ficId}>
                  {f.numeroFicha} - {f.programa} - {f.jornada} ({f.estado})
                </option>
              ))}
            </select>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button
              className="btn btn-success"
              onClick={crearActa}
              data-bs-dismiss="modal"
            >
              Crear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearActaModal;
