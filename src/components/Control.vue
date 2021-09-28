<template>
  <div>
    <h4>Control</h4>
    <form @submit.prevent="updateDashboard">
      <label for="ticketStart">Ticket Start</label>
      <input type="text" name="ticketStart" id="ticketStart" v-model="ticketStart"> <br>
      <label for="ticketEnd">Ticket End</label>
      <input type="text" name="ticketEnd" id="ticketEnd" v-model="ticketEnd"> <br>
      <input type="submit">
    </form>
  </div>
</template>

<script>
import DashboardDataService from "../services/DashboardDataService";

export default {
  name: "control",
  data() {
    return {
      ticketStart: "",
      ticketEnd: ""
    };
  },
  methods: {
    updateDashboard() {
      DashboardDataService.update(window.location.host, {ticketStart: this.ticketStart, ticketEnd: this.ticketEnd})
    }
  },
  mounted() {
      DashboardDataService.get(window.location.host).then(response => {
        const dashboard = response.data[0];
        this.ticketStart = dashboard.ticketStart;
        this.ticketEnd = dashboard.ticketEnd;
      })
  }
};
</script>

<style>
label{
  margin-right: 20px;
}
</style>