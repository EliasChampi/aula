import request from "./request";

class Operative {
  fetchBySection(section_code) {
    return new Promise((resolve, reject) => {
      request
        .get("/ops_s/" + section_code)
        .then((r) => {
          resolve(r.data);
        })
        .catch((ErrorMessage) => {
          reject(ErrorMessage);
        });
    });
  }
}

export default new Operative();
