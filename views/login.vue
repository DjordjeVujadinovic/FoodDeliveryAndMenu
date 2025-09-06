<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "../store/korisnik.store";
const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();
async function login() {
  error.value = "";
  try {
    const res = await fetch("http://localhost:3000/api/korisnik/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        lozinka: password.value,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      error.value = data.message || "Neuspešan login";
      return;
    }
    userStore.setUser(data.token, data.korisnik.uloga, data.korisnik.id);
    router.push("/meni");
  } catch (err) {
    error.value = "Greška u konekciji sa serverom";
  }
}
</script>
<template>
  <div class="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="login" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-100">Email address</label>
          <div class="mt-2">
            <input
              id="email"
              type="email"
              v-model="email"
              required
              autocomplete="email"
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium text-gray-100">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-400 hover:text-indigo-300">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              type="password"
              v-model="password"
              required
              autocomplete="current-password"
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Sign in
          </button>
        </div>
      </form>
      <p v-if="error" class="mt-4 text-center text-sm font-medium text-red-400">
        {{ error }}
      </p>
      <p class="mt-10 text-center text-sm text-gray-400">
        Not a member?
        <router-link to="/register" class="font-semibold text-indigo-400 hover:text-indigo-300">
          Register now
        </router-link>
      </p>
    </div>
  </div>
</template>
