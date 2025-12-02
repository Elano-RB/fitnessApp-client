<script setup>
import { useAuth } from "../stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const { isLoggedIn, logout } = useAuth();

const handleLogout = () => {
  logout();
  router.push("/login");
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">

      <router-link class="navbar-brand" to="/">FitnessApp</router-link>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">

          <li class="nav-item" v-if="isLoggedIn">
            <button class="btn btn-danger" @click="handleLogout">Logout</button>
          </li>

          <li class="nav-item" v-else>
            <router-link class="btn btn-primary me-2" to="/login">Login</router-link>
            <router-link class="btn btn-secondary" to="/register">Register</router-link>
          </li>

        </ul>
      </div>

    </div>
  </nav>
</template>
