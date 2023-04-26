import { createApp } from "vue"
import App from "./App.vue"
import router from "@/router/router"
import store from "@/store"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

import { faUsers } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faFile } from "@fortawesome/free-solid-svg-icons"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faFileExport } from "@fortawesome/free-solid-svg-icons"
import { faBook } from "@fortawesome/free-solid-svg-icons"
import { faList } from "@fortawesome/free-solid-svg-icons"

library.add(faUsers)
library.add(faUser)
library.add(faFile)
library.add(faPlus)
library.add(faFileExport)
library.add(faBook)
library.add(faList)

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(store)
  .use(Toast)
  .mount("#app")