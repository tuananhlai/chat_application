<template>
  <div id="message" @click="$emit('showReply')">
    <div>
      <img :src="message.sender.avatar_url || avatarLink" alt="avatar" id="avatar" />
    </div>
    <div id="message-container">
      <div id="message-header">
        <span class="message-header-sender" @click.stop>
          {{
          message.sender.name
          }}
        </span>
        <span class="message-header-time">
          {{
          formatTimestamp(message.created_at)
          }}
        </span>
      </div>
      <p id="message-text">{{ message.text }}</p>
      <file-preview v-if="message.attachment" :file="message.attachment"></file-preview>
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
export default {
  name: "MessageItem",
  components: { FilePreview },
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatTimestamp(time) {
      return moment(time).format("hh:mm ddd, MMMM Do YYYY");
    }
  },
  computed: {
    avatarLink() {
      return `https://api.adorable.io/avatars/40/${this.message.sender.id}@adorable.png`;
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

#avatar {
  width: 40px;
  height: 40px;
}

#message-header {
  margin-bottom: 5px;
}

#message-container {
  margin-left: 10px;
}

#message-text {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 0.9em;
}

.message-header-sender {
  font-weight: bold;
  margin-right: 10px;
}

.message-header-time {
  color: gray;
  font-size: 0.8em;
}

#reply-btn {
  text-align: left;
  height: 1.8em;
  margin-right: 10px;
  border-radius: 5px;
  margin-top: 0.5em;
  width: 30%;
}

#attach-image {
  max-width: 500px;
  width: 100%;
}

/* #reply-btn:hover {
  background-color:rgba(0, 0, 0, 0.2)
} */
</style>
