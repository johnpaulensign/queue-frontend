import http from "../http-common";

class DashboardDataService {
  uploadBackground(hostname, file) {
    return http.post(`/files/upload/background/${hostname}`, file);
  }
}

export default new DashboardDataService();
