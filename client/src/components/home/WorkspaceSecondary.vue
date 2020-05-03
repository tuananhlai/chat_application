<template>
    <!-- <transition
    name="expand"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"> -->
      <div id="workspace-secondary">
        <div id="top-nav">
          <div id="top-nav-title">
            <h1>{{ this.title }}</h1>
            <h2>#{{ this.currentChannel.name }}</h2>
          </div>
          <button id="close-btn" @click="$emit('close')" title="Close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div id="content">
          <slot></slot>
        </div>
      </div>
  <!-- </transition> -->
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "WorkspaceSecondary",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(["currentChannel"])
  },
    // enter(el) {
    //   el.style.width = 'auto';
    //   const width = getComputedStyle(el).width;
    //   el.style.width = 0;

    //   getComputedStyle(el);

    //   setTimeout(() => {
    //     el.style.widtht = width;
    //   });
    // },
    // afterEnter(el) {
    //   el.style.width = 'auto';
    // },
    // leave(el) {
    //   el.style.width = getComputedStyle(el).width;

    //   getComputedStyle(el);

    //   setTimeout(() => {
    //     el.style.widtht = 0;
    //   });
    // }
};
</script>

<style scoped>
button:hover {
  cursor: pointer;
}
#workspace-secondary {
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 300px;
}

button#close-btn {
  background-color: transparent;
  width: 30px;
  height: 30px;
  margin-left: auto;
  align-self: flex-start;
}

button#close-btn:hover {
  background-color: rgba(30, 30, 30, 0.13);
}

#top-nav {
  border-bottom: 1px solid rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
  padding: 15px;
  min-height: 70px;
  background-color: rgb(253, 253, 253);
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
}

#top-nav-title h1 {
  font-size: 1em;
  margin: 0;

}

#top-nav-title h2 {
  margin: 0;
  font-size: 0.9em;
  font-weight: normal;
  color: rgba(29, 28, 29, 0.7);
}

#content {
  height: 100%;
  overflow-y: scroll;
}

/* .expand-enter-active, .expand-leave-active {
  transition: width .5s ease-in-out;
  overflow: hidden;
} */
</style>
