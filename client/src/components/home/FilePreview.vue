<template>
  <div id="file-preview" @click.stop="onShowPreview">
    <template v-if="fileType === 'image'">
      <img :src="file.path" alt="attach image" id="attach-image" />
    </template>
    <div v-else id="file-preview-infos">
      <i class="fas fa-file-alt"></i>
      <div>
        <h1>{{ file.name }}</h1>
        <h2>{{ fileSize }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilePreview",
  props: {
    file: { type: Object, required: true }
  },
  methods: {
    onShowPreview() {
      window.open(this.file.path, "_blank");
    }
  },
  computed: {
    fileSize() {
      if (this.file.size) {
        return this.file.size / 1000 + "KB";
      }
      return null;
    },
    fileType() {
      return this.file.type.split("/")[0];
    }
  }
};
</script>

<style scoped>
div#file-preview {
  max-width: 500px;
}
div#file-preview-infos {
  border: solid 1px rgba(30, 30, 30, 0.13);
  padding: 15px;
  display: flex;
  flex-direction: row;
}
div#file-preview-infos svg {
  font-size: 2em;
  margin-right: 20px;
}
div#file-preview-infos h1 {
  font-size: 1em;
  margin: 0;
}
div#file-preview-infos h2 {
  font-size: 0.8em;
  margin: 0;
  font-weight: normal;
}
#attach-image {
  max-width: 500px;
  width: 100%;
}
</style>
