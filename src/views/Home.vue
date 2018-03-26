<template>
  <div class="home" :class="{open}">
    <div class="content">
      <top-nav left="#icon-search"  @left="toggleSlide" right="#icon-caidan08" />
      <div :style="resultStyle">
        <SearchResult v-if="down" @clear="clearSearch" :down="down" :tip="searchTip" />
        <template v-if="lists && lists.length" >
          <template v-for="item in lists" >
            <action :key="item.id" :item="item"   />
          </template>
        </template>
        <empty v-else tip="No activity found" :emptyStyle="emptyStyle" />
      </div>
    </div>
    <aside class="slide">
      <search-slide @search="search" />
    </aside>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TopNav from '@/components/TopNav.vue';
import Action from '@/components/Action.vue';
import SearchSlide from '@/components/SearchSlide.vue';
import SearchResult from '@/components/SearchResult.vue';
import Empty from '@/components/Empty.vue';
import { actions, PREFIX } from '@/store/modules/list/CONSTANTS';
import px2px from '@/util/px2px';

@Component({
  components: {
    TopNav,
    Action,
    SearchSlide,
    SearchResult,
    Empty,
  },
})
export default class Home extends Vue {
  private open: boolean = false;
  private down: boolean = false;
  private searchTip: string = '';
  private resultheight: number = 0;
  private get resultStyle() {
    return {
      transition: 'all 0.5s ease-out',
      transform: `translateY(${this.resultheight}px)`,
    };
  }
  private get emptyStyle() {
    return {
      marginTop: px2px(240),
    };
  }
  private get lists() {
    return this.$store.state[PREFIX]['data'];
  }
  private toggleSlide() {
    this.open = !this.open;
  }
  private search(tip: string) {
    this.toggleSlide();
    this.down = true;
    this.resultheight = 0;
    this.searchTip = tip;
  }
  private clearSearch(height: number) {
    this.resultheight = -height;
  }
  private created() {
    this.$store.dispatch(actions.getList);
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
  position: fixed;
  left: 0;
  width: 480px;
  top: 0;
  bottom: 0;
  overflow: hidden;
  transform: translateX(-100%);
  transition: all 0.5s ease;
  z-index: 3;
  .open & {
    transform: translateX(0);
  }
}
</style>

