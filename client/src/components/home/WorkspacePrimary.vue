<template>
  <div id="workspace-primary">
    <div id="top-nav">
      <div id="top-nav-text">
        <h1>#{{ currentChannel.name }}</h1>
        <p>
          <i class="fas fa-user-alt" />
          {{ numberOfMembers }} |
          {{ currentChannel.description }}
        </p>
      </div>
      <button @click="$emit('toggleChannelDetails')" title="Details">
        <i class="fas fa-info-circle"></i>
      </button>
    </div>
    <div id="messages">
      <p v-if="messages && messages.length === 0">No messages in this channel.</p>
      <div v-for="(mesList, date) in groupedDay"
      :key="date">
        <div>
          <div class="upper-border"></div>
          <div class="message-date">{{date}}</div>
          <message-item
            v-for="(message, index) in mesList"
            :key="message.id"
            :message="message"
            @showReply="$emit('showReply', { message, index })"
          />    
        </div>  
      </div>
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
        <upload-file-dialog
        title="upload file" 
        id="attach-button"
          :attachment="attachment"
          @selected="onSelectedAttachment"
          @deselected="attachment = null"
        />
        <button @click="onSendMessage"
          title="Send message."
          type="submit"
          id="send-button"
          :disabled="!newMessage && !attachment"
        >
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>

     <editor
       v-model="newMessage"
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
       id="editor-1"
     />
    </div>
  </div>
</template>

<script>
import MessageItem from "./MessageItem";
import UploadFileDialog from "./UploadFileDialog";
import { mapGetters, mapState } from "vuex";
import { event } from "../../../../config/constants";
import { uploadAttachment } from "../../lib/message";
import _ from "lodash";
import moment from "moment";
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
  name: "WorkspacePrimary",
  components: {
    MessageItem,
    UploadFileDialog,
    VEmojiPicker,
    'editor': Editor
  },
  props: {},
  data() {
    return {
      newMessage: "",
      attachment: null,
      showEmojiBox: false,

    };
  },
  methods: {
    async onSendMessage() {
      let res = await uploadAttachment(this.attachment);
      let msgAttachment = null;
      if (res && res.status === 200) msgAttachment = res.data.data;

      this.$socket.emit(event.MESSAGE, {
        text: turndownService.turndown(this.newMessage),
        room: this.currentChannel,
        sender: this.$store.state.user,
        attachment: msgAttachment
      });
      this.newMessage = "";
      this.attachment = null;
    },
    onSelectedAttachment(attachment) {
      this.attachment = attachment;
    },
    onSelectEmoji(emoji) {
      tinymce.get("editor-1").execCommand('mceInsertContent', false, emoji.data);
      console.log(emoji.data);
      this.showEmojiBox=false;
    },
    toggleEmojiBox() {
      this.showEmojiBox =! this.showEmojiBox;
    }
  }, 
  computed: {
    ...mapState({
      currentChannel: "currentChannel",
      channelMessages: "messages"
    }),
    ...mapGetters({
      messages: "getCurrentChannelMessages",
      getCurrentChannelMembers: "getCurrentChannelMembers"
    }),
    numberOfMembers() {
      if (this.getCurrentChannelMembers)
        return this.getCurrentChannelMembers.length;
      return 0;
    },
    groupedDay() {
      return _.groupBy(this.messages, function(message) {
        return moment(message.created_at).format("ddd, MMMM Do YYYY");
      });
    }
  },
  watch: {
    messages: function() {
      let messageList = this.$el.querySelector("#messages");
      this.$nextTick(function() {
        messageList.scrollTop = messageList.scrollHeight;
      });
    }
  },
  sockets: {
    chatMessage: function(message) {
      if (this.channelMessages[message.room.id])
        this.$store.commit("addMessage", message);
    }
  }
};
</script>

<style scoped>
#workspace-primary {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

#top-nav {
  border-bottom: 1px solid rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
  border-right: 1px solid rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
  padding: 15px;
  min-height: 70px;
  background-color: rgb(253, 253, 253);
  display: flex;
  flex-direction: row;
}

#top-nav h1 {
  font-size: 1em;
  margin: 0;
}

#top-nav p {
  margin: 0;
  font-size: 0.9em;
  color: rgba(29, 28, 29, 0.7);
}

#top-nav > button {
  width: 30px;
  height: 30px;
  margin-left: auto;
  background-color: transparent;
  font-size: 15px;
}

#top-nav > button:hover {
  background-color: rgba(30, 30, 30, 0.13);
  cursor: pointer;
}

#top-nav-text {
  line-height: 1.4em;
}

#top-nav-text .fa-user-alt {
  font-size: 0.9em;
}

#messages {
  overflow-y: scroll;
  height: 100%;
}

.upper-border {
  position: relative;
  border-top: 2px solid #EBEBEB;
  top: 10px;
}

.message-date {
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-weight: bold;
  font-size: 0.9em;
  position: sticky;
  height: 25px;
  width: 160px;
  margin: 0 auto;
  border: thin solid gray;
  border-radius: 8px;
  background-color: #fff;
  top:5px;
  /* margin-bottom: -13px; */
}

#tricky-part {
  display: flex;
  flex-direction: row;
  position: relative;
  z-index: 800;
  bottom: -88px;
  left: 86%;
}

.emoji-box {
  position: absolute;
  z-index: 900;
  left: 63%;
  top:35%;
}

#emoji-trigger {
  width: 35px;
  height: 35px;
  background-color: transparent;
  color: #333333;
  cursor: pointer;

}

#emoji-trigger:hover {
  background-color: #EBEBEB;
}

#attach-button {
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
  background-color: transparent;
}

#attach-button:hover{
  background-color: #EBEBEB;
}

#send-button {
  cursor: pointer;
  background-color: #007A5A;
  color: white;
  width: 35px;
  height: 35px;
}

#send-button:disabled {
  background-color: transparent;
  color: gray;
}

#editor-container {
  width: 98%;
  margin: 0 auto;
  margin-bottom: 5px;
  margin-top: -20px;
}
</style>
