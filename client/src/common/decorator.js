import moment from "./moment";

export const state = {
  a: "Activo",
  i: "Inactivo",
  p: "Pendiente",
  f: "Finalizó",
};

export const taskType = {
  tr: "Tarea",
  ta: "Tarea con Adjunto",
};

export const mydate = (date) => {
  return moment(date).format("DD [de] MMMM [del] YYYY");
};
