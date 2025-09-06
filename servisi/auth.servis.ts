import axios from 'axios';
import { userStore } from '../store/korisnik.store';
const API_URL = 'http://localhost:3000/api';
export async function login(email: string, lozinka: string) {
  const res = await axios.post(`${API_URL}/login`, { email, lozinka });
  const data = res.data;
  userStore.setUser(data.token, data.korisnik.uloga, data.korisnik.id);
  return data;
}
export async function register(ime: string, email: string, lozinka: string, uloga: string = "kupac") {
  const res = await axios.post(`${API_URL}/register`, { ime, email, lozinka, uloga });
  const data = res.data;
  userStore.setUser(data.token, data.role, data.id);
  return data;
}
