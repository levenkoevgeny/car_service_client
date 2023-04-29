<template>
  <div
    class="modal fade"
    id="updateUserModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="userUpdate"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form @submit.prevent="updateUser" autocomplete="off">
          <div class="modal-header">
            <h5 class="modal-title">Редактирование пользователя</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col-12">
                  <div class="mb-3">
                    <label class="form-label">Логин</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="currentUserForUpdate.username"
                      autocomplete="off"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label">Фамилия</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="currentUserForUpdate.last_name"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label">Имя</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="currentUserForUpdate.first_name"
                      autocomplete="off"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="mb-3">
                    <label class="form-label">Категория пользователя</label>
                    <select
                      class="form-select"
                      v-model="currentUserForUpdate.user_type"
                    >
                      <option value="0">Обычный пользователь</option>
                      <option value="1">Водитель</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="currentUserForUpdate.is_superuser"
                    />
                    <label class="form-check-label"> Суперпользователь </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="currentUserForUpdate.is_staff"
                    />
                    <label class="form-check-label"> Персонал </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="currentUserForUpdate.is_active"
                    />
                    <label class="form-check-label"> Активный </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              ref="updateUserModalCloseButton"
            >
              Закрыть
            </button>
            <button type="submit" class="btn btn-primary">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="container">
    <h1>Список пользователей</h1>
    <div class="shadow p-3 mb-5 bg-body rounded">
      <h5>Поиск</h5>
      <div class="row">
        <div class="col-6">
          <div class="mb-3">
            <label class="form-label">Логин</label>
            <input
              type="text"
              class="form-control"
              v-model="searchForm.username"
            />
          </div>
        </div>
        <div class="col-6">
          <div class="mb-3">
            <label class="form-label">Фамилия</label>
            <input
              type="text"
              class="form-control"
              v-model="searchForm.last_name"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="mb-3">
            <label class="form-label">Активный</label>
            <select class="form-select" v-model="searchForm.is_active">
              <option selected value="">----------</option>
              <option value="true">Да</option>
              <option value="false">Нет</option>
            </select>
          </div>
        </div>

        <div class="col-6">
          <div class="mb-3">
            <label class="form-label">Тип пользователя</label>
            <select class="form-select" v-model="searchForm.user_type">
              <option selected value="">----------</option>
              <option value="0">Обычный пользователь</option>
              <option value="1">Водитель</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Username</th>
          <th scope="col">Фамилия</th>
          <th scope="col">Имя, отчество</th>
          <th scope="col" class="text-center">Тип пользователя</th>
          <th scope="col" class="text-center">Активный</th>
          <th scope="col">Дата добавления</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in sortedUsersList"
          :key="user.id"
          @click="showModalForUpdate(user.id)"
          style="cursor: pointer"
        >
          <td v-if="user.avatar">{{ user.avatar }}</td>
          <td v-else></td>
          <td>{{ user.username }}</td>
          <td>{{ user.last_name }}</td>
          <td>{{ user.first_name }}</td>
          <td v-if="user.user_type === 0" class="text-center">
            <font-awesome-icon icon="fa-solid fa-user" />
          </td>
          <td v-else class="text-center">
            <font-awesome-icon icon="fa-solid fa-car" />{{}}
          </td>
          <td class="text-center" v-if="user.is_active">
            <font-awesome-icon icon="fa-solid fa-unlock" />
          </td>
          <td v-else class="text-center">
            <font-awesome-icon icon="fa-solid fa-lock" />
          </td>
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

export default {
  name: "UsersList",
  data() {
    return {
      usersList: [],
      newUserForm: {
        username: "",
        password: "",
        is_superuser: false,
        is_staff: false,
        is_active: true,
        user_type: "",
        first_name: "",
        last_name: "",
        subdivision: "",
      },
      currentUserForUpdate: {
        username: "",
        password: "",
        is_superuser: false,
        is_staff: false,
        first_name: "",
        last_name: "",
        subdivision: "",
      },
      newPasswordForm: {
        password: "",
      },
      searchForm: {
        username: "",
        last_name: "",
        subdivision: "",
        is_superuser: "",
        is_staff: "",
        is_active: "",
        user_type: "",
      },
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
        const usersResponse = await usersAPI.getItemsList(
          this.userToken,
          this.searchForm
        )
        this.usersList = await usersResponse.data
      } catch (error) {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },
    async getCurrentUser(userID) {
      const response = await usersAPI.getItemData(this.userToken, userID)
      this.currentUserForUpdate = await response.data
    },
    async showModalForUpdate(userID) {
      this.isError = false
      try {
        await this.getCurrentUser(userID)
        let updateModal = this.$refs.userUpdate
        let myModal = new bootstrap.Modal(updateModal, {
          keyboard: false,
        })
        myModal.show()
      } catch (event) {
        this.isError = true
      } finally {
      }
    },
    async updateUser() {
      this.isLoading = true
      delete this.currentUserForUpdate.password
      try {
        await usersAPI.updateItem(this.userToken, this.currentUserForUpdate)
        await this.loadData()
      } catch (error) {
        this.isError = true
      } finally {
        this.$refs.updateUserModalCloseButton.click()
        this.isLoading = false
      }
    },
    debouncedSearch: debounce(async function () {
      await this.loadData()
    }, 500),
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
    getUserStatusText(status) {
      let statusText
      switch (status) {
        case 0:
          statusText = "Пользователь"
          break
        case 1:
          statusText = "Водитель"
          break
        default:
          statusText = ""
      }
      return statusText
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
  watch: {
    searchForm: {
      handler(newValue, oldValue) {
        this.debouncedSearch()
      },
      deep: true,
    },
  },
}
</script>

<style scoped></style>
