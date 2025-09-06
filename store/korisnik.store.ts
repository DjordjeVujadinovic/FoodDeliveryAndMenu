import { reactive } from 'vue';
export const userStore = reactive({
  token: localStorage.getItem('token') || '',
  role: localStorage.getItem('role') || '',
  id: Number(localStorage.getItem('id')) || null,
  setUser(token: string, role: string, id: number) {
    this.token = token;
    this.role = role;
    this.id = id;
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('id', id.toString());
  },
  logout() {
    this.token = '';
    this.role = '';
    this.id = null;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
  },
});
