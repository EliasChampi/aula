import cache from "../helpers/cache"

import axios from "axios";
const API_URL = "http://localhost:5000/api/auth/";

class AuthService {
  // login
  login(payload) {
    return new Promise((resolve, reject) => {
      return axios
        .post(API_URL + "signin", payload)
        .then(response => {
          cache.setItem("user",response.data);
          resolve(response.data);
        })
        .catch(err => {
          reject(err.response.data)
        })
    });
  }
  // logout
  logout() {
    cache.removeItem("user");
  }
  // getCurrentUser
  getCurrentUser() {
    return cache.getItem('user');
  }
}

export default new AuthService();
