import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index.js";
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/about",
    name: "About",

    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/signin",
    name: "Signin",

    component: () => import("../views/SignIn.vue"),
  },
  {
    path: "/signup",
    name: "Signup",

    component: () => import("../views/SignUp.vue"),
  },
  {
    path: "/update/:id",
    name: "Update",

    component: () => import("../views/restaurantUpdate.vue"),
  },
  {
    path: "/menu/:id",
    name: "Menu",

    component: () => import("../views/MenuView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.name == "Home") {
    store.commit("home", true);
  } else {
    store.commit("home", false);
  }
  if (to.name == undefined) {
    router.push("/");
  } else {
    document.title = to.name;
    next();
  }
});
export default router;
