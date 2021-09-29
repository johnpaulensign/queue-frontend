<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="phone">Phone</label>
        <input class="form-control" id="phone" required v-model="phone" name="phone" />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input class="form-control" id="email" required v-model="email" name="email" />
      </div>

      <div class="form-group">
        <!-- <input
          class="form-control"
          id="ticketNumber"
          required
          v-model="ticketNumber"
          name="ticketNumber"
        /> -->
        <div v-if="!timeBased">
          <label for="ticketNumber">Ticket Number</label>
          <input
            type="text"
            name="ticketNumber"
            id="ticketNumber"
            v-model="ticketNumber"
          />
        </div>

        <div v-else>
          <label>Ticket Time</label>
          <select v-model="ticketHour">
            <option :key="hour" v-for="hour in this.hours" :value="hour">
              {{ hour }}
            </option>
          </select>
          <select v-model="ticketMinute">
            <option :key="minute" v-for="minute in this.minutes" :value="minute">
              {{ minute }}
            </option>
          </select>
          PM
        </div>

        <button @click="saveCustomer" class="btn btn-success">Submit</button>
      </div>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
    </div>
  </div>
</template>

<script>
import CustomerDataService from "../services/CustomerDataService";

export default {
  name: "add-customer",
  data() {
    return {
      // customer: {
      id: null,
      name: "",
      phone: "",
      email: "",
      ticketNumber: "",
      // },
      minutes: [],
      hours: [],
      ticketHour: "1",
      ticketMinute: "00",
      timeBased: true,
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
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
