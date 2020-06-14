<template>
  <div>
    <button id="dialog-trigger" @click="onOpenDialog">
      <i class="fas fa-plus" /> Create Channel
    </button>
    <base-dialog :active.sync="show">
      <div>
        <h1>Create Channel</h1>
        <form id="create-channel-form" @submit.prevent="onCreateChannel">
          <label>Name</label>
          <input
            v-model="newChannelName"
            class="primary-input"
            type="text"
            placeholder="Name"
            required
          />
          <label>Description</label>
          <textarea
            rows="5"
            v-model="newChannelDescription"
            class="primary-input"
            placeholder="Description"
          />
          <button
            id="create-channel-form__submit"
            :class="{'is-success': createChannelSuccess}"
          >Create Channel</button>
        </form>
      </div>
    </base-dialog>
  </div>
</template>

<script>
import BaseDialog from "../global/BaseDialog";
import ChannelAPI from "../../lib/channel";
import { regExp } from "../../../../config/constants";
import { mapState } from "vuex";
export default {
  name: "SideBarCreateChannelDialog",
  components: { BaseDialog },
  data() {
    return {
      show: false,
      newChannelName: "",
      newChannelDescription: ""
    };
  },
  methods: {
    onOpenDialog() {
      this.show = true;
    },
    onCreateChannel() {
      if (!regExp.VALID_CHANNEL_NAME.test(this.newChannelName)) {
        return alert("Invalid channel name. Don't ask why!");
      }
      ChannelAPI.createNewChannel(this.token, {
        name: this.newChannelName,
        description: this.newChannelDescription
      })
        .then(() => alert("Create Channel Success"))
        .catch((err) => alert(err.message));
      this.newChannelName = "";
      this.newChannelDescription = "";
    }
  },
  computed: mapState(["token"])
};
</script>

<style scoped>
form#create-channel-form {
  display: flex;
  flex-direction: column;
}
button#dialog-trigger {
  all: unset;
  color: white;
  width: 100%;
  padding: 5px 15px;
}

button#dialog-trigger:hover {
  color: #82c4dc;
  cursor: pointer;
}

button#create-channel-form__submit {
  width: 20%;
  background-color: #82c4dc;
  height: 2em;
  border-radius: 2px;
  margin-top: 5px;
}

button#is-success {
  background-color: #38ca84;
}
input,
textarea {
  border-radius: 0;
  resize: none;
}

input,
label {
  display: block;
}
</style>
