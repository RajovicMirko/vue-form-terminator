import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NoStyle from "../views/NoStyle.vue";
import Bootstrap from "../views/Bootstrap.vue";
import SemanticUI from "../views/SemanticUI.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/nostyle",
    name: "NoStyle",
    component: NoStyle,
  },
  {
    path: "/bootstrap",
    name: "Bootstrap",
    component: Bootstrap,
  },
  {
    path: "/semanticui",
    name: "SemanticUI",
    component: SemanticUI,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
