import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/admin",
    name: "admin",
    component: () => import("./components/Admin"),
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
  {
    path: "/apm/dashboard",
    name: "apm-dashboard",
    component: () => import("./components/ApmDashboard"),
  },
  {
    path: "/apm/dashboard/:queue",
    name: "apm-details",
    component: () => import("./components/ApmDashboard"),
    // add props: true to pass queue as a prop
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
