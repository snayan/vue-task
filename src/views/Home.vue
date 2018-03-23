<template>
  <div class="home" :class="{open}">
    <div class="content">
      <top-nav left="#icon-search"  @left="openSlide" right="#icon-caidan08" />
      <action />
    </div>
    <aside class="slide">
      <slide-search />
    </aside>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TopNav from '@/components/TopNav.vue';
import Action from '@/components/Action.vue';
import SlideSearch from '@/components/SlideSearch.vue';

@Component({
  components: {
    TopNav,
    Action,
    SlideSearch,
  },
})
export default class Home extends Vue {
  private open: boolean = true;
  private openSlide() {
    this.open = !this.open;
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
}
.content {
  padding-top: 80px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 0.5s ease;
  .open & {
    transform: translateX(480px);
  }
}
.slide {
  position: absolute;
  left: 0;
  width: 480px;
  top: 0;
  bottom: 0;
  overflow: hidden;
  transform: translateX(-100%);
  transition: all 0.5s ease;
  .open & {
    transform: translateX(0);
  }
}
</style>

