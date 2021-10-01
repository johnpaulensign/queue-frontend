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
      </div>
      <input
        v-else
        type="number"
        name="ticketStart"
        id="ticketStart"
        v-model="ticketStart"
      />
      <label for="ticketEnd">Ticket End</label>
      <div v-if="timeBased" class="mb-3">
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
      <input v-else type="number" name="ticketEnd" id="ticketEnd" v-model="ticketEnd" />
      <input
        type="submit"
        class="btn btn-success"
        value="Update Dashboard / Send Texts"
      />
    </form>
    <form class="row" @submit.prevent="updateConfiguration">
      <h3 class="my-3">Dashboard Text</h3>
      <hr class="col" />
      <label for="topText">Top Text</label>
      <input type="text" name="topText" id="topText" v-model="topText" />
      <label for="bottomText">Bottom Text</label>
      <input type="text" name="bottomText" id="bottomText" v-model="bottomText" />
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
        Switch to time based (deletes all customers)
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
      DashboardDataService.update(window.location.host, {
        ticketStart: start,
        ticketEnd: end,
        timeBased: this.timeBased,
      }).then(() => {
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
