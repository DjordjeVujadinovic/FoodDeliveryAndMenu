<script setup lang="ts">
import { userStore } from '../../store/korisnik.store';
</script>
<template>
  <nav class="fixed top-0 left-0 w-full z-50 bg-gray-800/50 backdrop-blur">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="shrink-0">
        </div>
        <div class="flex-1 flex justify-center">
          <div class="flex items-baseline space-x-6">
            <router-link
              to="/"
              class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
              active-class="bg-gray-950/50 text-white">
              Meni
            </router-link>
            <router-link
              to="/korpa"
              class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
              active-class="bg-gray-950/50 text-white">
              Korpa
            </router-link>
            <router-link
              to="/porudzbina"
              class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
              active-class="bg-gray-950/50 text-white">
              Porudžbine
            </router-link>
            <router-link
              v-if="!userStore.token"
              to="/login"
              class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
              Login
            </router-link>
            <router-link
              v-if="!userStore.token"
              to="/register"
              class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
              Register
            </router-link>
            <a
              v-if="userStore.token"
              href="#"
              @click.prevent="userStore.logout()"
              class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
              Logout
            </a>
            <router-link
              v-if="userStore.token && userStore.role === 'admin'"
              to="/admin"
              class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
              active-class="bg-gray-950/50 text-white">
              Admin
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
