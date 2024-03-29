<template>
  <div class="container p-3">
    <div class="row">
      <h3 class="mt-3 mb-0 mx-2">Customers</h3>
    </div>
    <div class="row">
      <hr class="col mx-3 my-0" />
    </div>
    <div class="row">
      <div class="col input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by name, phone number, or email..."
          v-model="query"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="search">
            Search
          </button>
          <button
            v-if="interval == null"
            class="btn btn-outline-secondary"
            type="button"
            @click="startRefresh"
          >
            Clear
          </button>
        </div>
      </div>
    </div>

    <div class="row">
      <div v-if="currentCustomer" class="mx-2 mb-5">
        <h3 >Customer</h3>
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
          <label><strong>Ticket Number:</strong></label>
          {{ currentCustomer.ticketNumber }}
        </div>
        <div>
          <label><strong>Notification Sent:</strong></label>
          {{
            currentCustomer.notificationDate
              ? new Date(currentCustomer.notificationDate).toLocaleDateString() +
                " " +
                new Date(currentCustomer.notificationDate).toLocaleTimeString()
              : "Not sent"
          }}
        </div>

        <router-link
          :to="'/admin/customers/' + currentCustomer.id"
          class="badge badge-warning"
          >Edit</router-link
        >
      </div>
      <div v-else-if="customers.length > 0">
        <p class="mx-1">Click on a customer to view / edit record</p>
      </div>
      <div v-else>
        <p class="mx-1">No customers found</p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h5 class="mx-1">Waiting</h5>
        <ul class="list-group">
          <li v-if="waitingCustomers.length == 0" class="list-group-item">
            No customers to show
          </li>
          <li
            class="list-group-item"
            :class="{ active: index == currentWaitingIndex }"
            v-for="(customer, index) in waitingCustomers"
            :key="index"
            @click="setActiveCustomer(customer, index)"
          >
            {{ customer.name ? customer.name + " - " : "" }} {{ customer.ticketNumber }}
            <span style="float: right" v-if="customer.notificationDate != null">√</span>
            <span style="float: right" v-else>X</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col">
        <h5 class="mx-1">Notified</h5>
        <ul class="list-group">
          <li v-if="notifiedCustomers.length == 0" class="list-group-item">
            No customers to show
          </li>
          <li
            class="list-group-item"
            :class="{ active: index == currentNotifiedIndex }"
            v-for="(customer, index) in notifiedCustomers"
            :key="index"
            @click="setActiveCustomer(customer, index)"
          >
            {{ customer.name ? customer.name + " - " : "" }} {{ customer.ticketNumber }}
            <span style="float: right" v-if="customer.notificationDate != null">√</span>
            <span style="float: right" v-else>X</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.container {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid;
  background-color: #00000010;
}
</style>

<script>
import CustomerDataService from "../services/CustomerDataService";

export default {
  name: "customers-list",
  data() {
    return {
      customers: [],
      waitingCustomers: [],
      notifiedCustomers: [],
      currentCustomer: null,
      currentNotifiedIndex: -1,
      currentWaitingIndex: -1,
      query: "",
      interval: null,
    };
  },
  methods: {
    retrieveCustomers() {
      CustomerDataService.getAll()
        .then((response) => {
          this.customers = response.data;
          this.setCustomers();
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveCustomers();
      this.currentCustomer = null;
      this.currentNotifiedIndex = -1;
      this.currentWaitingIndex = -1;
    },

    setActiveCustomer(customer, index) {
      this.currentNotifiedIndex = -1;
      this.currentWaitingIndex = -1;
      if (this.currentCustomer == customer) {
        this.currentCustomer = null;
        return;
      }
      this.currentCustomer = customer;
      if (customer && customer.notificationDate == null) {
        this.currentWaitingIndex = customer ? index : -1;
      } else {
        this.currentNotifiedIndex = customer ? index : -1;
      }
    },
    setCustomers() {
      this.waitingCustomers = [];
      this.notifiedCustomers = [];
      for (let customer of this.customers) {
        if (customer && customer.notificationDate == null) {
          this.waitingCustomers.push(customer);
        } else {
          this.notifiedCustomers.push(customer);
        }
      }
    },
    removeAllCustomers() {
      CustomerDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    search() {
      CustomerDataService.findByAny(this.query)
        .then((response) => {
          this.customers = response.data;
          this.setCustomers();
          this.setActiveCustomer(null);
          console.log(response.data);
          this.stopRefresh();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    startRefresh() {
      this.retrieveCustomers();
      this.query = "";
      if (this.interval == null) {
        this.interval = setInterval(() => {
          this.retrieveCustomers();
        }, 30000);
      }
    },
    stopRefresh() {
      window.clearInterval(this.interval);
      this.interval = null;
    },
  },
  mounted() {
    this.startRefresh();
  },
};
</script>
