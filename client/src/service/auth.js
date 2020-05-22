import cache from "../helpers/cache";
import request from "./request";

class AuthService {
  // login
  login(payload) {
    return new Promise((resolve, reject) => {
      return request
        .post("/auth/signin", payload)
        .then((r) => {
          const user = r.data.entity;
          user.mode = r.data.mode;
          user.token = r.data.accessToken;
          cache.setItem("user", user);
          resolve(user);
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }
  // update password
  updatePassword(payload) {
    return new Promise((resolve, reject) => {
      request
        .put("/auth/update", payload)
        .then((r) => {
          resolve(r.data);
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }
  // recover password
  recoverPassword(payload) {
    return new Promise((resolve, reject) => {
      request
        .put("/auth/recover", payload)
        .then((r) => {
          resolve(r.data);
        })
        .catch((errMessage) => {
          reject(errMessage);
        });
    });
  }

  // logout
  logout() {
    cache.cleanAll();
  }
  // getCurrentUser
  getCurrentUser() {
    return cache.getItem("user");
  }
}

export default new AuthService();
