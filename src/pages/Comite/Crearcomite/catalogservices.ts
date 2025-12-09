// services/catalogService.ts
import api from "./services";

export const getFichas = async () => {
  const { data } = await api.get("/fichas");
  return data;
};

export const getAprendices = async () => {
  const { data } = await api.get("/Aprendices");
  return data;
};

export const getUsuariosMiembros = async () => {

  const { data } = await api.get("/Usuarios");
  return data;
};
