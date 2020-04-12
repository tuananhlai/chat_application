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

module.exports = {
  getChannelList
};
