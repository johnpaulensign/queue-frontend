<template>
  <div class="container submit-form">
    <div v-if="!submitted">
      <form @submit.prevent="saveCustomer">
        <div class="row form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" v-model="name" name="name" />
        </div>

        <div class="row form-group">
          <label for="phone">Phone</label>
          <input
            class="form-control"
            id="phone"
            type="tel"
            v-model="phone"
            name="phone"
          />
        </div>

        <div class="row form-group">
          <label for="email">Email</label>
          <input
            class="form-control"
            id="email"
            type="email"
            v-model="email"
            name="email"
          />
        </div>

        <div>
          <div v-if="timeBased" class="row">
            <label>Ticket Time <strong style="color: red"> * </strong></label>
            <select class="col mr-2" required v-model="ticketHour">
              <option :key="hour" v-for="hour in this.hours" :value="hour">
                {{ hour }}
              </option>
            </select>
            <select class="col mr-2" required v-model="ticketMinute">
              <option :key="minute" v-for="minute in this.minutes" :value="minute">
                {{ minute }}
              </option>
            </select>
            <span class="col" style="font-size: 25px">PM</span>
          </div>

          <div class="row" v-else>
            <label for="ticketNumber"
              >Ticket Number <strong style="color: red"> * </strong></label
            >
            <input
              type="number"
              name="ticketNumber"
              id="ticketNumber"
              required
              v-model="ticketNumber"
            />
          </div>
          <div class="row">
            <input type="submit" class="btn btn-success" />
          </div>
        </div>
      </form>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
    </div>
  </div>
</template>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}

.row {
  margin-bottom: 20px;
}

select {
  text-align: center;
  font-size: 25px;
}
</style>

<script>
import CustomerDataService from "../services/CustomerDataService";
import DashboardDataService from "../services/DashboardDataService";

export default {
  name: "add-customer",
  data() {
    return {
      id: null,
      name: "",
      phone: "",
      email: "",
      ticketNumber: "",
      minutes: [],
      hours: [],
      ticketHour: "1",
      ticketMinute: "00",
      timeBased: null,
      submitted: false,
    };
  },
  methods: {
    saveCustomer() {
      let ticketNumber = this.ticketNumber;
      if (this.timeBased) {
        ticketNumber = this.ticketHour + ":" + this.ticketMinute;
      }
      var data = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        ticketNumber,
      };

      CustomerDataService.create(data)
        .then((response) => {
          this.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          setTimeout(() => {
            window.location.replace("/dashboard");
          }, 1000);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    newCustomer() {
      this.submitted = false;
      this.customer = {};
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
  },
  mounted() {
    this.generateTimes();
    DashboardDataService.get(window.location.host).then((response) => {
      const dashboard = response.data[0];
      this.timeBased = dashboard.timeBased;
    });
  },
};
</script>
