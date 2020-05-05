import request from "./request";

class Response {
  fetchByKeys(register_code, activity_code) {
    return new Promise((resolve, reject) => {
      request
        .get(`/response/${register_code}/${activity_code}`)
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
        .post("/response", data, {
          "content-type": "multipart/form-data",
        })
        .then((r) => {
          resolve(r.data);
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }

  update(register_code, activity_code, data) {
    return new Promise((resolve, reject) => {
      request
        .put(`/response/${register_code}/${activity_code}`, data)
        .then((r) => {
          resolve(r.data);
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }

  downloadAttached(register_code, activity_code) {
    return new Promise((resolve, reject) => {
      request
        .get(`/response/d/${register_code}/${activity_code}`, {
          responseType: "blob",
        })
        .then((r) => {
          resolve(r.data);
        })
        .catch((errMessage) => {
          errMessage.text().then((text) => {
            reject(text);
          });
        });
    });
  }
}

export default new Response();
