<template>
  <div>
    <h4>Queue Control</h4>
    <form @submit.prevent="updateDashboard">
      <label for="ticketStart">Ticket Start</label>
      <input
        v-if="!timeBased"
        type="text"
        name="ticketStart"
        id="ticketStart"
        v-model="ticketStart"
      />
      <div v-else>
        <select v-model="ticketStartHour">
          <option :key="hour" v-for="hour in this.hours" :value="hour">
            {{ hour }}
          </option>
        </select>
        <select v-model="ticketStartMinute">
          <option :key="minute" v-for="minute in this.minutes" :value="minute">
            {{ minute }}
          </option>
        </select>
        PM
      </div>
      <br />
      <label for="ticketEnd">Ticket End</label>
      <input
        v-if="!timeBased"
        type="text"
        name="ticketEnd"
        id="ticketEnd"
        v-model="ticketEnd"
      />
      <div v-else>
        <select v-model="ticketEndHour">
          <option :key="hour" v-for="hour in this.hours" :value="hour">
            {{ hour }}
          </option>
        </select>
        <select v-model="ticketEndMinute">
          <option :key="minute" v-for="minute in this.minutes" :value="minute">
            {{ minute }}
          </option>
        </select>
        PM
      </div>
      <br />
      <input type="submit" />
    </form>
    <br />
    <br />
    <br />
    <h4>Dashboard Text</h4>
    <form @submit.prevent="updateConfiguration">
      <label for="topText">Top Text</label>
      <input type="text" name="topText" id="topText" v-model="topText" />
      <br />
      <label for="bottomText">Bottom Text</label>
      <input type="text" name="bottomText" id="bottomText" v-model="bottomText" />
      <br />
      <input type="submit" />
    </form>
    <br />
    <br />
    <br />
    <h4>Upload Background Image</h4>
    <input type="file" placeholder="Upload background image" id="backgroundFile" /> <br />
    <input type="submit" @click="uploadBackground" />
    <br />
    <br />
    <br />
    <h4>Danger Zone</h4>
    <!-- TODO: Show number of customers -->
    <!-- TODO: Confirmation -->
    <button v-if="!timeBased" @click="switchToTimeBased">
      Switch to time based (deletes all customers)
    </button>
    <button v-else @click="switchToTicketBased">
      Switch to ticket based (deletes all customers)
    </button>
  </div>
</template>

<script>
import CustomerDataService from "../services/CustomerDataService";
import DashboardDataService from "../services/DashboardDataService";
import FileService from "../services/FileService";

export default {
  name: "control",
  data() {
    return {
      ticketStart: null,
      ticketEnd: null,
      topText: null,
      bottomText: null,
      timeBased: false,
      ticketStartHour: null,
      ticketStartMinute: null,
      ticketEndHour: null,
      ticketEndMinute: null,
      minutes: [],
      hours: [],
      backgroundFile: null,
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
      let start = this.ticketStart;
      let end = this.ticketEnd;
      if (this.timeBased) {
        let times = this.getTimes();
        start = times.ticketStart;
        end = times.ticketEnd;
      }
      DashboardDataService.update(window.location.host, {
        ticketStart: start,
        ticketEnd: end,
        timeBased: this.timeBased,
      });
    },
    getTimes() {
      return {
        ticketStart: this.ticketStartHour + ":" + this.ticketStartMinute,
        ticketEnd: this.ticketEndHour + ":" + this.ticketEndMinute,
      };
    },
    generateTimes() {
      let hours = [],
        minutes = [];
      for (let i = 0; i < 12; i++) {
        let hour = i + 1;
        let minute = i * 5;
        // if (hour < 10) {
        //   hour = `0${hour}`;
        // } else {
        //   hour = `${hour}`;
        // }
        if (minute < 10) {
          minute = `0${minute}`;
        } else {
          minute = `${minute}`;
        }
        if (hour < 12) {
          hours.push(hour);
        }
        minutes.push(minute);
      }
      this.hours = hours;
      this.minutes = minutes;
    },
    switchToTimeBased() {
      DashboardDataService.update(window.location.host, {
        timeBased: true,
        ticketStart: "1:00",
        ticketEnd: "1:00",
      }).then(() => {
        CustomerDataService.deleteAll().then(() => {
          window.location.reload();
        });
      });
    },
    switchToTicketBased() {
      DashboardDataService.update(window.location.host, {
        timeBased: false,
        ticketStart: "0",
        ticketEnd: "0",
      }).then(() => {
        CustomerDataService.deleteAll().then(() => {
          window.location.reload();
        });
      });
    },
    async uploadBackground() {
      // console.log(document.querySelector("#backgroundFile"));
      // FileService;
      // return;
      const formData = new FormData();
      formData.append("file", document.querySelector("#backgroundFile").files[0]);

      FileService.uploadBackground(window.location.host, formData)
        .then((res) => {
          console.log(res.data);
          // let data = {
          //   clueUnusedValue: res.data.src,
          //   clueUnusedType: "Image",
          // };
        })
        .catch((err) => {
          console.error(err);
        });

      // await axios
      //   .post(`/api/files/upload/${filepath}`, formData)
      //   .then((res) => {
      //     console.log(res.data);
      //     let data = {
      //       clueUnusedValue: res.data.src,
      //       clueUnusedType: "Image",
      //     };

      //     // TODO: Get this to update
      //     // this.$set(this.room, "clueUnusedType", data.clueUnusedType);
      //     // TODO: Get this to update
      //     // this.$set(this.room, "clueUnusedValue", data.clueUnusedValue);

      //     axios
      //       .put(`/api/rooms/${this.$route.params.room}`, {
      //         ...data,
      //       })
      //       .then((response) => {
      //         console.log(response.data);
      //       })
      //       .catch((err) => {
      //         console.error(err);
      //       });
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });
    },
  },
  mounted() {
    this.generateTimes();
    DashboardDataService.get(window.location.host).then((response) => {
      const dashboard = response.data[0];
      this.topText = dashboard.topText;
      this.bottomText = dashboard.bottomText;
      this.timeBased = dashboard.timeBased;

      if (this.timeBased) {
        this.ticketStartHour = dashboard.ticketStart.split(":")[0];
        this.ticketStartMinute = dashboard.ticketStart.split(":")[1];
        this.ticketEndHour = dashboard.ticketEnd.split(":")[0];
        this.ticketEndMinute = dashboard.ticketEnd.split(":")[1];
      } else {
        this.ticketStart = dashboard.ticketStart;
        this.ticketEnd = dashboard.ticketEnd;
      }
    });
  },
};
</script>

<style>
label {
  margin-right: 20px;
}
</style>
