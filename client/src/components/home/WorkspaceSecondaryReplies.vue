<template>
  <workspace-secondary title="Thread" @close="$emit('close')">
    <div id="thread-view">
      <div v-if="threadMaster" id="messages">
        <message-item :message="threadMaster.message" />
        <message-item
          v-for="reply in threadMaster.message.replies"
          :key="reply.id"
          :message="reply"
          class="reply-message"
        />
      </div>

    <v-emoji-picker
      v-show="showEmojiBox"
      lableSearch="Search"
      @select="onSelectEmoji"
      class="emoji-box"
    />
    <div id = "editor-container">
      <div id="tricky-part">
        <button id = "emoji-trigger"
        title="emojicon"
        @mousedown.prevent="toggleEmojiBox">
        <i class="far fa-grin-alt"
        ></i>
        </button>

        <button @click="onSendReply"
          title="Send message."
          type="submit"
          id="send-button"
          :disabled="!newReplyMessage"
        >
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
     <editor
       v-model="newReplyMessage"
       api-key="h9yjx442il29okjmki7cc5wzfzuns936pv9xuzg5kge2261e"
       :init="{
         height: 90,
         menubar: false,
         toolbar: 'bold italic',
         toolbar_location: 'bottom',
         placeholder: 'Write message here',
         branding: false,
         statusbar: false  
       }"
     />
    </div>
    </div>
  </workspace-secondary>
</template>

<script>
import WorkspaceSecondary from "./WorkspaceSecondary";
import MessageItem from "./MessageItem";
import { mapState } from "vuex";
import VEmojiPicker from "v-emoji-picker";
import Editor from '@tinymce/tinymce-vue';

const TurndownService = require('turndown').default;
const turndownService = new TurndownService(); 
turndownService.addRule('italic', {
  filter: ['em'],
  replacement: function (content) {
    return '*' + content + '*';
  }
}) ;

export default {
  name: "WorkspaceSecondaryReplies",
  components: { WorkspaceSecondary, MessageItem, VEmojiPicker, 'editor': Editor },
  props: {
    // Tin nhan dau tien cua thread
    threadMaster: {
      type: Object
    },
    show: {
      type: Boolean
    }
  },
  data() {
    return {
      newReplyMessage: "",
      showEmojiBox: false,
    };
  },
  methods: {
    onSendReply() {
      console.log(this.threadMaster);
      this.$socket.emit("replyMessage", {
        text: turndownService.turndown(this.newReplyMessage),
        room: this.currentChannel,
        sender: this.$store.state.user,
        replyToMessageId: this.threadMaster.message.id
      });
      this.newReplyMessage = "";
    },
    onSelectEmoji(emoji) {
      tinymce.activeEditor.execCommand('mceInsertContent', false, emoji.data);
      console.log(emoji.data);
      this.showEmojiBox=false;
    },
    toggleEmojiBox() {
      this.showEmojiBox =! this.showEmojiBox;
    }
  },
  sockets: {
    replyMessage(reply) {
      console.log(reply);
      this.$store.commit("addMessageReplies", {
        newReply: reply,
        threadMasterIndex: this.threadMaster.index
      });
    }
  },
  computed: {
    ...mapState(["currentChannel"])
  },
  watch: {
    messages: function() {
      let messageList = this.$el.querySelector("#messages");
      this.$nextTick(function() {
        messageList.scrollTop = messageList.scrollHeight;
      });
    }
  },
};
</script>

<style scoped>
#thread-view {
  padding: 10px;
  width: 100%;
  height: 100%;
}

#messages {
  width: 100%;
}

.reply-message {
  padding-left: 15px;
}

.emoji-box {
  position: fixed;
  z-index: 999;
  /* left: 30px; */
  top: 150px;
  right: 30px;
}

#text-area {
  margin-top: -20px;
}

#tricky-part {
  display: flex;
  flex-direction: row;
  position: relative;
  z-index: 800;
  bottom: -87px;
  left: 70%;
}

#send-button {
  cursor: pointer;
  background-color: #007A5A;
  color: white;
  width: 35px;
  height: 35px;
}

#emoji-trigger {
  background-color: transparent;
  cursor: pointer;
  width: 33px;
  height: 33px;
  margin-right: 5px;
  color: #333333;
}

#emoji-trigger:hover {
  background-color: #EBEBEB;
}

#send-button:disabled {
  background-color: transparent;
  color: gray;
}
#editor-container {
  width: 98%;
  margin: 0 auto;
  margin-top: -20px;
}

</style>