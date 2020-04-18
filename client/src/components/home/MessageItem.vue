<template>
  <div id="message">
    <div id="message-header">
      <span class="font-bold">{{ message.sender.name }}</span>
      <span class="text-gray text-sm">{{ message.created_at }}</span>
    </div>
    <p id="message-text" @click="$emit('showReply')">{{ message.text }}</p>
  </div>
</template>

<script>
export default {
  name: "MessageItem",
  props: {
    message: {
      type: Object,
      required: true
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

.font-bold {
  font-weight: bold;
}

.text-gray {
  color: gray;
}

.text-sm {
  font-size: 0.8em;
}


</style>
