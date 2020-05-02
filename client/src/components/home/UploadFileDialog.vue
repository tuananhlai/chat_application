<template>
  <div @click.stop>
    <button id="upload-file-trigger" type="button" @click="handleButtonClick">
      <i :class="['fas', 'fa-paperclip', attachment ? 'file-selected' : '']"></i>
    </button>
    <base-dialog :active.sync="show">
      <h1>Upload File</h1>
      <form @submit.prevent="handleFileUpload">
        <input
          type="file"
          ref="file"
          accept="image/*"
          @change="handleFileChange"
          :name="fieldName"
        />
        <button type="submit" :disabled="!file">OK</button>
      </form>
    </base-dialog>
  </div>
</template>

<script>
import BaseDialog from "../global/BaseDialog";

export default {
  components: { BaseDialog },
  data() {
    return {
      show: false,
      fieldName: "upload_image",
      file: null,
      maxsize: 512 * 1024
    };
  },
  props: {
    attachment: {
      type: Object
    }
  },
  methods: {
    handleButtonClick() {
      if (!this.attachment) this.show = true;
      else {
        this.$emit("deselected");
      }
    },
    handleFileChange() {
      let newFile = this.$refs.file.files[0];
      console.log(newFile);
      if (newFile.size > this.maxsize) {
        alert(
          "File size cannot exceeds 500kB since this is a free hosting server."
        );
        return;
      }
      this.file = this.$refs.file.files[0];
    },
    handleFileUpload() {
      this.$emit("selected", {
        buffer: this.file,
        name: this.file.name,
        type: this.file.type
      });
      this.show = false;
      this.file = null;
    }
  },
  computed: {
    
  }
};
</script>

<style>
button#upload-file-trigger {
  width: 30px;
  height: 100%;
  overflow: hidden;
}

i.file-selected {
  color: #4c97b6;
}
</style>
