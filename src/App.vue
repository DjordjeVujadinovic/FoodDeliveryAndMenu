<script setup lang="ts">
import { userStore } from "../store/korisnik.store";
import NavMeni from "./components/NavMeni.vue";
function logout() {
  userStore.logout();
}
import { RouterView } from "vue-router";
</script>

<template>
  <NavMeni />
  <router-view />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
