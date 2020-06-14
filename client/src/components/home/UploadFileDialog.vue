<template>
  <div @click.stop>
    <button id="upload-file-trigger" type="button" @click="handleButtonClick">
      <i :class="['fas', 'fa-paperclip', attachment ? 'file-selected' : '']"></i>
    </button>
    <base-dialog :active.sync="show">
      <h1>Upload File</h1>
      <form @submit.prevent="handleFileUpload">
        <input type="file" ref="fileInput" @change="handleFileChange" :name="fieldName" />
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
      type: File
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
      let newFile = this.$refs.fileInput.files[0];
      if (newFile && !this.validateFile(newFile)) {
        this.$refs.fileInput.value = null;
        this.file = null;
        return;
      }
      this.file = newFile;
    },
    handleFileUpload() {
      this.$emit("selected", this.file);
      this.show = false;
      this.file = null;
    },
    validateFile(file) {
      let [fileType, fileExt] = file.type.split("/");
      if (file.size > this.maxsize) {
        alert(
          "File size cannot exceeds 500kB since this is a free hosting server."
        );
        return false;
      }
      return true;
    }
  },
  computed: {}
};
</script>

<style scoped>
button#upload-file-trigger {
  width: 30px;
  height: 100%;
  overflow: hidden;
}

i.file-selected {
  color: #4c97b6;
}
</style>
