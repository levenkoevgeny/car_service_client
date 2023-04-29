<template>
  <div class="container">
    <div
      v-if="isLoading"
      class="d-flex justify-content-center align-items-center"
      style="height: 100vh"
    >
      <Spinner />
    </div>
    <div v-else>
      <div class="mt-5"></div>
      <Select2
        v-model="newOrderForm.address_to"
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
        }"
        @select="mySelectEvent($event)"
      />
      <div v-if="orderPanelLoading" class="mt-3">
        <h5>Идет поиск свободной машины ...</h5>
      </div>
      <div class="row mt-3" :class="{ 'd-none': !orderPanelVisible }" v-else>
        <div class="col-4">
          <div class="border rounded p-1">
            <img src="" class="card-img-top" alt="..." />
            <h6 class="card-title my-0">Эконом</h6>
            <p class="card-text mt-0 mb-2">5 р.</p>
            <button
              type="button"
              class="btn btn-primary"
              @click="addOrder"
              style="width: 100%"
            >
              Заказать
            </button>
          </div>
        </div>
        <div class="col-4">
          <div class="border rounded p-1">
            <img src="" class="card-img-top" alt="..." />
            <h6 class="card-title my-0">Комфорт</h6>
            <p class="card-text mt-0 mb-2">6 р.</p>
            <button
              type="button"
              class="btn btn-primary"
              @click="addOrder"
              style="width: 100%"
            >
              Заказать
            </button>
          </div>
        </div>
        <div class="col-4">
          <div class="border rounded p-1">
            <img src="" class="card-img-top" alt="..." />
            <h6 class="card-title my-0">Комфорт +</h6>
            <p class="card-text mt-0 mb-2">7 р.</p>
            <button
              type="button"
              class="btn btn-primary"
              @click="addOrder"
              style="width: 100%"
            >
              Заказать
            </button>
          </div>
        </div>
      </div>

      <div class="row">
        <!--      <div class="col-3">-->
        <!--        <div class="d-flex flex-column border justify-content-center">-->
        <!--          <div-->
        <!--            class="header_card d-flex flex-column border justify-content-center p-2 text-center"-->
        <!--          >-->
        <!--            <img-->
        <!--              src="https://wroom.ru/i/cars2/bmw_5_7.jpg"-->
        <!--              class="card-img-top rounded-circle"-->
        <!--              alt="..."-->
        <!--              style="height: 200px; width: 200px"-->
        <!--            />-->
        <!--            <h5>Александр</h5>-->
        <!--            <p>Такси+</p>-->
        <!--            <div class="row">-->
        <!--              <div class="col-6">90 активность</div>-->
        <!--              <div class="col-6">5,0 рейтинг</div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--          <div class="body_card">-->
        <!--            <ul class="list-group">-->
        <!--              <li class="list-group-item border-0">Пробег 119 км</li>-->
        <!--              <li class="list-group-item border-0">Выполнено заказов 12</li>-->
        <!--              <li class="list-group-item border-0">Комиссия Яндекса 1500</li>-->
        <!--            </ul>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--      </div>-->
        <!--      <div class="col-9">-->
        <!--        <div id="map" style="width: 1000px; height: 600px"></div>-->
        <!--      </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/common/Spinner"
import { mapGetters } from "vuex"
import ReconnectingWebSocket from "reconnecting-websocket"
import { useToast } from "vue-toastification"
import Select2 from "vue3-select2-component"
import { ordersAPI } from "@/api/ordersAPI"
export default {
  name: "OrderView",
  setup() {
    const toast = useToast()
    return { toast }
  },
  components: { Spinner, Select2 },
  data() {
    return {
      VUE_APP_BACKEND_PROTOCOL: process.env.VUE_APP_BACKEND_PROTOCOL,
      VUE_APP_BACKEND_HOST: process.env.VUE_APP_BACKEND_HOST,
      VUE_APP_BACKEND_PORT: process.env.VUE_APP_BACKEND_PORT,
      newOrderForm: { address_from: "", address_to: "" },
      isLoading: true,
      isError: false,
      rws: null,
      orderPanelVisible: false,
      orderPanelLoading: false,
    }
  },
  async created() {
    try {
      this.rws = new ReconnectingWebSocket(
        `${process.env.VUE_APP_BACKEND_PROTOCOL_WS}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT_WS}/ws/driver/`
      )

      this.rws.addEventListener("open", () => {})

      this.rws.addEventListener("message", (e) => {
        const data = JSON.parse(e.data)
        this.sendSuccessToast(data["message"])
      })
    } catch (e) {
      this.isError = true
    } finally {
      this.isLoading = false
    }
  },
  async unmounted() {
    this.rws.close()
  },
  methods: {
    async addOrder() {
      this.isLoading = true
      var promise = new Promise(function (resolve, reject) {
        setTimeout(() => {
          // переведёт промис в состояние fulfilled с результатом "result"
          resolve("result")
        }, 4000)
      })
      promise.then(() => {
        this.isLoading = false
        this.orderPanelLoading = false
        this.orderPanelVisible = false
      })
    },
    sendSuccessToast(message) {
      this.toast.success(message, {
        timeout: 5000,
        closeOnClick: true,
      })
    },
    mySelectEvent({ id, text }) {
      this.orderPanelLoading = true
      var promise = new Promise(function (resolve, reject) {
        setTimeout(() => {
          // переведёт промис в состояние fulfilled с результатом "result"
          resolve("result")
        }, 4000)
      })
      promise.then(() => {
        this.orderPanelLoading = false
        this.orderPanelVisible = true
      })
    },
    logOut() {
      this.$store.dispatch("auth/actionRemoveLogIn")
      this.$router.push({ name: "login", replace: true })
    },
  },
  computed: {
    ...mapGetters({
      userData: "auth/getUser",
      userToken: "auth/getToken",
    }),
  },
  watch: {
    userData: {
      handler(newValue, oldValue) {
        console.log("jhjh")
      },
      deep: true,
    },
  },
}
</script>

<style scoped></style>
