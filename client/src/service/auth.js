import cache from "../helpers/cache";
import request from "./request"

class AuthService {
  // login
  login(payload) {
    return new Promise((resolve, reject) => {
      return request
        .post("/auth/signin", payload)
        .then(response => {
          cache.setItem("user", response.data);
          resolve(response.data);
        })
        .catch(errMessage => {
          reject(errMessage);
        });
    });
  }
  // logout
  logout() {
    cache.removeItem("user");
  }
  // getCurrentUser
  getCurrentUser() {
    return cache.getItem("user");
  }
}

export default new AuthService();
