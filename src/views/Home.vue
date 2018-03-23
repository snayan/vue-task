<template>
  <div class="home" :class="{open}">
    <div class="content">
      <top-nav left="#icon-search"  @left="openSlide" right="#icon-caidan08" />
      <div :style="resultStyle">
        <SearchResult @clear="clearSearch" />
        <action />
      </div>
    </div>
    <aside class="slide">
      <search-slide />
    </aside>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TopNav from '@/components/TopNav.vue';
import Action from '@/components/Action.vue';
import SearchSlide from '@/components/SearchSlide.vue';
import SearchResult from '@/components/SearchResult.vue';

@Component({
  components: {
    TopNav,
    Action,
    SearchSlide,
    SearchResult,
  },
})
export default class Home extends Vue {
  private open: boolean = false;
  private resultheight: number = 0;
  private openSlide() {
    this.open = !this.open;
  }
  private clearSearch(height: number) {
    this.resultheight = height;
  }
  private get resultStyle() {
    return {
      transition: 'all 0.5s ease-out',
      transform: `translateY(-${this.resultheight}px)`,
    };
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

