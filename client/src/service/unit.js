import request from "./request";

class UnitService {
  fetchByOperative(op_code) {
    return new Promise((resolve, reject) => {
      request
        .get("/units/" + op_code)
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
        .get("/unit/" + code)
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
        .post("/unit", data)
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
        .put("/unit/" + code, data)
        .then((r) => {
          resolve(r.data);
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }
}

export default new UnitService();
