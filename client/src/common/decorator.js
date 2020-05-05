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

export const cycleTypes = {
  PRI: "Primaria",
  SEC: "Secundaria",
  undefined: "Secundaria",
};

export const yourdate = (date, addFormat = "") => {
  return moment(date).format("dddd DD [de] MMMM " + addFormat);
};
