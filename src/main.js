import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";

Vue.config.productionTip = false;

import VueFormTerminator from "vue-form-terminator";
import "vue-form-terminator/dist/vue-form-terminator.common";
Vue.use(VueFormTerminator);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
