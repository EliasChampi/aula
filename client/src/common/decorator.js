import moment from "./moment";

export const state = {
  a: "Activo",
  i: "Inactivo",
  p: "Pendiente",
  f: "Finalizó",
};

export const activityType = {
  ac: "Actividad",
  ct: "Cuestionario",
};

export const mydate = (date) => {
  return moment(date).format("DD [de] MMMM [del] YYYY");
};

export const yourdate = (date) => {
  return moment(date).format("DD [de] MMMM");
};
