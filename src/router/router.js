import { createRouter, createWebHistory } from "vue-router"

import NotFoundView from "@/components/common/NotFoundView"
import LoginView from "@/components/auth/LoginView"
import RegistrationView from "@/components/auth/RegistrationView"
import Client from "@/components/client/Client"
import AdminViewHome from "@/components/admin/AdminViewHome"
import UsersList from "@/components/admin/UsersList"
import OrdersList from "@/components/admin/OrdersList"
import PersonalDataView from "@/components/client/PersonalDataView"
import OrderView from "@/components/client/OrderView"

import store from "@/store"

const routes = [
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundView },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: "/registration",
    name: "registration",
    component: RegistrationView,
  },
  {
    path: "",
    name: "client",
    component: Client,
    meta: { requiresAuth: true },
    children: [
      { path: "", name: "oder", component: OrderView },
      { path: "personal", name: "personal-data", component: PersonalDataView },
    ],
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminViewHome,
    meta: { requiresAuth: true, requiresStaff: true },
    children: [
      {
        path: "",
        name: "admin-users",
        component: UsersList,
      },
      {
        path: "orders",
        name: "admin-orders",
        component: OrdersList,
      },
    ],
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
})

router.beforeEach(async (to, from) => {
  await store.dispatch("auth/actionCheckLoggedIn")
  const isLoggedIn = store.getters["auth/getIsLoggedIn"]

  if (to.meta.requiresAuth && !isLoggedIn) {
    return {
      path: "/login",
      query: { redirect: to.fullPath },
    }
  }

  const user = store.getters["auth/getUser"]
  if (user) {
    const isStaff = user.is_staff
    if (to.meta.requiresStaff && !isStaff) {
      return {
        path: "/login",
        query: { redirect: to.fullPath },
      }
    }
  }
})

export default router
