import http from "../http-common";

class DashboardDataService {
  get(hostname) {
    return http.get(`/dashboard/${hostname}`);
  }

  update(hostname, data) {
    return http.put(`/dashboard/${hostname}`, data);
  }
}

export default new DashboardDataService();
