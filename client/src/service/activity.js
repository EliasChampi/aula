import request from "./request";

class ActivityService {
  fetchByUnit(u_code) {
    return new Promise((resolve, reject) => {
      request
        .get("/activities/t/" + u_code)
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

  fetchByRegWithRes(r_code, s_code) {
    return new Promise((resolve, reject) => {
      request
        .get(`/activities/f/${r_code}/${s_code}`)
        .then((r) => {
          resolve(r.data);
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }

  fetchByCode(s_code, code) {
    return new Promise((resolve, reject) => {
      request
        .get(`/activity/${s_code}/${code}`)
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
        .get("/activity_d/" + code, { responseType: "blob" })
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
