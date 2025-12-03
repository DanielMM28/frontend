
export interface Ficha {
  ficId: number;
  ficFecIni: string;
  ficFecFin: string;
  ficEst: string;
  ficMod: string;
  ficJor: string;
  ficCant: number;
  proIdfk: number;
}

export interface FichaFront {
  ficId: number;
  numeroFicha: number;
  programa: string;     
  jornada: string;
  cantidad: number;
  instructorLider: string;
  estado: string;
  modalidad: string;
  fechas: {
    inicio: string;
    fin: string;
  };
}
export type NuevaFichaFront = Omit<FichaFront, "ficId">;

export interface FichaBackendDTO {
  ficId?: number;
  ficFecIni: string;
  ficFecFin: string;
  ficEst: string;
  ficMod: string;
  ficJor: string;
  ficCant: number;
  proIdfk: number;
}

export type NuevaFicha = Omit<FichaBackendDTO, "ficId">;
export type FichaEditada = FichaBackendDTO;
