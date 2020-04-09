import request from "./request";
class CourseSevice {
  fetchByTeacher(dni) {
    return new Promise((resolve, reject) => {
      request
        .get("/courses/" + dni)
        .then((r) => {
          resolve(r.data);
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }
}

export default new CourseSevice();
