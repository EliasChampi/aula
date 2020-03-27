import request from "./request";

class SectionService {
  fetch(code) {
    return new Promise((resolve, reject) => {
      request
        .get("/section/" + code)
        .then(r => {
          resolve(r.data);
        })
        .catch(errMessage => {
          reject(errMessage);
        });
    });
  }
}

export default new SectionService();
