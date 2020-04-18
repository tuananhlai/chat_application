const axios = require("axios");
const { baseURL, userAPI } = require("./api");
function getChannelList(token) {
  return axios({
    url: baseURL + userAPI.channelList,
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
}

function registerUser({name, email, password}) {
  return axios({
    url: baseURL + userAPI.registerUser,
    method: "POST",
    data: {
      name,
      email,
      password
    }
  });
}

module.exports = {
  getChannelList,
  registerUser
};
