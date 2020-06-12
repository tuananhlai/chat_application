const NProgress = require("nprogress");
const axios = require("axios");

const instance = axios.create();

// before a request is made start the nprogress
instance.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});

// before a response is returned stop nprogress
instance.interceptors.response.use((response) => {
  NProgress.done();
  return response;
});

module.exports = instance;
