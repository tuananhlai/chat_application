<template>
  <div>
    <button title="Find messages" @click="showDialog = true" id="dialog-trigger">
      <i class="fas fa-search"></i>
      Find
    </button>
    <base-dialog :active.sync="showDialog">
      <h1>Find Messages in #{{ currentChannel.name }}</h1>
      <form @submit.prevent="onFindMessage">
        <input
          type="text"
          :placeholder="'Find Messages in #' + currentChannel.name"
          v-model="searchQuery"
          class="primary-input"
        />
        <button title="Find messages" type="submit" id="find-message">
          <i class="fas fa-search"></i>
        </button>
      </form>
      <div v-if="results" id="result-panel">
        <template v-if="results.length === 0">No results found.</template>
        <template v-else>
          <message-item v-for="message in results" :key="message.id" :message="message" />
        </template>
      </div>
    </base-dialog>
  </div>
</template>

<script>
import BaseDialog from "../global/BaseDialog";
import { findMessage } from "../../lib/message";
import { mapState } from "vuex";
import MessageItem from "./MessageItem";
export default {
  name: "FindMessagesDialog",
  components: { BaseDialog, MessageItem },
  data() {
    return {
      showDialog: false,
      searchQuery: "",
      results: null
    };
  },
  methods: {
    onFindMessage() {
      findMessage(this.token, this.searchQuery, this.currentChannel.id)
        .then((res) => {
          this.results = res.data.data;
        })
        .catch(console.error);
    }
  },
  computed: mapState(["currentChannel", "token"])
};
</script>

<style scoped>
button#dialog-trigger {
  margin: 10px;
  width: 50px;
  height: 50px;
  background-color: rgba(30, 30, 30, 0.05);
  border-radius: 50%;
  font-size: 12px;
}

button#dialog-trigger:hover {
  background-color: rgba(30, 30, 30, 0.13);
  cursor: pointer;
}

button#find-message {
  height: 100%;
}

#result-panel {
  overflow-y: scroll;
}

form {
  display: flex;
  flex-direction: row;
  align-items: center;
}
form input {
  border-radius: 4px 0 0 4px;
}

button#find-message {
  height: 37px;
  width: 50px;
  border-radius: 0 4px 4px 0;
}
</style>