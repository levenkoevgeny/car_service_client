<template>
  <div
    class="modal fade"
    id="orderModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="orderUpdate"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form @submit.prevent="updateOrder">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Редактирование</h5>
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
                    <label class="form-label">{{
                      currentOrderForUpdate.get_address_from
                    }}</label>
                    <Select2
                      v-model="currentOrderForUpdate.address_from"
                      :settings="{
                        ajax: {
                          url: `${VUE_APP_BACKEND_PROTOCOL}://${VUE_APP_BACKEND_HOST}:${VUE_APP_BACKEND_PORT}/api/addresses-select2/`,
                          data: function (params) {
                            var query = { address__icontains: params.term }
                            return query
                          },
                          dataType: 'json',
                        },
                        width: '100%',
                        dropdownParent: '#orderModal',
                      }"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="mb-3">
                    <label class="form-label">{{
                      currentOrderForUpdate.get_address_to
                    }}</label>
                    <Select2
                      v-model="currentOrderForUpdate.address_to"
                      :settings="{
                        ajax: {
                          url: `${VUE_APP_BACKEND_PROTOCOL}://${VUE_APP_BACKEND_HOST}:${VUE_APP_BACKEND_PORT}/api/addresses-select2/`,

                          data: function (params) {
                            var query = { address__icontains: params.term }
                            return query
                          },
                          dataType: 'json',
                        },
                        width: '100%',
                        dropdownParent: '#orderModal',
                      }"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="mb-3">
                    <label class="form-label">{{
                      currentOrderForUpdate.get_driver_info
                    }}</label>
                    <Select2
                      v-model="currentOrderForUpdate.driver"
                      :settings="{
                        ajax: {
                          url: `${VUE_APP_BACKEND_PROTOCOL}://${VUE_APP_BACKEND_HOST}:${VUE_APP_BACKEND_PORT}/api/users-select2/`,

                          data: function (params) {
                            var query = { last_name__icontains: params.term }
                            return query
                          },
                          dataType: 'json',
                        },
                        width: '100%',
                        dropdownParent: '#orderModal',
                      }"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="mb-3">
                    <label class="form-label">Статус заказа</label>
                    <select
                      class="form-select"
                      v-model="currentOrderForUpdate.order_status"
                    >
                      <option value="">-------</option>
                      <option value="0">Создан</option>
                      <option value="1">Принят к исполнению</option>
                      <option value="2">Выполнен</option>
                    </select>
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
              ref="closeOrderUpdateModal"
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
    <h1>Список заказов</h1>
    <div class="charts">
      <div class="row">
        <div class="col-12">
          <h3 class="mt-3">Распределение заказов по времени</h3>
          <GChart type="LineChart" :data="chartData1" :options="options1" />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h3 class="mt-3">Распределение заказов по районам</h3>
          <GChart type="LineChart" :data="chartData2" :options="options2" />
        </div>
      </div>
    </div>

    <h2 class="mt-5">Последние заказы</h2>
    <div class="my-3">
      <div class="row">
        <div class="col-lg-12">
          <div class="mb-3">
            <label class="form-label">Статус заказа</label>
            <select class="form-select" v-model="orderSearchForm.order_status">
              <option value="">-------</option>
              <option value="0">Создан</option>
              <option value="1">Принят к исполнению</option>
              <option value="2">Выполнен</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="mb-3">
            <label class="form-label">Водитель</label>
            <Select2
              v-model="orderSearchForm.driver"
              :settings="{
                ajax: {
                  url: `${VUE_APP_BACKEND_PROTOCOL}://${VUE_APP_BACKEND_HOST}:${VUE_APP_BACKEND_PORT}/api/users-select2/`,

                  data: function (params) {
                    var query = { last_name__icontains: params.term }
                    return query
                  },
                  dataType: 'json',
                },
                width: '100%',
              }"
            />
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-link" @click="clearSearchForm">
        Сбросить фильтр
      </button>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Адрес вызова машины</th>
          <th scope="col">Пункт назначения</th>
          <th scope="col">Дата и время заказа</th>
          <th scope="col">Статус заказа</th>
          <th scope="col">Водитель</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in sortedOrdersList"
          :key="order.id"
          @click="showModalForUpdate(order.id)"
          style="cursor: pointer"
        >
          <td></td>
          <td>
            <font-awesome-icon icon="fa-solid fa-map-location" />&nbsp;&nbsp;{{
              order.get_address_from
            }}
          </td>
          <td>
            <font-awesome-icon icon="fa-solid fa-map-location" />&nbsp;&nbsp;{{
              order.get_address_to
            }}
          </td>
          <td>
            <font-awesome-icon icon="fa-solid fa-calendar" />&nbsp;&nbsp;
            {{ getFormattedDateComponent(order.date_time_ordered) }}
            {{ getFormattedTimeComponent(order.date_time_ordered) }}
          </td>
          <td>{{ getOrderStatusText(order.order_status) }}</td>
          <td v-if="order.driver">
            <font-awesome-icon icon="fa-solid fa-user" />&nbsp;&nbsp;{{
              order.get_driver_info
            }}
          </td>
          <td v-else></td>
        </tr>
      </tbody>
    </table>
    <nav>
      <ul class="pagination pagination-md">
        <li class="page-item" :class="{ disabled: !ordersList.previous }">
          <button
            class="page-link"
            @click="updatePaginator(ordersList.previous)"
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        <li class="mx-2"></li>
        <li class="page-item" :class="{ disabled: !ordersList.next }">
          <button class="page-link" @click="updatePaginator(ordersList.next)">
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { ordersAPI } from "@/api/ordersAPI"
import { getFormattedDate, getFormattedTime } from "@/utils"
import { GChart } from "vue-google-charts"
import Select2 from "vue3-select2-component"
import axios from "axios"
import debounce from "lodash.debounce"

export default {
  name: "OrdersList",
  components: { GChart, Select2 },
  data() {
    return {
      VUE_APP_BACKEND_PROTOCOL: process.env.VUE_APP_BACKEND_PROTOCOL,
      VUE_APP_BACKEND_HOST: process.env.VUE_APP_BACKEND_HOST,
      VUE_APP_BACKEND_PORT: process.env.VUE_APP_BACKEND_PORT,
      ordersList: [],
      currentOrderForUpdate: {
        date_time_ordered: "",
        address_from: null,
        address_to: null,
        order_status: "",
        driver: null,
      },
      orderSearchForm: {
        order_status: "",
        driver: "",
      },
      isLoading: true,
      isError: false,

      chartData1: [],
      chartData2: [],
      options1: {
        curveType: "function",
        legend: { position: "bottom" },
      },
      options2: {
        curveType: "function",
        legend: { position: "bottom" },
      },
    }
  },
  async created() {
    await this.loadData()
    await this.loadChartData()
  },
  methods: {
    async loadData() {
      this.isLoading = true
      try {
        const ordersResponse = await ordersAPI.getItemsList(
          this.userToken,
          this.orderSearchForm
        )
        this.ordersList = await ordersResponse.data
      } catch (error) {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },
    async loadChartData() {
      try {
        const chartDataResponse1 = await axios.get(
          `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/chart-data-timing/`
        )
        this.chartData1 = await chartDataResponse1.data.chart_data_timing
        this.chartData2 = await chartDataResponse1.data.chart_data_districts
      } catch (error) {
        this.isError = true
      } finally {
      }
    },
    async showModalForUpdate(orderID) {
      this.isError = false
      try {
        const response = await ordersAPI.getItemData(this.userToken, orderID)
        this.currentOrderForUpdate = await response.data
        let updateModal = this.$refs.orderUpdate
        let myModal = new bootstrap.Modal(updateModal, {
          keyboard: false,
        })
        myModal.show()
      } catch (event) {
        this.isError = true
      } finally {
      }
    },
    async updateOrder() {
      try {
        await ordersAPI.updateItem(this.userToken, this.currentOrderForUpdate)
        await this.loadData()
        this.$refs.closeOrderUpdateModal.click()
      } catch (error) {
        this.isError = true
      } finally {
      }
    },
    debouncedSearch: debounce(async function () {
      await this.loadData()
    }, 500),
    async updatePaginator(url) {
      this.isLoading = true
      try {
        const response = await ordersAPI.updateList(url, this.userToken)
        this.ordersList = await response.data
      } catch (error) {
        this.isError = true
      } finally {
        this.isLoading = false
        this.currentOrderForUpdate = {
          date_time_ordered: "",
          address_from: null,
          address_to: null,
          is_staff: false,
          order_status: "",
          driver: null,
        }
      }
    },
    getFormattedDateComponent(dateTime) {
      return getFormattedDate(dateTime)
    },
    getFormattedTimeComponent(dateTime) {
      return getFormattedTime(dateTime)
    },
    getOrderStatusText(status) {
      let statusText
      switch (status) {
        case 0:
          statusText = "Создан"
          break
        case 1:
          statusText = "Принят к исполнению"
          break
        case 2:
          statusText = "Выполнен"
          break
        default:
          statusText = ""
      }
      return statusText
    },
    clearSearchForm() {
      this.orderSearchForm = { order_status: "", driver: "" }
    },
  },
  computed: {
    ...mapGetters({
      userData: "auth/getUser",
      userToken: "auth/getToken",
    }),
    sortedOrdersList() {
      return this.ordersList.results
    },
  },
  watch: {
    orderSearchForm: {
      handler(newValue, oldValue) {
        this.debouncedSearch()
      },
      deep: true,
    },
  },
}
</script>

<style scoped></style>
