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
