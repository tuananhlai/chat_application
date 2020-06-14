<template>
  <div id="update-view">
    <div id="update-form">
      <form @submit.prevent="onUpdateInfo">
        <h1>Update Password</h1>
        <input type="password" v-model="currentPassword" placeholder="Current Password" required />
        <input type="password" v-model="newPassword" placeholder="New Password" required />
        <input type="password" v-model="confirmNewPassword" placeholder="Retype Password" required />
        <button type="submit">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserAPI from "../lib/user";
import { regExp } from "../../../config/constants";
export default {
  name: "Update",
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    };
  },
  methods: {
    onUpdateInfo() {
      if (!regExp.VALID_PASSWORD.test(this.newPassword)) {
        return alert("Password must contain at least 8 character");
      }
      if (this.newPassword !== this.confirmNewPassword)
        return alert("New passwords don't match.");
      UserAPI.updatePassword(this.token, {
        currentPassword: this.currentPassword,
        newPassword: this.newPassword
      })
        .then(() => {
          alert("Update Success");
        })
        .catch((err) => {
          alert(err.message);
        });
      this.resetInput();
    },
    resetInput() {
      this.currentPassword = "";
      this.newPassword = "";
      this.confirmNewPassword = "";
    }
  },
  computed: mapState(["token"])
};
</script>

<style scoped>
#update-view {
  background-color: whitesmoke;
  height: 100%;
}

#update-form {
  padding: 30px 25px;
  display: flex;
  flex-direction: row;
  /*border: 1px solid rgba(0, 0, 0, 0.2);*/
  width: fit-content;
  margin: auto;
  position: relative;
  top: 10em;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.2);
}

button {
  background-color: #35529c;
  color: white;
  border: none;
  padding: 8px 15px;
  margin-top: 10px;
  border-radius: 100px;
  font-size: 1em;
  width: 50%;
  cursor: pointer;
}

button:hover {
  background-color: #3a4561;
}

button:disabled {
  background-color: lightgrey;
}

input[type="text"],
[type="password"],
[type="email"] {
  width: 300px;
  margin: 6px 0;
  padding: 10px;
  background-color: whitesmoke;
  border: none;
  border-radius: 100px;
  font-size: 14px;
  font-family: "Open Sans", sans-serif;
  outline: 0;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.03) inset;
}

h1 {
  font-size: 1.5em;
  margin-bottom: 10px;
}
form {
  justify-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>