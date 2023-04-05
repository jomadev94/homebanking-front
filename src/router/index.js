import Home from "../views/Home.vue";
import AccountDetails from "../views/AccountDetails.vue";
import Manager from "../views/Manager.vue";
import Cards from "../views/Cards.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Layout from "../components/Layout.vue";
import LayoutPublic from "../components/LayoutPublic.vue";
import Transfer from "../views/Transfer.vue";
import { createRouter, createWebHistory } from "vue-router";
import StorageService from "../services/StorageService";
import NotFound from "../views/NotFound.vue";
import Verify from "../views/Verify.vue";

const routes = [
  { path: "", redirect: "/login" },
  {
    component: LayoutPublic,
    children: [
      { path: "/login", name: "Login", component: Login },
      { path: "/register", name: "Register", component: Register },
      { path: "/:code/verify", name:"Verify", component: Verify},
      { path: "/:pathMatch(.*)*", name:"Not Found", component: NotFound }

    ],
  },
  {
    component: Layout,
    children: [
      { path: "/home", name: "Home", component: Home },
      {
        path: "/account/:id",
        name: "AccountDetails",
        component: AccountDetails,
      },
      { path: "/admin", name: "Manager", component: Manager },
      { path: "/cards", name: "Cards", component: Cards },
      { path: "/transfer", name: "Transfer", component: Transfer },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  const currentUser = StorageService.getCurrentClient();
  if (!currentUser && to.name !== "Login" && to.name !== "Register")
    return { name: "Login" };
  if (currentUser && (to.name === "Login" || to.name === "Register"))
    return { name: "Home" };
  document.title = to.name;
});

export default router;
