export const dayname = (name) => {
  const curHr = new Date().getHours();
  let title = "Buenas Noches ";
  if (curHr < 12) {
    title = "Buenos Dias ";
  } else if (curHr < 18) {
    title = "Buenas Tardes ";
  }
  return title + name;
};
