<template>
  <div class="container">
    <form class="row" @submit.prevent="updateDashboard">
      <h3 class="my-3">Queue Control</h3>
      <hr class="col" />
      <label for="ticketStart">Ticket Start</label>
      <div class="mb-3" v-if="timeBased">
        <select class="col-3 mr-2 p-2" v-model="ticketStartHour">
          <option :key="hour" v-for="hour in this.hours" :value="hour">
            {{ hour }}
          </option>
        </select>
        <select class="col-3 p-2" v-model="ticketStartMinute">
          <option :key="minute" v-for="minute in this.minutes" :value="minute">
            {{ minute }}
          </option>
        </select>
        PM
        <input type="checkbox" class="ml-3" v-model="useLanes" /> Use Lanes
      </div>
      <div v-else>
        <input
          type="number"
          name="ticketStart"
          id="ticketStart"
          v-model="ticketStart"
          />
      </div>
      <div v-if="timeBased" class="mb-3">
        <div v-if="!useLanes">
          <label for="ticketEnd">Ticket End</label>
          <div>
            <select class="col-3 mr-2 p-2" v-model="ticketEndHour">
              <option :key="hour" v-for="hour in this.hours" :value="hour">
                {{ hour }}
              </option>
            </select>
            <select class="col-3 p-2" v-model="ticketEndMinute">
              <option :key="minute" v-for="minute in this.minutes" :value="minute">
                {{ minute }}
              </option>
            </select>
            PM
          </div>
        </div>
        <div v-else>
          <label for="numberOfLanes">Number of Lanes</label>
          <div>
            <select class="col-3 p-2 mr-2 mb-2" v-model="numberOfLanes" id="numberOfLanes">
              <option :key="lane" v-for="lane in 10" :value="lane">
                {{ lane }}
              </option>
            </select>
            Lanes
          </div>

          <label for="laneInterval">Lane Interval</label>
          <div>
            <select class="col-3 p-2 mr-2" v-model="laneInterval" id="laneInterval">
              <option :key="interval" v-for="interval in intervals" :value="interval">
                {{ interval }}
              </option>
            </select>
            Minutes
          </div>
        </div>
      </div>
      <div v-else>
        <label for="ticketEnd">Ticket End</label>
        <div>
          <input type="number" name="ticketEnd" id="ticketEnd" v-model="ticketEnd" />
        </div>
      </div>
      <div>
        <label for="sendNotifications">Send Notifications to Customers</label>
        <input type="checkbox" id="sendNotifications" v-model="sendNotifications" />
      </div>
      <div v-if="sendNotifications" class="col-12">
        <input
          type="submit"
          class="btn btn-success col-12"
          value="Update Dashboard / Send Notifications"
        />
      </div>
      <div v-else class="col-12">
        <input
          type="submit"
          class="btn btn-success col-12"
          value="Update Dashboard"
        />
      </div>
    </form>
    <form class="row" @submit.prevent="updateConfiguration">
      <h3 class="my-3">Dashboard Text</h3>
      <hr class="col" />
      <label for="topText">Top Text</label>
      <input type="text" name="topText" id="topText" v-model="topText" />
      <label for="bottomText">{{ useLanes ? "Bottom Text (does not show when using lanes)" : "Bottom Text"}}</label>
      <input type="text" name="bottomText" id="bottomText" v-model="bottomText" :disabled="useLanes"/>
      <input type="submit" class="btn btn-success" value="Update Dashboard Text" />
    </form>
    <div class="row">
      <h3 class="my-3">Upload Background Image</h3>
      <hr class="col" />
      <input
        @input="setBackgroundFile"
        type="file"
        placeholder="Upload background image"
        id="backgroundFile"
      />
      <input
        type="submit"
        :disabled="backgroundFile == null"
        class="btn btn-primary"
        @click="uploadBackground"
        value="Upload"
      />
    </div>
    <div class="row">
      <h3 class="my-3">Danger Zone</h3>
      <hr class="col" />
      <!-- TODO: Show number of customers -->
      <!-- TODO: Confirmation -->
      <button class="btn btn-danger" v-if="!timeBased" @click="switchToTimeBased">
        Switch to time based (needed to use lanes, deletes all customers)
      </button>
      <button class="btn btn-danger" v-else @click="switchToTicketBased">
        Switch to ticket based (deletes all customers)
      </button>
    </div>
  </div>
</template>

<style scoped>
select {
  text-align: center;
  font-size: 18px;
}
input {
  margin-bottom: 15px;
}
h3 {
  margin-top: 10px;
}
.row {
  border: 1px solid;
}
</style>

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
      useLanes: false,
      sendNotifications: false,
      numberOfLanes: 4,
      laneInterval: 5,
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
      intervals: [5, 10, 15, 20, 25, 30]
    };
  },
  methods: {
    updateConfiguration() {
      DashboardDataService.update(window.location.host, {
        topText: this.topText,
        bottomText: this.bottomText,
        timeBased: this.timeBased,
      });
      this.$emit("refreshCustomers");
    },
    updateDashboard() {
      let start = this.ticketStart;
      let end = this.ticketEnd;

      if (this.timeBased) {
        let times = this.getTimes();
        start = times.ticketStart;
        end = times.ticketEnd;
      }

      let data = {
        ticketStart: start,
        ticketEnd: end,
        timeBased: this.timeBased,
        useLanes: this.useLanes,
        laneInterval: this.laneInterval,
        numberOfLanes: this.numberOfLanes,
        sendNotifications: this.sendNotifications
      }

      if(this.useLanes) {
        this.bottomText = "";
        data.bottomText = "";

        this.ticketEnd = end;
        data.ticketEnd = start;
        this.setEndHourAndMinuteFields(start);
      }

      DashboardDataService.update(window.location.host, data).then(() => {
        this.$emit("refreshCustomers");
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
    setStartHourAndMinuteFields(start) {
      this.ticketStartHour = start.split(":")[0];
      this.ticketStartMinute = start.split(":")[1];
    },
    setEndHourAndMinuteFields(end) {
      this.ticketEndHour = end.split(":")[0];
      this.ticketEndMinute = end.split(":")[1];
    },
    setBackgroundFile() {
      this.backgroundFile = document.querySelector("#backgroundFile").files[0];
    },
    switchToTimeBased() {
      if (!confirm("Are you sure you? All customers will be deleted!")) {
        return;
      }
      DashboardDataService.update(window.location.host, {
        timeBased: true,
        ticketStart: "1:00",
        ticketEnd: "1:00",
      }).then(() => {
        CustomerDataService.deleteAll().then(() => {
          this.timeBased = true;
          this.$emit("refreshCustomers");
        });
      });
    },
    switchToTicketBased() {
      if (!confirm("Are you sure you? All customers will be deleted!")) {
        return;
      }

      DashboardDataService.update(window.location.host, {
        timeBased: false,
        ticketStart: "0",
        ticketEnd: "0",
        useLanes: false
      }).then(() => {
        CustomerDataService.deleteAll().then(() => {
          this.timeBased = false;
          this.$emit("refreshCustomers");
        });
      });
    },
    async uploadBackground() {
      const formData = new FormData();
      formData.append("file", this.backgroundFile);

      FileService.uploadBackground(window.location.host, formData)
        .then((res) => {
          console.log(res.data);
          this.backgroundFile = null;
          document.querySelector("#backgroundFile").value = null;
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
      this.useLanes = dashboard.useLanes;
      this.bottomText = this.useLanes ? "" : dashboard.bottomText;
      this.timeBased = dashboard.timeBased;
      this.sendNotifications = dashboard.sendNotifications;
      if (this.timeBased) {
        this.setStartHourAndMinuteFields(dashboard.ticketStart);
        this.setEndHourAndMinuteFields(dashboard.ticketEnd);
        this.numberOfLanes = dashboard.numberOfLanes;
        this.laneInterval = dashboard.laneInterval;
      } else {
        this.ticketStart = dashboard.ticketStart;
        this.ticketEnd = dashboard.ticketEnd;
      }
    });
  },
};
</script>

<style scoped>
label {
  margin-right: 20px;
}
.row {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #00000010;
}
</style>
