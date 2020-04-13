import request from "./request";

class StudentService {
  fetchByFamily(dni) {
    return new Promise((resolve, reject) => {
      request
        .get("/stus_by_family/" + dni)
        .then((r) => {
          resolve(r.data);
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }
}

export default new StudentService();
