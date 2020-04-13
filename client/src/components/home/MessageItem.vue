<template>
  <div id="message">
    <div>
      <span class="font-bold">{{ message.sender.name }}</span>
      <span class="text-gray text-sm">{{ message.created_at }}</span>
    </div>
    <p>{{ message.text }}</p>
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

.font-bold {
  font-weight: bold;
}

.text-gray {
  color: gray;
}

.text-sm {
  font-size: 0.8em;
}

  p {
    margin-top: 0;
  }
</style>