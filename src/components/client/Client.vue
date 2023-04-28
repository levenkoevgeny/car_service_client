<template>
  <div class="container-fluid">
    <!--    <div class="mt-5"></div>-->

    <!--    <div class="row">-->
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
    <!--    </div>-->
  </div>
</template>

<script>
import Spinner from "@/components/common/Spinner"
import { mapGetters } from "vuex"
import ReconnectingWebSocket from "reconnecting-websocket"
import { useToast } from "vue-toastification"

export default {
  setup() {
    const toast = useToast()
    return { toast }
  },
  name: "Client",
  components: { Spinner },
  data() {
    return {
      docsList: [],
      isLoading: true,
      isError: false,
      rws: null,
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
    sendSuccessToast(message) {
      this.toast.success(message, {
        timeout: 5000,
        closeOnClick: true,
      })
    },
  },
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
