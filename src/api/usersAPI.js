import axios from "axios"
import { authHeaders } from "@/api/authAPI"

let base_url = "users"

export const usersAPI = {
  async getItemsList(
    token,
    searchForm = {
      username: "",
      last_name: "",
      is_superuser: "",
      is_staff: "",
      is_active: "",
      user_type: "",
    }
  ) {
    let { username, last_name, is_superuser, is_staff, is_active, user_type } =
      searchForm
    return axios.get(
      `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/${base_url}/?username__icontains=${username}&last_name__icontains=${last_name}&user_type=${user_type}&is_superuser=${is_superuser}&is_staff=${is_staff}&is_active=${is_active}`,
      authHeaders(token)
    )
  },

  async updateList(url, token) {
    return axios.get(url, authHeaders(token))
  },

  async getItemData(token, itemId) {
    return axios.get(
      `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/${base_url}/${itemId}`,
      authHeaders(token)
    )
  },

  async addItem(token, itemData) {
    return axios.post(
      `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/${base_url}/`,
      itemData,
      authHeaders(token)
    )
  },

  async updateItem(token, itemData) {
    return axios.patch(
      `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/${base_url}/${itemData.id}/`,
      itemData,
      authHeaders(token)
    )
  },

  async deleteItem(token, itemId) {
    return axios.delete(
      `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/${base_url}/${itemId}/`,
      authHeaders(token)
    )
  },

  async updatePassword(token, id, newPassword) {
    return axios.post(
      `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/${base_url}/${id}/set_password/`,
      newPassword,
      authHeaders(token)
    )
  },
}
