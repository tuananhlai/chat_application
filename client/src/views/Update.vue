<template>
  <div>
    <form @submit.prevent="onUpdateInfo">
      <input type="password" v-model="currentPassword" placeholder="Current Password" required />
      <input type="password" v-model="newPassword" placeholder="New Password" required />
      <input type="password" v-model="confirmNewPassword" required />
      <button type="submit">Update</button>
    </form>
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

<style>
</style>