<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "../store/korisnik.store";
const router = useRouter();
const korpa = ref<any[]>(JSON.parse(localStorage.getItem("korpa") || "[]"));
function ukloniIzKorpe(index: number) {
  korpa.value.splice(index, 1);
  localStorage.setItem("korpa", JSON.stringify(korpa.value));
}
async function potvrdiPorudzbinu() {
  try {
    const res = await fetch("http://localhost:3000/api/porudzbina", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userStore.token}`,
      },
      body: JSON.stringify({
        stavke: korpa.value.map((item: any) => ({
          jelo_id: item.id,
          kolicina: item.kolicina || 1,
        })),
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Greška!");
      return;
    }
    alert("Porudžbina je kreirana");
    korpa.value = [];
    localStorage.removeItem("korpa");
  } catch (err) {
    console.error("Greška:", err);
    alert("Greška servera.");
  }
}
</script>
<template>
  <div class="korpa-container">
    <h2>Vaša korpa</h2>
    <p v-if="korpa.length === 0" class="prazna">Korpa je prazna.</p>
    <div v-else class="stavke-lista">
      <div v-for="(jelo, i) in korpa" :key="i" class="stavka-card">
        <div class="stavka-info">
          <h3>{{ jelo.naziv }}</h3>
          <p>Cena: {{ jelo.cena }} RSD</p>
          <p>Količina: x{{ jelo.kolicina || 1 }}</p>
          <p class="ukupno">Ukupno: {{ (jelo.cena * (jelo.kolicina || 1)).toFixed(2) }} RSD</p>
        </div>
        <button class="ukloni" @click="ukloniIzKorpe(i)">Ukloni</button>
      </div>
      <div class="ukupno-container">
        <h3>Ukupno: {{ korpa.reduce((s, j) => s + j.cena * (j.kolicina || 1), 0) }} RSD</h3>
      </div>
      <button class="poruci-dugme" @click="potvrdiPorudzbinu">Potvrdi porudžbinu</button>
    </div>
  </div>
</template>
<style scoped>
.korpa-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: #1e1e1e;
  border-radius: 12px;
  color: #fff;
  text-align: center;
  font-size: 18px;
}
h2 {
  margin-bottom: 20px;
  font-size: 26px;
}
.prazna {
  font-size: 20px;
  color: #bbb;
}
.stavke-lista {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.stavka-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2c2c2c;
  padding: 15px;
  border-radius: 10px;
  font-size: 18px;
}
.stavka-info h3 {
  margin: 0 0 5px 0;
  font-size: 20px;
}
.ukupno {
  font-weight: bold;
  color: #4caf50;
}
.ukloni {
  background: #d9534f;
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}
.ukloni:hover {
  background: #c9302c;
}
.ukupno-container {
  margin-top: 20px;
  font-size: 22px;
  font-weight: bold;
}
.poruci-dugme {
  margin-top: 20px;
  padding: 12px 20px;
  font-size: 20px;
  background: #4caf50;
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}
.poruci-dugme:hover {
  background: #45a049;
}
</style>
