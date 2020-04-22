<template>
  <div id="join-channel-trigger" @click.stop>
    <button id="join-channel-btn" @click="show = true">
      <i class="fas fa-plus" />
    </button>
    <BaseDialog :active.sync="show">
      <div id="join-channel-dialog">
        <h1>Base Dialog</h1>
        <form @submit.prevent>
          <label>
            Name
            <input v-model="newChannelName" type="text">
          </label>
          <label>
            Description
            <textarea v-model="newChannelDescription" />
          </label>
          <button type="submit" :disabled="!newChannelName">Submit</button>
        </form>
        <button @click="show = !show">Close</button>
      </div>
    </BaseDialog>
  </div>
</template>

<script>
import BaseDialog from "../global/BaseDialog";
export default {
  name: "SideBarJoinChannelDialog",
  components: { BaseDialog },
  props: {

  },
  data() {
    return {
      show: false,
      newChannelName: "",
      newChannelDescription: ""
    };
  },
  methods: {
    onCreateChannel() {

    }
  }
};
</script>

<style scoped>
div#join-channel-trigger {
  display: inline-block;
  float: right;
  color: black;
}
button#join-channel-btn {
  color: white;
  background-color: transparent;
}

button#join-channel-btn:hover {
  background-color: rgba(30, 30, 30, 0.13);
  cursor: pointer;
}

#join-channel-btn {
  display: flex;
  flex-direction: column;
  color: black;
}

  #join-channel-dialog > form {
    display: flex;
    flex-direction: column;
  }
</style>
