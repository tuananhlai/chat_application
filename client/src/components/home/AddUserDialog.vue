<template>
  <div>
    <button title="Add Member To This Channel" @click="showDialog = true" id="dialog-trigger">
        <i class="fas fa-user-plus"></i>
        Add
    </button>
    <base-dialog :active.sync="showDialog">
      <div id = "header">
        <div class="header-title">Add user</div>
        <div class="header-channel-name"> #{{currentChannel.name}} </div>
        <i
          @click="showDialog = false"
          class="fas fa-times"></i>
      </div>
      <form 
      class="input-area">
        <input
          type="text"
          :placeholder="'Anna, abc@gmail.com,...'"
        />
        <button id="add-user" type = "submit">Add</button>
      </form>
      
    </base-dialog>
  </div>  
</template>

<script>
import BaseDialog from "../global/BaseDialog";
import { mapState } from "vuex";
export default {
    name: "AddUserDialog",
    components: { BaseDialog },
    data() {
        return {
            showDialog: false
        };
    },
    computed: mapState(["currentChannel", "token"])
}
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

.header-title {
  font-size: 20px;
  font-weight: bold;
}

.header-channel-name {
  font-size: 12px;
  color: gray;
  margin-bottom: 10px;
}

.fa-times {
  position: relative;
  float: right;
  top: -47px;
  cursor: pointer;
}

input {
  height: 30px;
  width: 91%;
  border: 0.1px solid gray;
  border-radius: 3px;
  padding-left: 5px ;
}

input:focus {
  outline-color: #6698c8;
}

button#add-user{
  margin-left: 10px ;
  height: 30px;
  width: 40px;
  border: 0.1px solid gray;
  border-radius: 3px;
}
</style>