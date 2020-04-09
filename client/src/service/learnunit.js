import request from "./request";

class LearnUnitService {
  fetchByOperative(op_code) {
    return new Promise((resolve, reject) => {
      request
        .get("/learns/" + op_code)
        .then((r) => {
          resolve(r.data);
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }

  fetchByCode(code) {
    return new Promise((resolve, reject) => {
      request
        .get("/learn/" + code)
        .then((r) => {
          resolve(r.data);
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }

  store(data) {
    return new Promise((resolve, reject) => {
      request
        .post("/learns", data)
        .then((r) => {
          resolve(r.data);
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }

  update(data, code) {
    return new Promise((resolve, reject) => {
      request
        .put("/learns/" + code, data)
        .then((r) => {
          resolve(r.data);
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }
}

export default new LearnUnitService();
