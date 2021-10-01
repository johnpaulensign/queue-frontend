<template>
  <div>
    <div v-if="authenticated" style="float: right" class="mr-3">
      <button @click="logout">Logout</button>
    </div>
    <h1 class="mb-3">Admin Panel</h1>
    <div v-if="authenticated">
      <div class="container">
        <div class="row">
          <div class="col-4">
            <control @refreshCustomers="refreshCustomers"></control>
          </div>
          <div class="col-8">
            <customers-list ref="customerList"></customers-list>
          </div>
        </div>
      </div>
    </div>
    <div v-else id="loginForm" class="container mt-4">
      <form @submit.prevent="login">
        <div class="row">
          <label for="username" class="col">Username</label>
          <input
            type="text"
            class="col"
            name="username"
            id="username"
            v-model="username"
          />
        </div>
        <div class="row">
          <label class="col" for="password">Password</label>
          <input
            class="col"
            type="password"
            name="password"
            id="password"
            v-model="password"
          />
        </div>
        <div class="row">
          <input class="col" type="submit" value="Login" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import LoginDataService from "../services/LoginDataService";
import Control from "./Control";
import CustomersList from "./CustomersList";

export default {
  name: "admin",
  components: { Control, CustomersList },
  data() {
    return {
      authenticated: false,
      username: "",
      password: "",
    };
  },
  methods: {
    logout() {
      window.location.replace("/api/logout");
    },
    login() {
      LoginDataService.login(window.location.host, this.username, this.password)
        .then((response) => {
          console.log("Success:", response);
          this.authenticated = true;
        })
        .catch((response) => {
          console.log("Error:", response);
        });
    },
    refreshCustomers() {
      this.$refs.customerList.retrieveCustomers();
    },
  },
  mounted() {
    LoginDataService.get().then((response) => {
      if (response.status == 401) {
        this.authenticated = false;
      } else {
        this.authenticated = true;
      }
    });
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
#loginForm.container {
  width: 30%;
}
#loginForm.row {
  text-align: center;
  align-items: center;
}
#loginForm label {
  font-size: 28px;
}
#loginForm input {
  margin-bottom: 15px;
  height: 50px;
}
</style>
