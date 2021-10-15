<template>
  <div id="dashboard" class="">
    <ul>
      <li>
        <p>{{ topText }}</p>
      </li>
      <li>
        <p class="ticket-number">{{ ticketStart }} - {{ ticketEnd }}</p>
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
      timeBased: false,
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
        this.timeBased = dashboard.timeBased;
      });
    },
  },
  mounted() {
    document.querySelector("nav").hidden = true;

    this.getDashboard();
    setInterval(this.getDashboard, 10000);

    document.getElementById("dashboard").style.backgroundImage =
      "url(/files/" + window.location.host + ".jpg)";
  },
  unmounted() {
    document.querySelector("nav").hidden = false;
  },
};
</script>

<style scoped>
p {
  font-size: 8vw;
  color: white;
}

.ticket-number {
  font-size: 15vw;
}

#dashboard {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
  /* background-image: url("/files/localhost:8080.jpg"); */
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
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
