<template>
  <div class="container">
    <h1>Список заказов</h1>

    <div class="charts">
      <div class="row">
        <div class="col-12">
          <h3 class="mt-3">Распределение заказов по времени (ночное время)</h3>
          <GChart type="LineChart" :data="chartData1" :options="options1" />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h3 class="mt-3">Распределение заказов по времени (дневное время)</h3>
          <GChart type="LineChart" :data="chartData1" :options="options1" />
        </div>
      </div>
      <!--      <div class="row">-->
      <!--        <div class="col-lg-6">-->
      <!--          <GChart type="ColumnChart" :data="chartData2" :options="options2" />-->
      <!--        </div>-->
      <!--        <div class="col-lg-6">-->
      <!--          <GChart type="LineChart" :data="chartData3" :options="options3" />-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
    <h2 class="mt-5">Последние заказы</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Адрес вызова машины</th>
          <th scope="col">Пункт назначения</th>
          <th scope="col">Дата и время заказа</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in sortedOrdersList" :key="order.id">
          <td></td>
          <td>{{ order.get_address_from }}</td>
          <td>{{ order.get_address_to }}</td>
          <td>
            {{ getFormattedDateComponent(order.date_time_ordered) }}
            {{ getFormattedTimeComponent(order.date_time_ordered) }}
          </td>
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
import debounce from "lodash.debounce"
import { ordersAPI } from "@/api/ordersAPI"
import { getFormattedDate, getFormattedTime } from "@/utils"
import { GChart } from "vue-google-charts"

export default {
  name: "OrdersList",
  components: { GChart },
  data() {
    return {
      ordersList: [],
      orderSearchForm: {},
      isLoading: true,
      isError: false,
      chartData1: [
        ["Year", "Sales"],
        ["22.00-23.00", 1000],
        ["08.00-09.00", 1000],
        ["08.00-09.00", 1000],
        ["08.00-09.00", 1000],
        ["08.00-09.00", 1000],
        ["08.00-09.00", 1000],
        ["08.00-09.00", 1000],
        ["08.00-09.00", 1000],
        ["08.00-09.00", 1000],
        ["08.00-09.00", 1000],
        ["08.00-09.00", 1000],
        ["08.00-09.00", 1000],
      ],
      chartData2: [
        ["Element", "Density", { role: "style" }],
        ["Copper", 8.94, "#b87333"],
        ["Silver", 10.49, "silver"],
        ["Gold", 19.3, "gold"],
      ],
      chartData3: [
        ["Year", "Sales", "Expenses"],
        ["2004", 1000, 400],
        ["2005", 1170, 460],
        ["2006", 660, 1120],
        ["2007", 1030, 540],
      ],
      chartData4: [
        ["Task", "Hours per Day"],
        ["Work", 11],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7],
      ],
      chartData5: [
        ["Year", "Sales", "Expenses"],
        ["2004", 1000, 400],
        ["2005", 1170, 460],
        ["2006", 660, 1120],
        ["2007", 1030, 540],
      ],
      options1: {
        // title: "Company Performance",
        curveType: "function",
        legend: { position: "bottom" },
      },
      options2: {
        title: "Company Performance",
        curveType: "function",
        legend: { position: "bottom" },
      },
      options3: {
        title: "Company Performance",
        curveType: "function",
        legend: { position: "bottom" },
      },
      options4: {
        title: "Company Performance",
        curveType: "function",
        legend: { position: "bottom" },
        pieHole: 0.4,
      },
      options5: {
        title: "Company Performance",
        curveType: "function",
        legend: { position: "bottom" },
      },
    }
  },
  async created() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      this.isLoading = true
      try {
        const ordersResponse = await ordersAPI.getItemsList(this.userToken)
        this.ordersList = await ordersResponse.data
      } catch (error) {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },
    async updatePaginator(url) {
      this.isLoading = true
      try {
        const response = await ordersAPI.updateList(url, this.userToken)
        this.ordersList = await response.data
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
    sortedOrdersList() {
      return this.ordersList.results
    },
  },
}
</script>

<style scoped></style>
