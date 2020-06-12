const axios = require("./axios");
const { baseURL, loginAPI } = require("./api");
function authorize(email, password) {
  return axios.request({
    url: baseURL + loginAPI.authorize,
    method: "POST",
    data: {
      email,
      password
    }
  });
}

module.exports = {
  authorize
};
