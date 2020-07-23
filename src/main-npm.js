import Vue from "vue";

import { Plugin } from "vue-fragment";
Vue.use(Plugin);

import VueFormTerminator from "./VueFormTerminator.vue";

export default {
  install(Vue) {
    Vue.component("vue-form-terminator", VueFormTerminator);
  },
};
