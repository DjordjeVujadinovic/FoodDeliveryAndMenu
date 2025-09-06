import axios from 'axios';
import { userStore } from '../store/korisnik.store';
const API_URL = 'http://localhost:3000/api/porudzbina';
export async function napraviPorudzbinu(artikli: { artikalId: number, kolicina: number }[]) {
  return axios.post(API_URL, { artikli }, {
    headers: { Authorization: `Bearer ${userStore.token}` },
  });
}
export async function getPorudzbine() {
  return axios.get(API_URL, {
    headers: { Authorization: `Bearer ${userStore.token}` },
  });



}
export async function potvrdiPorudzbinu(id: number) {
  return axios.put(`${API_URL}/potvrdi/${id}`, {}, {
    headers: { Authorization: `Bearer ${userStore.token}` },
  }


);
}
export async function obrisiPorudzbinu(id: number) {
  return axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${userStore.token}` },
  });
}
