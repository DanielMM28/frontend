import { useEffect, useState } from "react";
import type { Acta, FormActa } from "./types";

interface EditarActaModalProps {
  acta: Acta | null;
  recargarActas: () => Promise<void>;
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

const EditarActaModal = ({ acta, recargarActas }: EditarActaModalProps) => {
  const [form, setForm] = useState<FormActa | null>(null);
  const [asistentes, setAsistentes] = useState<Asistente[]>([]);
  const [centros, setCentros] = useState<Centro[]>([]);
  const [comites, setComites] = useState<Comite[]>([]);
  const [fichas, setFichas] = useState<Ficha[]>([]); // Estado para cargar las fichas

  // 1. Cargar todos los selects, incluyendo Fichas
  useEffect(() => {
    const cargarSelects = async () => {
      try {
        // Se añade la llamada a fetch para fichas
        const [asiRes, cenRes, comRes, ficRes] = await Promise.all([
          fetch("http://localhost:3000/asistentes"),
          fetch("http://localhost:3000/centros"),
          fetch("http://localhost:3000/comites"),
          fetch("http://localhost:3000/fichas"), // Endpoint de Fichas
        ]);
        setAsistentes(await asiRes.json());
        setCentros(await cenRes.json());
        setComites(await comRes.json());
        setFichas(await ficRes.json()); // Guardar las fichas
      } catch (err) {
        console.error("Error cargando selects:", err);
      }
    };
    cargarSelects();
  }, []);

  // 2. Inicializar el formulario con los datos del acta
  useEffect(() => {
    if (acta) {
      setForm({
        tema: acta.tema,
        descripcion: acta.descripcion,
        version: acta.version,
        anexos: acta.anexos,
        conclusion: acta.conclusion,
        objetivo: acta.objetivo,
        fecha: acta.fecha,
        horaInicio: acta.horaInicio,
        horaFin: acta.horaFin,
        comiteTipo: acta.comiteTipo,
        centroDescripcion: acta.centroDescripcion,
        asistenteId: acta.asistenteId,
        // CORRECCIÓN CLAVE 1: Inicializa con acta.ficId o 0 si es nulo/undefined
        ficha: acta.ficId || 0, 
      });
    }
  }, [acta]);

  // 3. Función para actualizar el acta (incluyendo ficId)
  const actualizarActa = async () => {
    if (!acta || !form) return;

    // El backend espera 'ficId', que obtenemos de 'form.ficha'
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
      ficId: Number(form.ficha), // Se envía el ficId esperado por el backend
    };

    try {
      const resp = await fetch(`http://localhost:3000/actas/${acta.ID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) throw new Error("Error al actualizar acta");
      await recargarActas();
    } catch (err) {
      console.error(err);
      alert("Error al actualizar acta");
    }
  };

  if (!form) return null;

  return (
    <div className="modal fade" id="modalEditarActa" tabIndex={-1}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Acta</h5>
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

            {/* Select Centro */}
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

            {/* Select Comité */}
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

            {/* Select de Ficha Corregido */}
            <select
              className="form-select mb-2"
              // CORRECCIÓN CLAVE 2: Usamos form.ficha directamente
              value={form.ficha} 
              onChange={(e) =>
                setForm({ ...form, ficha: Number(e.target.value) })
              }
            >
              {/* Usamos value={0} para la opción por defecto, como en el de Crear */}
              <option value={0}>Selecciona una ficha</option>
              {fichas.map((f) => (
                <option key={f.ficId} value={f.ficId}>
                  {f.numeroFicha} - {f.programa}
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
              onClick={actualizarActa}
              data-bs-dismiss="modal"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarActaModal;