import Vue from "vue";
import TestBootstrap from "./TestBootstrap.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(TestBootstrap),
}).$mount("#app");
