<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Название организации</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/"
              >На главную</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/admin">Пользователи</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/admin/orders">Заказы</a>
          </li>
        </ul>
        <div class="btn-group dropstart">
          <div
            class="btn btn-secondary bg-dark border-0"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            v-if="userData.last_name"
          >
            <font-awesome-icon icon="fa-solid fa-user" />&nbsp;
            {{ userData.last_name }}
          </div>

          <div
            class="btn btn-secondary bg-dark border-0"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            v-else
          >
            <font-awesome-icon icon="fa-solid fa-user" />&nbsp;
            {{ userData.username }}
          </div>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li style="cursor: pointer">
              <a class="dropdown-item"> Личный кабинет </a>
            </li>
            <li style="cursor: pointer">
              <a class="dropdown-item" @click="logOut"> Выход из системы </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>

  <div class="mt-3">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "AdminViewHome",
  computed: {
    ...mapGetters({
      userData: "auth/getUser",
      userToken: "auth/getToken",
    }),
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/actionRemoveLogIn")
      this.$router.push({ name: "login", replace: true })
    },
  },
}
</script>

<style scoped></style>
