<template>
  <div v-if="currentCustomer" class="edit-form">
    <h4>Customer</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
          v-model="currentCustomer.name"
        />
      </div>
      <div class="form-group">
        <label for="phone">Phone</label>
        <input type="text" class="form-control" id="phone"
          v-model="currentCustomer.phone"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" class="form-control" id="email"
          v-model="currentCustomer.email"
        />
      </div>

      <div class="form-group">
        <label for="ticketNumber">Ticket Number</label>
        <input type="text" class="form-control" id="ticketNumber"
          v-model="currentCustomer.ticketNumber"
        />
      </div>

      <!-- <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentCustomer.published ? "Published" : "Pending" }}
      </div> -->
    </form>

    <button class="badge badge-danger mr-2"
      @click="deleteCustomer"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateCustomer"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Customer...</p>
  </div>
</template>

<script>
import CustomerDataService from "../services/CustomerDataService";

export default {
  name: "customer",
  data() {
    return {
      currentCustomer: null,
      message: ''
    };
  },
  methods: {
    getCustomer(id) {
      CustomerDataService.get(id)
        .then(response => {
          this.currentCustomer = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentCustomer.id,
        name: this.currentCustomer.name,
        phone: this.currentCustomer.phone,
        email: this.currentCustomer.email,
        published: status
      };

      CustomerDataService.update(this.currentCustomer.id, data)
        .then(response => {
          console.log(response.data);
          this.currentCustomer.published = status;
          this.message = 'The status was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateCustomer() {
      CustomerDataService.update(this.currentCustomer.id, this.currentCustomer)
        .then(response => {
          console.log(response.data);
          this.message = 'The customer was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteCustomer() {
      CustomerDataService.delete(this.currentCustomer.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "customers" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getCustomer(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>