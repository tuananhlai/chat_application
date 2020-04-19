<template>
  <div id="message">
    <div id="message-header">
      <span class="message-header-sender">{{ message.sender.name }}</span>
      <span class="message-header-time">{{ formatTimestamp(message.created_at) }}</span>
    </div>
    <p id="message-text" @click="$emit('showReply')">{{ message.text }}</p>
  </div>
</template>

<script>
  import moment from "moment";
export default {
  name: "MessageItem",
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
  }
};
</script>

<style scoped>
#message {
  display: flex;
  flex-direction: column;
  background-color: white;
}

#message-header {
  margin-bottom: 5px;
}

#message-text {
  margin-top: 0;
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


</style>
