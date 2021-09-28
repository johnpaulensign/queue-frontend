import http from "../http-common";

class LoginDataService {
    get() {
      return http.get(`/login`);
    }
    login(username, password) {
      return http.post(`/login`, {username, password});
    }

//   update(hostname, data) {
//     return http.put(`/dashboard/${hostname}`, data);
//   }
}

export default new LoginDataService();
