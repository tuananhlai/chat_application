<template>
  <div id="user-chat-dialog" @click.stop>
    <button id="user-chat-dialog__trigger" @click="show = true">
      <i class="fas fa-plus" />
    </button>
    <base-dialog :active.sync="show">
      <h1>Start Personal Chat</h1>
      <div>
        <div @click="onStartChat(user)" v-for="user in users" :key="user.id" class="user-item">
          <img :src="user.avatar_url" />
          <div class="user-item__info">
            <h3>{{user.name}}</h3>
            <span>{{user.email}}</span>
          </div>
        </div>
      </div>
    </base-dialog>
  </div>
</template>

<script>
import BaseDialog from "../global/BaseDialog";
import UserAPI from "../../lib/user";
import { mapState, mapGetters } from "vuex";

export default {
  name: "SideBarUserChatDialog",
  components: { BaseDialog },
  data() {
    return {
      show: false,
      users: null
    };
  },
  methods: {
    onStartChat(user) {
      if (!this.getUserChatById(user.id)) {
        this.$store.commit("addUserChat", { newUserChat: user });
      }
      this.$store.dispatch("changeAndSetupPersonalChat", user);
      this.show = false;
    },
    getAllUsers() {
      UserAPI.getAllUsers(this.token)
        .then(({ data }) => {
          this.users = data.data;
        })
        .catch((err) => {
          return alert(err.message);
        });
    },
    getUserChatById(id) {
      return this.userChats.find((chat) => chat.id === id);
    }
  },
  watch: {
    show(newValue) {
      /** Only fetch new data when the dialog goes from closed to opened */
      if (newValue === true) this.getAllUsers();
    }
  },
  computed: {
    ...mapState(["token", "userChats"])
  }
};
</script>

<style scoped>
div#user-chat-dialog {
  display: block;
  float: right;
  color: black;
}
button#user-chat-dialog__trigger {
  color: white;
  background-color: transparent;
}

div.user-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
}

div.user-item:hover {
  border: 1px solid rgba(30, 30, 30, 0.3);
}

div.user-item__info {
  margin-left: 0.5em;
}

div.user-item__info h3 {
  margin: 0;
}

div.user-item__info span {
  font-weight: normal;
  font-size: 0.9em;
}
</style>