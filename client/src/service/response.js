import request from "./request";

class Response {
  fetchByKeys(register_code, task_code) {
    return new Promise((resolve, reject) => {
      request
        .get(`/response/${register_code}/${task_code}`)
        .then((r) => {
          resolve(r.data);
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }
}

export default new Response();
