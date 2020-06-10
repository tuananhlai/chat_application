const axios = require("axios");
const { baseURL, userAPI, personalChatAPI } = require("./api");
function getChannelList(token) {
  return axios({
    url: baseURL + userAPI.channelList,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

function registerUser({ name, email, password }) {
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

function getUnjoinedChannelList(token) {
  return axios({
    url: baseURL + userAPI.getUnjoinedChannels,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

function verifyToken(token) {
  return axios({
    url: baseURL + userAPI.verifyToken,
    method: "GET",
    params: {
      token: token
    }
  });
}

function getPersonalChat(token) {
  return axios({
    url: baseURL + personalChatAPI.getPersonalChats,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

function getPersonalChatMessages(token, partnerId) {
  return axios({
    url: baseURL + personalChatAPI.getPersonalChatMessage,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      partner_id: partnerId
    }
  });
}

module.exports = {
  getChannelList,
  registerUser,
  getUnjoinedChannelList,
  verifyToken,
  getPersonalChat,
  getPersonalChatMessages
};
