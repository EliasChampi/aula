import request from "./request";

class ActivityService {
  fetchByUnit(u_code) {
    return new Promise((resolve, reject) => {
      request
        .get("/activities/d/" + u_code)
        .then((r) => {
          resolve(r.data);
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }

  fetchBySec(section_code) {
    return new Promise((resolve, reject) => {
      request
        .get("/activities/" + section_code)
        .then((r) => {
          resolve(r.data);
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }

  fetchByCodeWithUnit(code) {
    return new Promise((resolve, reject) => {
      request
        .get("/activity/" + code)
        .then((r) => {
          resolve(r.data);
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }

  store(formData) {
    return new Promise((resolve, reject) => {
      request
        .post("/activity", formData, {
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

  update(formData, code) {
    return new Promise((resolve, reject) => {
      request
        .put("/activity/" + code, formData, {
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

  downloadAttached(code) {
    return new Promise((resolve, reject) => {
      request
        .get("/activity_download/" + code, { responseType: "blob" })
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

export default new ActivityService();
