<script setup lang="ts">
import { ref, onMounted } from "vue";
import { userStore } from "../store/korisnik.store";
const meni = ref<any[]>([]);
const error = ref("");
const loading = ref(true);
async function fetchMeni() {
  try {
    const res = await fetch("http://localhost:3000/api/jela");
    const data = await res.json();
    console.log("Podaci sa servera:", data);
    meni.value = data;
  } catch (err) {
    error.value = "Greška pri učitavanju menija";
  } finally {
    loading.value = false;
  }
}
function dodajUKorpu(jelo: any) {
  let korpa = JSON.parse(localStorage.getItem("korpa") || "[]");
  korpa.push(jelo);
  localStorage.setItem("korpa", JSON.stringify(korpa));
  alert("Dodato u korpu!");
}
onMounted(fetchMeni);
</script>
<template>
  <div class="page-container">
    <p v-if="loading">Učitavanje...</p>
    <p v-if="error" class="error">{{ error }}</p>
    <div class="meni-grid">
      <div
        v-for="jelo in meni"
        :key="jelo.id"
        class="jelo-card"
      >
        <div class="jelo-slika">
          <img
            v-if="jelo.slika"
            :src="jelo.slika"
            :alt="jelo.naziv"
          />
          <span v-else>Bez slike</span>
        </div>
        <div class="jelo-info">
          <h3>{{ jelo.naziv }}</h3>
          <p class="opis">{{ jelo.opis }}</p>
          <div class="cena-btn">
            <span class="cena">{{ jelo.cena }} RSD</span>
            <button @click="dodajUKorpu(jelo)">Dodaj u korpu</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.page-container {
  padding: 20px;
}
.meni-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.jelo-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fcfcfc85;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.jelo-slika {
  width: 100%;
  height: 200px; 
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  overflow: hidden; 
}
.jelo-slika img {
  width: 100%;
  height: 100%;
  object-fit: cover; 
}
.jelo-slika span {
  color: #666;
  font-size: 14px;
}
.jelo-info {
  padding: 15px;
}
.jelo-info h3 {
  font-size: 18px;
  margin: 0;
  color: #222;
}
.jelo-info .opis {
  font-size: 14px;
  color: #555;
  margin-top: 5px;
  margin-bottom: 10px;
}
.cena-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cena {
  font-size: 16px;
  font-weight: bold;
  color: #222;
}
button {
  padding: 6px 12px;
  background: #16a34a;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}
button:hover {
  background: #15803d;
}
</style>
