import http from "../http-common";

class ApmDataService {
    getAll() {
        return http.get(`/apm/`);
    }

    async getActors() {
        var actors = [];
        await fetch('https://sheets.googleapis.com/v4/spreadsheets/1S_Bhj7n0ZQLfvw2ig_OaWEI3AtsHDuSI-aZiOyusW_0/values/Names!A:A?key=AIzaSyBByJbHHpL8XVCmEi8AN-WOaKmqSm6-f6U')
            .then(response => response.json())
            .then(data => actors = data)
            .catch(error => console.error('Error:', error));

        return actors.values.map(v => v[0]);
    }
    async getArtists() {
        var artists = [];
        await fetch('https://sheets.googleapis.com/v4/spreadsheets/1S_Bhj7n0ZQLfvw2ig_OaWEI3AtsHDuSI-aZiOyusW_0/values/Artists!A:A?key=AIzaSyBByJbHHpL8XVCmEi8AN-WOaKmqSm6-f6U')
            .then(response => response.json())
            .then(data => artists = data)
            .catch(error => console.error('Error:', error));

        return artists.values.map(v => v[0]);
    }
    async getRooms() {
        var rooms = [];
        await fetch('https://sheets.googleapis.com/v4/spreadsheets/1S_Bhj7n0ZQLfvw2ig_OaWEI3AtsHDuSI-aZiOyusW_0/values/Rooms!A:D?key=AIzaSyBByJbHHpL8XVCmEi8AN-WOaKmqSm6-f6U')
            .then(response => response.json())
            .then(data => rooms = data)
            .catch(error => console.error('Error:', error));

        return rooms.values.map(v => { return { name: v[0], description: v[1], costumeDescription: v[2], makeupDescription: v[3] } });
    }

    checkin(actor, room) {
        return http.post(`/apm/checkin`, { actor, room: room.name, roomDescription: room.description, costumeDescription: room.costumeDescription, makeupDescription: room.makeupDescription });
    }

    costumeCheckin(actor) {
        return http.put(`/apm/checkin/costume`, { id: actor.id });
    }

    makeupCheckin(actor) {
        return http.put(`/apm/checkin/costume/makeup`, { id: actor.id, costumeArtist: actor.selectedArtist, costumeProps: actor.selectedProps, costumeNotes: actor.notes });
    }

    roomCheckin(actor) {
        return http.put(`/apm/checkin/makeup/room`, { id: actor.id, makeupArtist: actor.selectedArtist, makeupNotes: actor.notes });
    }

    finalCheckout(actor) {
        return http.put(`/apm/checkout`, { id: actor.id });
    }

}

export default new ApmDataService();