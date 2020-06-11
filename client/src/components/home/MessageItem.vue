<template>
  <div id="message" @click="$emit('showReply')">
    <div>
      <avataaars
      id = "avatar"></avataaars>
    </div>
    <div id = "text">
      <div id="message-header">
        <span class="message-header-sender" @click.stop>{{
          message.sender.name
        }}</span>
        <span class="message-header-time">{{
          formatTimestamp(message.created_at)
        }}</span>
      </div>
      <vue-markdown :source="message.text" id="message-text"></vue-markdown>
      <file-preview
        v-if="message.attachment"
        :file="message.attachment"
        id = "attach-field"
      ></file-preview>
      <button id="reply-btn" v-if="message.replies && message.replies.length > 0">
        {{ message.replies.length }}
        {{ message.replies.length > 1 ? "Replies" : "Reply" }}
      </button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import FilePreview from "./FilePreview";
import Avataaars from "vuejs-avataaars";
import VueMarkdown from 'vue-markdown';
export default {
  name: "MessageItem",
  components: { FilePreview,Avataaars, VueMarkdown },
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatTimestamp(time) {
      return moment(time).format("hh:mm");
    }
  }
};
</script>

<style scoped>
#message {
  display: flex;
  flex-direction: row;
  background-color: white;
  line-height: 115%;
  padding: 10px;
}

#message:hover {
  background-color: rgba(30, 30, 30, 0.05);
  cursor: pointer;
}

#text {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
}

#avatar {
  height: 43px;
  width: 43px;
  background-color: #6FB8E0;
}

#message-header {
  position: relative;
  margin-bottom: 5px;
}

#message-text {
  margin-top: -11px;
  margin-bottom: 0;
  font-size: 0.9em;
}

#attach-field {
  margin-top: 12px;
}

.message-header-sender {
  font-weight: bold;
  margin-right: 10px;
}

.message-header-time {
  color: gray;
  font-size: 0.8em;
}

.message-header-day {
  position: absolute;
  height: 25px;
  width: 160px;
  border: 1px solid gray;
  border-radius: 8px;
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto; 
  top: -20px;
  background-color: white;
}

#reply-btn {
  text-align: left;
  height: 1.8em;
  margin-right: 10px;
  border-radius: 5px;
  margin-top: 0.5em;
  width: 150px;
}

#attach-image {
  max-width: 500px;
  width: 100%;
}

</style>
