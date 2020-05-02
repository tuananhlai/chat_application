<template>
  <div @click.stop>
    <button id="upload-file-trigger" type="button" @click="show = true">
      <i class="fas fa-paperclip"></i>
    </button>
    <base-dialog :active.sync="show">
      <h1>Upload File</h1>
      <form @submit.prevent>
        <input type="file" accept="image/*" />
        <button type="submit">Upload</button>
      </form>
    </base-dialog>
  </div>
</template>

<script>
import BaseDialog from "../global/BaseDialog";

export default {
  components: {BaseDialog},
  data() {
    return {
      show: false
    };
  }
};
</script>

<style>
button#upload-file-trigger {
  width: 30px;
  height: 100%;
}
</style>