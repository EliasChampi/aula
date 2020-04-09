import request from "./request";

class RegisterService {
  fetchByFamily(dni) {
    return new Promise((resolve, reject) => {
      request
        .get("/regs_by_family/" + dni)
        .then((r) => {
          resolve(r.data);
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }

  fetchBySection(code) {
    return new Promise((resolve, reject) => {
      request
        .get("/regs_by_section/" + code)
        .then((r) => {
          resolve(r.data);
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }
}

export default new RegisterService();
