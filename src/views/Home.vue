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
      <search-slide @search="search" :clear="clear" />
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
import { WinInfo } from '@/plugins/Scrolling/index.d';
import px2px from '@/util/px2px';

/* 距离底部距离触发加载 */
const LIMIT = 400;

let isLock = false;
let preScrollHeight = 0;

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
  private clear: boolean = false;
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
  private get hasMore() {
    return this.$store.state[PREFIX]['has_more'];
  }
  private toggleSlide() {
    this.open = !this.open;
  }
  private search(tip: string) {
    this.toggleSlide();
    this.down = true;
    this.clear = false;
    this.resultheight = 0;
    this.searchTip = tip;
  }
  private clearSearch(height: number) {
    this.resultheight = -height;
    this.clear = true;
    this.$store.dispatch(actions.getList);
  }
  private created() {
    this.$store.dispatch(actions.getList);
  }
  private scrolling(w: WinInfo) {
    let totalHeight = this.$el.scrollHeight;
    let rectHeight = this.$el.getBoundingClientRect().height;
    let scrollHeight = w.scrollY;
    if (
      this.hasMore &&
      !isLock &&
      preScrollHeight < scrollHeight &&
      totalHeight - rectHeight - scrollHeight < LIMIT
    ) {
      isLock = true;
      let cancelLoading = this.$loading();
      this.$store
        .dispatch(actions.getMoreList, {
          offset: this.lists.length,
        })
        .then(() => {
          isLock = false;
          cancelLoading();
        })
        .catch((e: Error) => {
          isLock = false;
          cancelLoading();
          this.$toast(e.message);
        });
    }
    preScrollHeight = scrollHeight;
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

