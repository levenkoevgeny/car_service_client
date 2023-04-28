import { createRouter, createWebHistory } from "vue-router"

import NotFoundView from "@/components/common/NotFoundView"
import LoginView from "@/components/auth/LoginView"
import Client from "@/components/client/Client"
import AdminViewHome from "@/components/admin/AdminViewHome"
import UsersList from "@/components/admin/usersList"
import OrdersList from "@/components/admin/OrdersList"

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
    path: "",
    name: "client",
    component: Client,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminViewHome,
    meta: { requiresAuth: true, requiresStaff: true },
    children: [
      {
        path: "users",
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
})

export default router
