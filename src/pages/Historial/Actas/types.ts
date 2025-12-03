export interface Acta {
  ID: number;
  tema: string;
  descripcion: string;
  version: string;
  anexos: string | null;
  conclusion: string;
  objetivo: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  comiteTipo: string;
  centroDescripcion: string;
  asistente: {
    id: number;
    nombre: string;
  };
  asistenteId: number;
  Ficha?: {
    ficId: number; 
    numeroFicha: number;
    programa: string;
    estado: string;
  };
}

export interface FormActa {
  tema: string;
  descripcion: string;
  version: string;
  anexos: string | null;
  conclusion: string;
  objetivo: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  comiteTipo:string;
  centroDescripcion: string;
  asistenteId: number;
  ficha?: number;
}
