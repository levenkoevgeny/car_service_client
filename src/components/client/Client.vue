<template>
  <section class="top-nav">
    <input id="menu-toggle" type="checkbox" ref="burger_button" />
    <label class="menu-button-container" for="menu-toggle">
      <div class="menu-button"></div>
    </label>
    <ul class="menu">
      <li @click="changeRoute('personal-data')">
        <div>
          <img
            src="https://wroom.ru/i/cars2/bmw_5_7.jpg"
            class="card-img-top rounded-circle"
            alt="..."
            style="height: 30px; width: 30px"
          />
          {{ userData.username }}
        </div>
      </li>
      <li>Способ оплаты</li>
      <li>Бизнес аккаунт</li>
      <li>Стать водителем</li>
      <li>Семейный аккаунт</li>
      <li @click="logOut">Выход из системы</li>
    </ul>
    <div><a href="/" style="text-decoration: none; color: white">Logo</a></div>
  </section>
  <router-view></router-view>
</template>

<script>
import Spinner from "@/components/common/Spinner"
import { mapGetters } from "vuex"
import ReconnectingWebSocket from "reconnecting-websocket"
import { useToast } from "vue-toastification"
import Select2 from "vue3-select2-component"
import { ordersAPI } from "@/api/ordersAPI"

export default {
  name: "Client",
  setup() {
    const toast = useToast()
    return { toast }
  },
  components: { Spinner, Select2 },
  data() {
    return {}
  },
  async created() {},
  methods: {
    changeRoute(routeName) {
      this.$router.push({ name: routeName })
      this.$refs.burger_button.click()
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
}
</script>

<style scoped>
html,
body {
  margin: 0;
  height: 100%;
}

* {
  box-sizing: border-box;
}

.top-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #00baf0;
  background: linear-gradient(to left, #f46b45, #eea849);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: #fff;
  height: 50px;
  padding: 1em;
}

.menu {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0;
  padding: 0;
  z-index: 9999;
}

.menu > li {
  margin: 0 1rem;
  overflow: hidden;
  cursor: pointer;
}

li:hover {
  transform: scale(1.1);
}

.menu-button-container {
  display: none;
  height: 100%;
  width: 30px;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#menu-toggle {
  display: none;
}

.menu-button,
.menu-button::before,
.menu-button::after {
  display: block;
  background-color: #fff;
  position: absolute;
  height: 4px;
  width: 30px;
  transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
  border-radius: 2px;
}

.menu-button::before {
  content: "";
  margin-top: -8px;
}

.menu-button::after {
  content: "";
  margin-top: 8px;
}

#menu-toggle:checked + .menu-button-container .menu-button::before {
  margin-top: 0px;
  transform: rotate(405deg);
}

#menu-toggle:checked + .menu-button-container .menu-button {
  background: rgba(255, 255, 255, 0);
}

#menu-toggle:checked + .menu-button-container .menu-button::after {
  margin-top: 0px;
  transform: rotate(-405deg);
}

@media (max-width: 5000px) {
  .menu-button-container {
    display: flex;
  }
  .menu {
    position: absolute;
    top: 0;
    margin-top: 50px;
    left: 0;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  #menu-toggle ~ .menu li {
    height: 0;
    margin: 0;
    padding: 0;
    border: 0;
    transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  #menu-toggle:checked ~ .menu li {
    height: 2.5em;
    padding: 0.5em;
    transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  .menu > li {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0.5em 0;
    width: 100%;
    color: #3d3131;
    background-color: #ffffff;
  }
  .menu > li:not(:last-child) {
    border-bottom: 1px solid #444;
  }
}
</style>
