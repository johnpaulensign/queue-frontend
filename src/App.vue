<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Queue Management</router-link>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/admin" class="nav-link">Admin</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/signup" class="nav-link">Sign Up</router-link>
        </li>
        <li class="nav-item" v-if="this.authenticated">
          <router-link to="/apm/dashboard" class="nav-link">APM</router-link>
        </li>
      </ul>
    </nav>

    <div class="mx-3 mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import LoginDataService from "./services/LoginDataService";

export default {
  name: "app",
  data() {
    return {
      authenticated: false,
    };
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: left; */
  color: #2c3e50;
}
</style>
