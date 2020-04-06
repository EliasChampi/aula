import cache from "helpers/cache";

export const dayname = () => {
  if (cache.getItem("user")) {
    const curHr = new Date().getHours();
    let title = "Buenas Noches ";
    if (curHr < 12) {
      title = "Buenos Dias ";
    } else if (curHr < 18) {
      title = "Buenas Tardes ";
    }
    return title + cache.getItem("user").name;
  }
};
