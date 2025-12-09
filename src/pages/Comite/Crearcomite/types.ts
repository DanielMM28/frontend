// types.ts
export interface FormDataComite {
  tema: string; // mapeará a "tema" en el JSON de ejemplo
  descripcion: string;
  objetivo: string;
  conclusion: string;
  fecha: string; // YYYY-MM-DD
  horaInicio: string; // HH:MM:SS
  horaFin: string; // HH:MM:SS
  version?: string;
  anexos?: string | null;
  Ficha?: number | null; // id de ficha
  fichasInvolucradas?: number[]; // si deseas enviar varias fichas
  aprendices?: number[]; // ids
  miembrosComite?: number[]; // ids
  asistentesExtra?: string[]; // lista de nombres/emails
  agenda?: string[]; // puntos
  objetivosLista?: string[]; // lista de objetivos
}
