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
          v-model="customer.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="phone">Phone</label>
        <input
          class="form-control"
          id="phone"
          required
          v-model="customer.phone"
          name="phone"
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          class="form-control"
          id="email"
          required
          v-model="customer.email"
          name="email"
        />
      </div>

      <div class="form-group">
        <label for="ticketNumber">Ticket Number</label>
        <input
          class="form-control"
          id="ticketNumber"
          required
          v-model="customer.ticketNumber"
          name="ticketNumber"
        />
      </div>

      <button @click="saveCustomer" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newCustomer">Sign up for queue</button>
    </div>
  </div>
</template>

<script>
import CustomerDataService from "../services/CustomerDataService";

export default {
  name: "add-customer",
  data() {
    return {
      customer: {
        id: null,
        name: "",
        phone: "",
        email: "",
        ticketNumber: ""
      },
      submitted: false
    };
  },
  methods: {
    saveCustomer() {
      var data = {
        name: this.customer.name,
        phone: this.customer.phone,
        email: this.customer.email,
        ticketNumber: this.customer.ticketNumber
      };

      CustomerDataService.create(data)
        .then(response => {
          this.customer.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    newCustomer() {
      this.submitted = false;
      this.customer = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>