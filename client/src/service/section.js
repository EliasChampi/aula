import request from "./request";

class SectionService {
  fetch(code) {
    return new Promise((resolve, reject) => {
      request
        .get("/section/" + code)
        .then((r) => {
          const res = r.data.values;
          if (res !== null) {
            const title = `${res.code.substr(-2)} de ${
              res.degree.cycle.title
            }. ${res.degree.cycle.branch.name}`;
            resolve(title);
          } else {
            resolve(false);
          }
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }
}

export default new SectionService();
