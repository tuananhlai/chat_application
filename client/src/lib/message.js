const axios = require("axios");
const { baseURL, messageAPI } = require("./api");

function uploadAttachment(file) {
  if (!file) return null;

  let formData = new FormData();
  formData.append("uploaded_file", file);

  return axios({
    url: baseURL + messageAPI.uploadAttachment,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data: formData
  });
}

function findMessage(token, keyword, channel_id) {
  return axios({
    url: baseURL + messageAPI.findMessage,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      keyword,
      channel_id
    }
  });
}

module.exports = {
  uploadAttachment,
  findMessage
};
