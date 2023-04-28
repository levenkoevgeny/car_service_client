<template>
  <div class="container">
    <h1>Список пользователей</h1>

    <table class="table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Username</th>
          <th scope="col">Фамилия</th>
          <th scope="col">Имя, отчество</th>
          <th scope="col">Тип пользователя</th>
          <th scope="col">Дата добавления</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in sortedUsersList" :key="user.id">
          <td v-if="user.avatar">{{ user.avatar }}</td>
          <td v-else></td>
          <td>{{ user.username }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.firstname }}</td>
          <td>{{ user.user_type }}</td>
          <td>
            {{ getFormattedDateComponent(user.date_joined) }}
            {{ getFormattedTimeComponent(user.date_joined) }}
          </td>
        </tr>
      </tbody>
    </table>
    <nav>
      <ul class="pagination pagination-md">
        <li class="page-item" :class="{ disabled: !usersList.previous }">
          <button
            class="page-link"
            @click="updatePaginator(usersList.previous)"
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        <li class="mx-2"></li>
        <li class="page-item" :class="{ disabled: !usersList.next }">
          <button class="page-link" @click="updatePaginator(usersList.next)">
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import debounce from "lodash.debounce"
import { usersAPI } from "@/api/usersAPI"
import { getFormattedDate, getFormattedTime } from "@/utils"
import { ordersAPI } from "@/api/ordersAPI"

export default {
  name: "usersList",
  data() {
    return {
      usersList: [],
      orderSearchForm: {},
      isLoading: true,
      isError: false,
    }
  },
  async created() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      this.isLoading = true
      try {
        const usersResponse = await usersAPI.getItemsList(this.userToken)
        this.usersList = await usersResponse.data
      } catch (error) {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },
    async updatePaginator(url) {
      this.isLoading = true
      try {
        const response = await usersAPI.updateList(url, this.userToken)
        this.usersList = await response.data
      } catch (error) {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },
    getFormattedDateComponent(dateTime) {
      return getFormattedDate(dateTime)
    },
    getFormattedTimeComponent(dateTime) {
      return getFormattedTime(dateTime)
    },
  },
  computed: {
    ...mapGetters({
      userData: "auth/getUser",
      userToken: "auth/getToken",
    }),
    sortedUsersList() {
      return this.usersList.results
    },
  },
}
</script>

<style scoped></style>
