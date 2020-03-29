import request from "./request";

class LearnUnitService {
  fetchByOperative(op_code) {
    return new Promise((resolve, reject) => {
      request
        .get("/learns/" + op_code)
        .then(r => {
          resolve(r.data);
        })
        .catch(errMessage => {
          reject(errMessage);
        });
    });
  }
}

export default new LearnUnitService();