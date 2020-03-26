import request from "./request";

class RegisterService {
  fetchByFamily(dni) {
    return new Promise((resolve, reject) => {
      request
        .get("/regs_by_family/" + dni)
        .then(r => {
          resolve(r.data);
        })
        .catch(r => {
          reject(err => {
            reject(err.response.data);
          });
        });
    });
  }
}

export default new RegisterService();
