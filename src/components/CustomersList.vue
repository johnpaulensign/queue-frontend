<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by name, phone number, or email..."
          v-model="query"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="search"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Customers List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(customer, index) in customers"
          :key="index"
          @click="setActiveCustomer(customer, index)"
        >
          {{ customer.name }}
        </li>
      </ul>

      <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllCustomers" v-bind:disabled="customers.length == 0">
        Remove All
      </button> -->
    </div>
    <div class="col-md-6">
      <div v-if="currentCustomer">
        <h4>Customer</h4>
        <div>
          <label><strong>Name:</strong></label> {{ currentCustomer.name }}
        </div>
        <div>
          <label><strong>Phone:</strong></label> {{ currentCustomer.phone }}
        </div>
        <div>
          <label><strong>Email:</strong></label> {{ currentCustomer.email }}
        </div>
        <div>
          <label><strong>Ticket Number:</strong></label> {{ currentCustomer.ticketNumber }}
        </div>

        <router-link :to="'/admin/customers/' + currentCustomer.id" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else-if="customers.length > 0">
        <br />
        <p>Please click on a customer</p>
      </div>
      <div v-else>
        <br />
        <p>No customers found</p>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerDataService from "../services/CustomerDataService";

export default {
  name: "customers-list",
  data() {
    return {
      customers: [],
      currentCustomer: null,
      currentIndex: -1,
      query: ""
    };
  },
  methods: {
    retrieveCustomers() {
      CustomerDataService.getAll()
        .then(response => {
          this.customers = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveCustomers();
      this.currentCustomer = null;
      this.currentIndex = -1;
    },

    setActiveCustomer(customer, index) {
      this.currentCustomer = customer;
      this.currentIndex = customer ? index : -1;
    },

    removeAllCustomers() {
      CustomerDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    search() {
      CustomerDataService.findByAny(this.query)
        .then(response => {
          this.customers = response.data;
          this.setActiveCustomer(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveCustomers();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
