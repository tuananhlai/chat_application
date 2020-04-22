<template>
  <div class="dropdown-view">
    <button type="button" class="dropdown-button" @click="toggleDropdown">
      <span>{{ title }}</span>
      <i :class="dropdownIcon" />
    </button>
    <div id="dropdown-content" v-show="showDropdown">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkspaceSecondaryDropdown",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showDropdown: false
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    }
  },
  computed: {
    dropdownIcon() {
      return {
        fas: true,
        "fa-angle-right": !this.showDropdown,
        "fa-angle-down": this.showDropdown
      }
    }
  }
};
</script>

<style scoped>
.dropdown-view {
  border-bottom: 1px solid rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
}

.dropdown-button {
  background-color: white;
  /* border: 0.1px solid gray; */
  height: fit-content;
  padding: 15px;
  width: 100%;
  text-align: left;
  outline: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>