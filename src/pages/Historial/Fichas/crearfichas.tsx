import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import type { NuevaFicha } from "./types";

interface CrearFichaProps {
  show: boolean;
  onClose: () => void;
  onCreate: (nuevaFicha: NuevaFicha) => void;
}

const CrearFicha = ({ show, onClose, onCreate }: CrearFichaProps) => {
  const [form, setForm] = useState({
    ficFecIni: "",
    ficFecFin: "",
    ficEst: "",
    ficMod: "",
    ficJor: "",
    ficCant: "",
    proIdfk: "",
  });

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = () => {
    onCreate({
      ficFecIni: form.ficFecIni,
      ficFecFin: form.ficFecFin,
      ficEst: form.ficEst,
      ficMod: form.ficMod,
      ficJor: form.ficJor,
      ficCant: Number(form.ficCant),
      proIdfk: Number(form.proIdfk),
    });

    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Crear Ficha</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>

          <Form.Group className="mb-2">
            <Form.Label>Programa (ID)</Form.Label>
            <Form.Control name="proIdfk" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Cantidad de aprendices</Form.Label>
            <Form.Control
              type="number"
              name="ficCant"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Modalidad</Form.Label>
            <Form.Select name="ficMod" onChange={handleChange}>
              <option value="PRESENCIAL">PRESENCIAL</option>
              <option value="VIRTUAL">VIRTUAL</option>
              
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Jornada</Form.Label>
            <Form.Select name="ficJor" onChange={handleChange}>
              <option value="DIURNA">DIURNA</option>
              <option value="NOCTURNA">NOCTURNA</option>
              
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Estado</Form.Label>
            <Form.Select name="ficEst" onChange={handleChange}>
              <option value="EN FORMACIÓN">EN FORMACIÓN</option>
              <option value="FINALIZADA">FINALIZADA</option>
              <option value="INACTIVA">INACTIVA</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Fecha Inicio</Form.Label>
            <Form.Control type="date" name="ficFecIni" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Fecha Fin</Form.Label>
            <Form.Control type="date" name="ficFecFin" onChange={handleChange} />
          </Form.Group>

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={save}>
          Crear
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CrearFicha;
