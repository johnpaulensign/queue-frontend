<template>
  <div id="dashboard" class="">
    <ul>
      <li>
        <div class="card">
          <span></span>
          <p class="card-text">{{ topText }}</p>
          <span></span>
        </div>
      </li>
      <li v-if="useLanes === false">
        <div class="card">
          <span></span>
          <p class="card-text ticket-number">{{ ticketStart }} - {{ ticketEnd }}</p>
          <span></span>
        </div>
      </li>
      <li v-else-if="timeBased && useLanes">
        <div class="card">
          <span></span>
          <p class="card-text ticket-number">{{ ticketStart }}</p>
          <span></span>
        </div>
      </li>
      <li v-if="useLanes === false">
        <div class="card">
          <span></span>
          <p class="card-text">{{ bottomText }}</p>
          <span></span>
        </div>
      </li>
      <li v-else>
        <div class="lane-card">
          <div :key="lane" v-for="lane in numberOfLanes" class="card-text">
            <p>
              Lane {{lane}}
            </p>
            <p class="mb-0">
              {{laneTimes[lane]}}
            </p>
            <p class="m-0">
              &darr;
            </p>
          </div>
        </div>
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
      sendNotifications: false,
      useLanes: false,
      numberOfLanes: 4,
      laneTimes: ["", "", "", "", "", "", "", "", "", "", ""]
      // laneInterval: 5
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
        this.sendNotifications = dashboard.sendNotifications;
        this.useLanes = dashboard.useLanes;
        this.numberOfLanes = dashboard.numberOfLanes;
        this.laneTimes = dashboard.laneTimes.split(',');
        // this.laneInterval = dashboard.laneInterval;
      });
    },
    // getTimeIntervalByLane(lane) {
    //   let hour = parseInt(this.ticketStart.toString().split(':')[0]);
    //   let minutes = parseInt(this.ticketStart.toString().split(':')[1]);
    //   console.log(minutes)
    //   minutes += this.laneInterval * lane;
    //   while(minutes >= 60) {
    //     hour += 1;
    //     minutes -= 60;
    //   }
    //   if(hour > 12) {
    //     hour -= 12;
    //   }

    //   return hour + ":" + (minutes < 10 ? "0" + minutes.toString() : minutes.toString());
    // }
  },
  mounted() {
    document.querySelector("nav").hidden = true;

    this.getDashboard();
    setInterval(this.getDashboard, 30000);

    document.getElementById("dashboard").style.backgroundImage =
      "url(/files/" + window.location.host + ".jpg)";
  },
  unmounted() {
    document.querySelector("nav").hidden = false;
  }
};
</script>

<style scoped>
#dashboard {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
}


ul {
  padding-left: 0 !important;
  display: flex;
  justify-content: space-around;
  align-content: center;
  flex-direction: column;
  height: 100%;
}

li {
  height: 30vh;
  display: flex;
  justify-content: space-around;
  align-content: center;
  flex-direction: column;
}

p {
  font-size: 5vh;
  color: white;
}

.card {
  display: flex;
  flex-direction: row;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  justify-content: space-around;
}

.card-text {
  background-color: rgba(0, 0, 0, 0.25);
  padding: 10px;
}

.ticket-number {
  font-size: 15vh;
}

.lane-card {
  display: flex;
  justify-content: space-around;
}
</style>
