import { Modal, Button, Form, Spinner } from "react-bootstrap";
// Importa FichaEditada si decides usar el DTO con los campos adicionales
import type { FichaFront, FichaEditada } from "./types";
import { useEffect, useState } from "react";

// URL de la API (Asegúrate de cambiar esto a tu ENDPOINT real)
const API_URL = "http://localhost:3000/fichas";

const PROGRAMA_MAP: Record<string, number> = {
  "SISTEMAS": 1,
  "ADSI": 2,
  "GESTIÓN": 3,
  "REDES": 4, 
  "ELECTRÓNICA": 5,
};

interface EditarFichaProps {
  show: boolean;
  onClose: () => void;
  ficha: FichaFront | null;
  onUpdate: () => void;
}

const EditarFicha = ({ show, onClose, ficha, onUpdate }: EditarFichaProps) => {
  const [form, setForm] = useState({
    numeroFicha: "",
    programa: "",
    jornada: "DIURNA",
    cantidad: "",
    instructorLider: "",
    modalidad: "PRESENCIAL",
    estado: "EN FORMACIÓN",
    inicio: "",
    fin: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ficha) {
      setForm({
        numeroFicha: String(ficha.numeroFicha || ""),
        programa: ficha.programa || "",
        jornada: ficha.jornada || "DIURNA",
        cantidad: String(ficha.cantidad || ""),
        instructorLider: ficha.instructorLider || "",
        modalidad: ficha.modalidad || "PRESENCIAL",
        estado: ficha.estado || "EN FORMACIÓN",
        inicio: ficha.fechas.inicio || "",
        fin: ficha.fechas.fin || "",
      });
      setError(null); // Limpiar errores al abrir
    }
  }, [ficha]);

  // CORRECCIÓN DEL ERROR DE TYPESCRIPT: 
  // Se añade HTMLTextAreaElement para cubrir todos los elementos de Form.Control
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateDates = () => {
    if (new Date(form.inicio) > new Date(form.fin)) {
      setError("La Fecha Fin no puede ser anterior a la Fecha Inicio.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleUpdate = async () => {
    if (!ficha || loading) return;

    if (!validateDates()) {
      return;
    }

    const programaId = PROGRAMA_MAP[form.programa];
    if (!programaId) {
      setError("El programa no tiene ID asignado. Por favor, revisa el mapeo.");
      return;
    }

    // DTO ORIGINAL (ASUMIENDO que el backend no necesita ficNum ni ficInsLid)
    let dto: any = {
      ficId: ficha.ficId,
      ficFecIni: form.inicio,
      ficFecFin: form.fin,
      ficEst: form.estado,
      ficMod: form.modalidad,
      ficJor: form.jornada,
      ficCant: Number(form.cantidad),
      proIdfk: programaId,
    };
    
    /* // DTO SUGERIDO (SI LA API FALLÓ PORQUE FALTABAN ficNum O ficInsLid)
    dto = {
       ...dto,
       ficNum: Number(form.numeroFicha), 
       ficInsLid: form.instructorLider,
    };
    */

    setLoading(true);
    setError(null);

    try {
      // 2. Enviar la petición al backend (PATCH o PUT)
      const resp = await fetch(`${API_URL}/${ficha.ficId}`, {
        method: "PATCH", // Usar PATCH o PUT según tu API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dto),
      });

      if (!resp.ok) {
        // Mejorar el manejo de errores: intentar leer la respuesta JSON del servidor
        const errorData = await resp.json().catch(() => ({ message: "Respuesta de error no JSON." }));
        // Si el servidor devuelve un mensaje en el cuerpo, lo usamos. Si no, usamos el mensaje genérico.
        throw new Error(errorData.message || "Error al guardar: la API respondió con un error.");
      }
      
      // 3. Si es exitoso: notificar al componente padre y cerrar el modal
      onUpdate();
      onClose();

    } catch (err: any) {
      console.error("Error actualizando ficha:", err);
      setError(`Error al guardar los cambios: ${err.message || "Fallo en la conexión."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      size="lg"
      className="rounded-4 shadow"
    >
      <Modal.Header closeButton className="bg-primary text-white rounded-top">
        <Modal.Title>
          ✏️ Editar Ficha: **{ficha?.numeroFicha || "Cargando..."}**
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Mostrar mensaje de error si existe */}
        {error && (
          <div className="alert alert-danger" role="alert">
            **Error:** {error}
          </div>
        )}
        
        <Form className="row g-3">
          <Form.Group className="col-md-6">
            <Form.Label>Número Ficha</Form.Label>
            <Form.Control
              name="numeroFicha"
              value={form.numeroFicha}
              onChange={handleChange}
              disabled={loading} // Deshabilitar durante la carga
            />
          </Form.Group>

          <Form.Group className="col-md-6">
            <Form.Label>Programa</Form.Label>
            <Form.Select
              name="programa"
              value={form.programa}
              onChange={handleChange}
              disabled={loading}
            >
              <option>SISTEMAS</option>
              <option>ADSI</option>
              <option>GESTIÓN</option>
              {/* Puedes añadir más opciones si es necesario */}
            </Form.Select>
          </Form.Group>

          <Form.Group className="col-md-6">
            <Form.Label>Jornada</Form.Label>
            <Form.Select name="jornada" value={form.jornada} onChange={handleChange} disabled={loading}>
              <option>DIURNA</option>
              <option>NOCTURNA</option>
              <option>FIN DE SEMANA</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="col-md-6">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              name="cantidad"
              value={form.cantidad}
              onChange={handleChange}
              disabled={loading}
              min="1" 
            />
          </Form.Group>

          <Form.Group className="col-md-6">
            <Form.Label>Instructor Líder</Form.Label>
            <Form.Control
              name="instructorLider"
              value={form.instructorLider}
              onChange={handleChange}
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="col-md-6">
            <Form.Label>Modalidad</Form.Label>
            <Form.Select name="modalidad" value={form.modalidad} onChange={handleChange} disabled={loading}>
              <option>PRESENCIAL</option>
              <option>VIRTUAL</option>
              <option>COMBINADA</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="col-md-6">
            <Form.Label>Estado</Form.Label>
            <Form.Select name="estado" value={form.estado} onChange={handleChange} disabled={loading}>
              <option>EN FORMACIÓN</option>
              <option>FINALIZADA</option>
              <option>INACTIVA</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="col-md-6">
            <Form.Label>Fecha Inicio</Form.Label>
            <Form.Control
              type="date"
              name="inicio"
              value={form.inicio}
              onChange={handleChange}
              onBlur={validateDates} 
              disabled={loading}
              isInvalid={!!error && error.includes("Inicio")} 
            />
          </Form.Group>

          <Form.Group className="col-md-6">
            <Form.Label>Fecha Fin</Form.Label>
            <Form.Control
              type="date"
              name="fin"
              value={form.fin}
              onChange={handleChange}
              onBlur={validateDates} 
              disabled={loading}
              isInvalid={!!error && error.includes("Fin")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="border-0">
        <Button variant="secondary" onClick={onClose} className="rounded-3 shadow-sm" disabled={loading}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleUpdate} className="rounded-3 shadow-sm" disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Guardando...
            </>
          ) : (
            "Guardar Cambios"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditarFicha;