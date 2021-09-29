<template>
  <div id="dashboard">
    <ul>
      <li>
        <p>{{ topText }}</p>
      </li>
      <li>
        <p>{{ ticketStart }} - {{ ticketEnd }}</p>
      </li>
      <li>
        <p>{{ bottomText }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import DashboardDataService from "../services/DashboardDataService";

export default {
  name: "control",
  data() {
    return {
      ticketStart: 0,
      ticketEnd: 0,
      topText: "Loading...",
      bottomText: "Loading...",
    };
  },
  methods: {
    getDashboard() {
      DashboardDataService.get(window.location.host).then((response) => {
        console.log(response);
        const dashboard = response.data[0];
        this.ticketStart = dashboard.ticketStart;
        this.ticketEnd = dashboard.ticketEnd;
        this.topText = dashboard.topText;
        this.bottomText = dashboard.bottomText;
      });
    },
  },
  mounted() {
    console.log();
    document.querySelector("nav").hidden = true;
    this.getDashboard();
    setInterval(this.getDashboard, 10000);
  },
  unmounted() {
    document.querySelector("nav").hidden = false;
  },
};
</script>

<style scoped>
p {
  font-size: 8vh;
  color: white;
}

#dashboard {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
}
li {
  height: 30vh;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  /* Column | row */
}
</style>
