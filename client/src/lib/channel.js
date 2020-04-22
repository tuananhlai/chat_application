const axios = require("axios");
const { baseURL, channelAPI } = require("./api");

function getMessagesInChannel(token, channel_id) {
  return axios({
    url: baseURL + channelAPI.getMessage,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      id: channel_id
    }
  });
}

function getMembersInChannel(token, channel_id) {
  return axios({
    url: baseURL + channelAPI.getMember,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      id: channel_id
    }
  });
}

function getAllChannels(token) {
  return axios({
    url: baseURL + channelAPI.getAllChannels,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

module.exports = {
  getMessagesInChannel,
  getMembersInChannel,
  getAllChannels
};
