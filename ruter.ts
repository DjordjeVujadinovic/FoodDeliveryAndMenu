import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/login.vue';
import Register from './views/register.vue';
import Meni from './views/meni.vue';
import Korpa from './views/korpa.vue';
import Porudzbine from './views/porzubina.vue';
import Admin from './views/admin.vue';
const routes = [
  { path: '/', component: Meni },
  { path: '/meni', component: Meni }  ,
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/korpa', component: Korpa },
  { path: '/porudzbina', component: Porudzbine },
  { path: '/admin', component: Admin }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
