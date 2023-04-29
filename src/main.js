import { createApp } from "vue"
import App from "./App.vue"
import router from "@/router/router"
import store from "@/store"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import VueGoogleCharts from "vue-google-charts"
import Select2 from "vue3-select2-component"

import { faUsers } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faFile } from "@fortawesome/free-solid-svg-icons"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faFileExport } from "@fortawesome/free-solid-svg-icons"
import { faBook } from "@fortawesome/free-solid-svg-icons"
import { faList } from "@fortawesome/free-solid-svg-icons"
import { faMapLocation } from "@fortawesome/free-solid-svg-icons"
import { faCalendar } from "@fortawesome/free-solid-svg-icons"
import { faUnlock } from "@fortawesome/free-solid-svg-icons"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import { faCar } from "@fortawesome/free-solid-svg-icons"

library.add(faUsers)
library.add(faUser)
library.add(faFile)
library.add(faPlus)
library.add(faFileExport)
library.add(faBook)
library.add(faList)
library.add(faMapLocation)
library.add(faCalendar)
library.add(faUnlock)
library.add(faLock)
library.add(faCar)

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("Select2", Select2)
  .use(router)
  .use(store)
  .use(Toast)
  .use(VueGoogleCharts)
  .mount("#app")
