import Vue from "vue";
import App from "@t/App.vue";
import router from "@t/router/index.js";

Vue.config.productionTip = false;

import { Plugin } from "vue-fragment";
Vue.use(Plugin);

import VueFormTerminator from "@/VueFormTerminator.vue";
Vue.component("vue-form-terminator", VueFormTerminator);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
