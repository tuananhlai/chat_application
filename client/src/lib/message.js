const axios = require("axios");
const { baseURL, messageAPI } = require("./api");

function uploadAttachment(file) {
  if (!file) return;

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

module.exports = {
  uploadAttachment
};
