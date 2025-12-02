<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginUser } from "../services/auth"; 
import { useAuth } from "../stores/auth";
import { Notyf } from "notyf";

const notyf = new Notyf();
const router = useRouter();
const { login } = useAuth();

const email = ref("");
const password = ref("");

const onSubmit = async () => {
  try {
    const res = await loginUser({
      email: email.value,
      password: password.value,
    });

    login(res.data.access);

    notyf.success("Login successful!");
    router.push("/workouts");
  } catch (err) {
    notyf.error(err.response?.data?.message || "Login failed");
  }
};
</script>

<template>
  <div class="container mt-5">
    <h2 class="mb-3">Login</h2>

    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label>Email</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>

      <div class="mb-3">
        <label>Password</label>
        <input v-model="password" type="password" class="form-control" required />
      </div>

      <button class="btn btn-primary w-100">Login</button>
    </form>
  </div>
</template>
