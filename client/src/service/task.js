import request from "./request";

class TaskService {
  fetchByLearn(l_code) {
    return new Promise((resolve, reject) => {
      request
        .get("/tasks_d/" + l_code)
        .then((r) => {
          resolve(r.data);
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }

  fetchByCodeWithLearn(code) {
    return new Promise((resolve, reject) => {
      request
        .get("/task/" + code)
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
        .post("/task", formData)
        .then((r) => {
          resolve(r.data);
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }
}

export default new TaskService();
