import axios from 'axios';
import { userStore } from '../store/korisnik.store';
const API_URL = 'http://localhost:3000/api/artikli';
export async function getArtikli() {
  return axios.get(API_URL, {
    headers: { Authorization: `Bearer ${userStore.token}` },
  });
}
export async function addArtikal(naziv: string, cena: number, opis: string) {
  return axios.post(API_URL, { naziv, cena, opis }, {
    headers: { Authorization: `Bearer ${userStore.token}` },
  });
}
