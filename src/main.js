import Vue from "vue";
import App from "@t/App.vue";
import router from "@t/router/index.js";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
