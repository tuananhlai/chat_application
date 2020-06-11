<template>
  <div>
    <button title="Find messages" @click="showDialog = true" id="dialog-trigger">
      <i class="fas fa-search"></i>
      Find
    </button>
    <base-dialog :active.sync="showDialog" id = "find-dialoge">
      <form 
      class="input-area"
      @submit.prevent="onFindMessage">
        <i class="fas fa-search"></i>
        <input
          type="text"
          :placeholder="'Find messages in # ' + currentChannel.name"
          v-model="searchQuery"
        />
        <i
        @click="showDialog = false"
        class="fas fa-times"></i>
      </form>
      <div v-if="results" id="result-panel">
        <template v-if="results.length === 0">No results found.</template>
        <template v-else>
          <message-item
            v-for="message in results"
            :key="message.id"
            :message="message"
          />
        </template>
      </div>
    </base-dialog>
  </div>
</template>

<script>
import BaseDialog from "../global/BaseDialog";
import MessageItem from "./MessageItem";
import { findMessage } from "../../lib/message";
import { mapState } from "vuex";
export default {
  name: "FindMessagesDialog",
  components: { BaseDialog, MessageItem },
  data() {
    return {
      showDialog: false,
      searchQuery: "",
      results: null,
    };
  },
  methods: {
    onFindMessage() {
      findMessage(this.token, this.searchQuery, this.currentChannel.id)
        .then(res => {
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

/* button#find-message {
  height: 100%;
} */

#find-dialoge {
  z-index: 999;
}

#result-panel {
  overflow-y: scroll;
}

.fa-times {
  cursor: pointer;
}

.input-area {
  border-bottom: 0.1px solid gray;
}

input {
  height: 30px;
  width: 93%;
  margin-left: 10px;
  border: 0;
}
input:focus {
  outline: none;
}
</style>