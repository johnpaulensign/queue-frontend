import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/admin",
    name: "admin",
    component: () => import("./components/Admin"),
  },
  {
    path: "/admin/customers",
    name: "customers",
    component: () => import("./components/CustomersList"),
  },
  {
    path: "/admin/control",
    name: "control",
    component: () => import("./components/Control"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("./components/Dashboard"),
  },
  {
    path: "/admin/customers/:id",
    name: "tutorial-details",
    component: () => import("./components/Customer"),
  },
  {
    path: "/",
    alias: "/signup",
    name: "signup",
    component: () => import("./components/SignupCustomer"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
