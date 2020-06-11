import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./style.css";
import VueSocketIO from "vue-socket.io";
import io from "socket.io-client";
// Require Froala Editor js file.
require('froala-editor/js/froala_editor.pkgd.min.js');
// Require Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css');
require('froala-editor/css/froala_style.min.css');
// Import and use Vue Froala lib.;=
import VueFroala from 'vue-froala-wysiwyg'
Vue.use(VueFroala);

Vue.config.productionTip = false;

Vue.use(
  new VueSocketIO({
    connection: io(process.env.VUE_APP_SERVER_URL || "http://localhost:3000", {
      autoConnect: false
    }),
    debug: process.env.NODE_ENV !== "production"
  })
);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
