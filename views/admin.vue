<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const tab = ref("jelo");
const jela = ref<any[]>([]);
const korisnici = ref<any[]>([]);
const porudzbine = ref<any[]>([]);
const novoJelo = ref({ naziv: "", cena: 0, opis: "", slika: "" });
const izmenaId = ref<number | null>(null);
const ucitajJela = async () => {
  const res = await axios.get("http://localhost:3000/api/jela");
  jela.value = res.data;
};
const ucitajKorisnike = async () => {
  const res = await axios.get("http://localhost:3000/api/korisnik");
  korisnici.value = res.data;
};
const ucitajPorudzbine = async () => {
  const res = await axios.get("http://localhost:3000/api/porudzbina");
  porudzbine.value = res.data;
};
const dodajJelo = async () => {
  await axios.post("http://localhost:3000/api/jela", novoJelo.value);
  await ucitajJela();
  novoJelo.value = { naziv: "", cena: 0, opis: "", slika: "" };
};
const obrisiJelo = async (id: number) => {
  await axios.delete(`http://localhost:3000/api/jela/${id}`);
  await ucitajJela();
};
const izaberiZaIzmenu = (j: any) => {
  izmenaId.value = j.id;
  novoJelo.value = { naziv: j.naziv, cena: j.cena, opis: j.opis, slika: j.slika };
};
const izmeniJelo = async () => {
  if (!izmenaId.value) return;
  await axios.put(`http://localhost:3000/api/jela/${izmenaId.value}`, novoJelo.value);
  await ucitajJela();
  izmenaId.value = null;
  novoJelo.value = { naziv: "", cena: 0, opis: "", slika: "" };
};
const obrisiKorisnika = async (id: number) => {
  await axios.delete(`http://localhost:3000/api/korisnik/${id}`);
  await ucitajKorisnike();
};
const izmeniStatus = async (p: any) => {
  await axios.put(`http://localhost:3000/api/porudzbina/${p.id}`, { status: p.status });
};
onMounted(() => {
  ucitajJela();
  ucitajKorisnike();
  ucitajPorudzbine();
});
</script>
<template>
  <div class="admin-container">
    <nav class="nav-tabs">
      <button :class="{ active: tab === 'jelo' }" @click="tab = 'jelo'">Jela</button>
      <button :class="{ active: tab === 'korisnik' }" @click="tab = 'korisnik'">Korisnici</button>
      <button :class="{ active: tab === 'porudzbina' }" @click="tab = 'porudzbina'">Porudžbine</button>
    </nav>
    <div v-if="tab === 'jelo'" class="section">
      <h2>Jela</h2>
      <div class="grid">
        <div v-for="j in jela" :key="j.id" class="card">
          <div class="card-image">
            <img v-if="j.slika" :src="j.slika" alt="slika jela" />
          </div>
          <div class="card-content">
            <h3>{{ j.naziv }}</h3>
            <p>{{ j.opis }}</p>
            <p class="cena">{{ j.cena }} RSD</p>
            <div class="actions">
              <button class="btn danger" @click="obrisiJelo(j.id)">Obriši</button>
              <button class="btn" @click="izaberiZaIzmenu(j)">Izmeni</button>
            </div>
          </div>
        </div>
      </div>
      <div class="form">
        <input v-model="novoJelo.naziv" placeholder="Naziv jela" />
        <input v-model.number="novoJelo.cena" type="number" placeholder="Cena" />
        <input v-model="novoJelo.opis" placeholder="Opis jela" />
        <input v-model="novoJelo.slika" placeholder="URL slike" />
        <button v-if="!izmenaId" class="btn success" @click="dodajJelo">Dodaj jelo</button>
        <button v-else class="btn success" @click="izmeniJelo">Sačuvaj izmene</button>
      </div>
    </div>
    <div v-if="tab === 'korisnik'" class="section">
      <h2>Korisnici</h2>
      <ul class="list">
        <li v-for="k in korisnici" :key="k.id" class="list-item">
          <span>{{ k.email }} - <strong>{{ k.uloga }}</strong></span>
          <button
            v-if="k.uloga !== 'admin'"
            class="btn danger"
            @click="obrisiKorisnika(k.id)">
            Obriši
          </button>
        </li>
      </ul>
    </div>
    <div v-if="tab === 'porudzbina'" class="section">
      <h2>Porudžbine</h2>
      <ul class="list">
        <li v-for="p in porudzbine" :key="p.id" class="list-item">
          <span>ID: {{ p.id }} - Status: {{ p.status }}</span>
          <select v-model="p.status" @change="izmeniStatus(p)">
            <option value="u toku">U toku</option>
            <option value="završena">Završena</option>
            <option value="otkazana">Otkazana</option>
          </select>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.admin-container {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  color: #fff;
}
.nav-tabs {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}
.nav-tabs button {
  padding: 10px 20px;
  background: #333;
  border: none;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}
.nav-tabs button.active,
.nav-tabs button:hover {
  background: #4caf50;
}
.section {
  margin-top: 20px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
.card {
  background: #222;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
.card-image {
  width: 100%;
  height: 180px;
  overflow: hidden;
}
.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card-content {
  padding: 10px;
}
.card-content h3 {
  margin: 0;
}
.cena {
  font-weight: bold;
  margin: 10px 0;
}
.actions {
  display: flex;
  justify-content: space-between;
}
.list {
  list-style: none;
  padding: 0;
}
.list-item {
  background: #222;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.form input {
  padding: 8px;
  border-radius: 6px;
  border: none;
  outline: none;
}
.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: #fff;
  background: #555;
}
.btn:hover {
  background: #666;
}
.btn.success {
  background: #4caf50;
}
.btn.success:hover {
  background: #43a047;
}
.btn.danger {
  background: #e53935;
}
.btn.danger:hover {
  background: #d32f2f;
}
</style>

