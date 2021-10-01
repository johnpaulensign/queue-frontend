import http from "../http-common";

class CustomerDataService {
  getAll() {
    return http.get(`/customers/${window.location.host}`);
  }

  get(id) {
    return http.get(`/customers/${window.location.host}/${id}`);
  }

  create(data) {
    return http.post(`/customers/${window.location.host}`, data);
  }

  update(id, data) {
    return http.put(`/customers/${window.location.host}/${id}`, data);
  }

  delete(id) {
    return http.delete(`/customers/${window.location.host}/${id}`);
  }

  deleteAll() {
    return http.delete(`/customers/${window.location.host}`);
  }

  findByName(name) {
    return http.get(`/customers/${window.location.host}?name=${name}`);
  }

  findByAny(query) {
    return http.get(`/customers/${window.location.host}/any?query=${query}`);
  }
}

export default new CustomerDataService();
