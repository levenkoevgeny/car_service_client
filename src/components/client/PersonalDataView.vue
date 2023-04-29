<template>
  <div class="container">
    <a href="/" style="text-decoration: none; color: inherit">&lt; Назад</a>
    <h5 class="my-3">Персональные данные</h5>
    <div class="mb-3 text-center">
      <img
        src="https://wroom.ru/i/cars2/bmw_5_7.jpg"
        class="card-img-top rounded-circle"
        alt="..."
        style="height: 200px; width: 200px"
      />
    </div>
    <div class="row">
      <div class="col-12">
        <div class="mb-3">
          <label class="form-label">Фамилия</label>
          <input
            type="text"
            class="form-control"
            v-model="userData.last_name"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="mb-3">
          <label class="form-label">Имя, отчество</label>
          <input
            type="text"
            class="form-control"
            v-model="userData.first_name"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "PersonalDataView",
  computed: {
    ...mapGetters({
      userData: "auth/getUser",
      userToken: "auth/getToken",
    }),
  },
  watch: {},
}
</script>

<style scoped></style>
