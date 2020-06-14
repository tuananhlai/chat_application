const axios = require("./axios");
const { baseURL, channelAPI } = require("./api");

function getMessagesInChannel(token, channel_id) {
  return axios.request({
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
  return axios.request({
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
  return axios.request({
    url: baseURL + channelAPI.getAllChannels,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

function createNewChannel(token, { name, description }) {
  return axios.request({
    url: baseURL + channelAPI.createNewChannel,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      name,
      description
    }
  });
}

module.exports = {
  getMessagesInChannel,
  getMembersInChannel,
  getAllChannels,
  createNewChannel
};
