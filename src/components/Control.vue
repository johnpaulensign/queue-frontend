<template>
  <div>
    <h4>Queue Control</h4>
    <form @submit.prevent="updateDashboard">
      <label for="ticketStart">Ticket Start</label>
      <input type="text" name="ticketStart" id="ticketStart" v-model="ticketStart" />
      <br />
      <label for="ticketEnd">Ticket End</label>
      <input type="text" name="ticketEnd" id="ticketEnd" v-model="ticketEnd" />
      <br />
      <input type="submit" />
    </form>
    <h4>Configuration</h4>
    <form @submit.prevent="updateConfiguration">
      <label for="topText">Top Text</label>
      <input type="text" name="topText" id="topText" v-model="topText" />
      <br />
      <label for="bottomText">Bottom Text</label>
      <input type="text" name="bottomText" id="bottomText" v-model="bottomText" />
      <br />
      <label for="timeBased">Time Based</label>
      <input type="checkbox" name="timeBased" id="timeBased" v-model="timeBased" />
      <br />
      <input type="submit" />
    </form>
  </div>
</template>

<script>
import DashboardDataService from "../services/DashboardDataService";

export default {
  name: "control",
  data() {
    return {
      ticketStart: null,
      ticketEnd: null,
      topText: null,
      bottomText: null,
      timeBased: false,
    };
  },
  methods: {
    updateConfiguration() {
      DashboardDataService.update(window.location.host, {
        topText: this.topText,
        bottomText: this.bottomText,
        timeBased: this.timeBased,
      });
    },
    updateDashboard() {
      DashboardDataService.update(window.location.host, {
        ticketStart: this.ticketStart,
        ticketEnd: this.ticketEnd,
      });
    },
  },
  mounted() {
    DashboardDataService.get(window.location.host).then((response) => {
      const dashboard = response.data[0];
      this.ticketStart = dashboard.ticketStart;
      this.ticketEnd = dashboard.ticketEnd;
      this.topText = dashboard.topText;
      this.bottomText = dashboard.bottomText;
      this.timeBased = dashboard.timeBased;
    });
  },
};
</script>

<style>
label {
  margin-right: 20px;
}
</style>
