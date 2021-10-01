<template>
  <div>
    <div v-if="authenticated">
      <h1 class="mb-3">Admin Panel</h1>
      <div class="container">
        <div class="row">
          <div class="col-4">
            <control></control>
          </div>
          <div class="col-8">
            <customers-list></customers-list>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <form @submit.prevent="login">
        <input type="text" name="username" id="username" v-model="username" /> <br />
        <input type="password" name="password" id="password" v-model="password" /> <br />
        <input type="submit" value="Login" />
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
    login() {
      LoginDataService.login(this.username, this.password)
        .then((response) => {
          console.log("Success:", response);
          this.authenticated = true;
        })
        .catch((response) => {
          console.log("Error:", response);
        });
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
</style>
