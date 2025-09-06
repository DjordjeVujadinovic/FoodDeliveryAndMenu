<script setup lang="ts">
import { ref, onMounted } from "vue";
import { userStore } from "../store/korisnik.store";
const porudzbine = ref<any[]>([]);
const error = ref("");
const loading = ref(true);
async function fetchPorudzbine() {
  try {
    const res = await fetch("http://localhost:3000/api/porudzbina", {
      headers: { "Authorization": `Bearer ${userStore.token}` },
    });
    const data = await res.json();
    porudzbine.value = data;
  } catch (err) {
    error.value = "Greška pri učitavanju porudžbina";
  } finally {
    loading.value = false;
  }
}
onMounted(fetchPorudzbine);
</script>
<template>
  <div class="page-container">
    <h2>Moje porudžbine</h2>
    <p v-if="loading">Učitavanje...</p>
    <p v-if="error" class="error">{{ error }}</p>
    <ul>
      <li v-for="p in porudzbine" :key="p.id">
        <b>Porudžbina #{{ p.id }}</b> - {{ p.stavke.length }} stavki, ukupno {{ p.ukupno }} RSD
      </li>
    </ul>
  </div>
</template>
<style scoped>
.page-container { padding: 20px; }
</style>
