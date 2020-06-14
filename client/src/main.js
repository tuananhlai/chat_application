import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./style.css";
import VueSocketIO from "vue-socket.io";
import io from "socket.io-client";
import "nprogress/nprogress.css";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);
dom.watch();

Vue.config.productionTip = false;

Vue.use(
  new VueSocketIO({
    connection: io(process.env.VUE_APP_SERVER_URL || "http://localhost:3000", {
      autoConnect: false
    }),
    debug: process.env.NODE_ENV !== "production",
    vuex: {
      store,
      actionPrefix: "SOCKET_"
    }
  })
);
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
