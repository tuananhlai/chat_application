import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login";
import Register from "../views/Register";
import store from "../store/index";
import Workspace from "../components/home/Workspace";
import WorkspaceUserChat from "../components/home/WorkspaceUserChat";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    beforeEnter(to, from, next) {
      if (store.state.token || localStorage.token) {
        return next({ name: "Home" });
      }
      return next({ name: "Login" });
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    children: [
      {
        path: "",
        beforeEnter(to, from, next) {
          /** Navigate to the first channel */
          if (store.state.channels && store.state.channels[0]) {
            return next({
              name: "ChannelChat",
              params: {
                channelId: store.state.channels[0].id
              }
            });
          }
          return next();
        }
      },
      {
        name: "ChannelChat",
        path: "channel/:channelId",
        component: Workspace
      },
      {
        name: "UserChat",
        path: "user-chat",
        component: WorkspaceUserChat
      }
    ],
    beforeEnter(to, from, next) {
      const token = store.state.token;
      if (!token) {
        if (localStorage.token) {
          store.commit("setToken", localStorage.token);
          return next();
        }
        return next({ name: "Login" });
      }
      next();
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
