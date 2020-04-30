import request from "./request";

class RegisterService {
  fetchByStudent(dni) {
    return new Promise((resolve, reject) => {
      request
        .get("/regs_by_stu/" + dni)
        .then((r) => {
          resolve(r.data);
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }

  fetchBySection(code) {
    return new Promise((resolve, reject) => {
      request
        .get("/regs_by_section/" + code)
        .then((r) => {
          resolve(r.data);
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }

  fetchBySectionWithResponse(section_code, activity_code) {
    return new Promise((resolve, reject) => {
      request
        .get(`/regs_res/${section_code}/${activity_code}`)
        .then((r) => {
          resolve(r.data);
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }
}

export default new RegisterService();
