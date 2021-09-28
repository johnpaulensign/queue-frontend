<template>
  <div>
    <div v-if="authenticated">
      <h4>Admin</h4>
      <li>
      <a href="/admin/customers">Customers</a>
      </li>
      <li>
      <a href="/admin/control">Control</a>
      </li>
    </div>
    <div v-else>
      <form  @submit.prevent="login">
        <input type="text" name="username" id="username" v-model="username"> <br>
        <input type="password" name="password" id="password" v-model="password"> <br>
        <input type="submit" value="Login">
      </form>
    </div>
  </div>
</template>

<script>
import LoginDataService from "../services/LoginDataService";

export default {
  name: "admin",
  data() {
    return {
      authenticated: false,
      username: "jp",
      password: "pw"
    };
  },
  methods: {
    login() {
      LoginDataService.login(this.username, this.password)
      .then(response => {
        console.log("Success:", response)
        this.authenticated = true;
      }).catch(response => {
        console.log("Error:", response)
      })
    }
  },
  mounted() {
    LoginDataService.get().then(response => {
      if(response.status == 401) {
        this.authenticated = false;
      } else {
        this.authenticated = true;
      }
    })
  }
};
</script>

<style>
</style>