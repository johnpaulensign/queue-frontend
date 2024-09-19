import http from "../http-common";

class ApmDataService {
    getAll() {
        return http.get(`/apm/`);
    }

    checkin(actor) {
        return http.post(`/apm/checkin`, { actor });
    }

    costumeCheckin(data) {
        return http.put(`/apm/checkin/costume`, { id: data });
    }

    makeupCheckin(data) {
        return http.put(`/apm/checkin/costume/makeup`, { id: data });
    }

    roomCheckin(data) {
        return http.put(`/apm/checkin/makeup/room`, { id: data });
    }

    finalCheckout(id) {
        return http.put(`/apm/checkout`, { id });
    }

}

export default new ApmDataService();