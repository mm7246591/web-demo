import { createApp } from "vue";
import App from "./App.vue";
import { setupRouter, router } from "./router";
import { setupRouterGuard } from "@/router/guard/index";
import { setupStore } from "@/stores";
import "vant/lib/index.css";
import "@/assets/css/style.css";
import "@/assets/css/normalize.css";
import "@/assets/css/tailwind.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass,faBars } from '@fortawesome/free-solid-svg-icons'
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import "echarts";
import ECharts from 'vue-echarts'

library.add(faMagnifyingGlass,faBars)
library.add(faStar as any)

const bootstarap = async () => {
  const app = createApp(App);
  setupRouter(app);
  setupRouterGuard(router);
  setupStore(app);
  app.component("font-awesome-icon", FontAwesomeIcon)
  app.component('v-chart',ECharts)
  app.mount("#app");
};

bootstarap();