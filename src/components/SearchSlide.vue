<template>
  <div class="slideSearch" :class="{active}">
    <div class="date">
      <p><span class="title">DATE</span></p>
      <div class="list">
        <span v-for="item in getDates" :key="item.value" class="item date_item" :class="{active:time && time.value===item.value}" @click.stop="changeTime(item)">{{item.name}}</span>
      </div>
    </div>
    <div class="channel">
      <p><span class="title">CHANNEL</span></p>
      <div class="list">
        <span class="item channel_item" :class="{active:isSelectedAllChannel}" @click.stop="changeAllChannel()">All</span>
        <span v-for="item in getChannels" :key="item.id" class="item channel_item" :class="{active: ~channels.map(v=>v.id+',').join('').indexOf(item.id+',')}" @click.stop="changeChannel(item)">{{item.name}}</span>
      </div>
    </div>
    <div class="search" @click.stop="search">
      <div class="search_btn" type="button" >
        <p class="search_txt">
          <app-icon link="#icon-search"  />
          <span>SEARCH</span>
        </p>
        <p class="search_tip" v-if="active">{{searchTip}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Watch , Vue } from 'vue-property-decorator';
import AppIcon from '@/components/AppIcon.vue';
import { PREFIX, actions } from '@/store/modules/filter/CONSTANTS';
import { Channel, Date } from '@/store/modules/filter/filter';
import { actions as listActions } from '@/store/modules/list/CONSTANTS';
import px2px from '@/util/px2px.ts';

@Component({
  components: {
    AppIcon,
  },
})
export default class SlideSearch extends Vue {
  private time: Date | null = null;
  private channels: Channel[] = [];
  @Prop({required: true, default: false}) private clear!: boolean;
  private get active() {
    return !!(this.time || this.channels.length);
  }
  private get searchTip() {
    let val = '';
    if (this.time && this.time.value === 'all' && this.isSelectedAllChannel) {
      return 'All activities';
    }
    if (this.isSelectedAllChannel) {
      val = 'All channels';
    } else if (this.channels.length) {
      val = this.channels.reduce((s, v, i) => {
        return (s += i < 3 ? v.name + ',' : '');
      }, '');
      val = val.slice(0, val.length - 1);
      if (this.channels.length > 3) {
        val += ',...';
      }
      if (this.time && this.time.value) {
        val += ' from ';
      }
    }
    if (this.time && this.time.value) {
      val += this.time.name;
    }
    return val;
  }
  private get getDates() {
    return this.$store.state[PREFIX].dates;
  }
  private get getChannels() {
    return this.$store.state[PREFIX].channels;
  }
  private get isSelectedAllChannel() {
    return this.channels.length === this.getChannels.length;
  }
  private changeTime(item: Date) {
    this.time = this.time === item ? null : item;
  }
  private changeChannel(item: Channel) {
    const channels = this.channels.filter((v) => v.id === item.id);
    if (channels.length) {
      this.channels = this.channels.filter((v) => v.id !== item.id);
    } else {
      this.channels = [...this.channels, item];
    }
  }
  private changeAllChannel() {
    this.channels = this.isSelectedAllChannel ? [] : [...this.getChannels];
  }

  private search() {
    if (!this.active) {
      return false;
    }
    const params = Object.create(null);
    if (this.time && this.time.value !== 'all') {
      params.after = this.time.start;
      params.before = this.time.end;
    }
    if (this.channels.length) {
      params.channels = this.channels.map((v) => v.id).join(',');
    }
    this.$store.dispatch(listActions.getList, params);
    this.$emit('search', this.searchTip);
  }
  private created() {
    this.$store.dispatch(actions.getChannels);
  }
  @Watch('clear')
  private clearSearch() {
    this.time = null;
    this.channels = [];
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/theme.scss';
@import '../scss/_px2px.scss';

.slideSearch {
  background: $slideBgColor;
  height: 100%;
  padding: 20px 32px 0;
  box-sizing: border-box;
  text-align: center;
}
.title {
  color: #ac8ec9;
  @include px2px(font-size,24);
  position: relative;
  line-height: 30px;
  &::after {
    content: '';
    position: absolute;
    height: 4px;
    bottom: -4px;
    left: 0;
    right: 0;
    background: #8560a9;
  }
}
.date > .list {
  margin: 40px -15px 0;
}
.channel > .list {
  margin: 34px -12px 0;
}
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.item {
  cursor: pointer;
  -webkit-tap-highlight-color: $slideBgColor;
  &.active {
    background: $themeLight;
    color: $slideBgColor;
  }
}
.date_item {
  @include px2px(font-size,28);
  color: #ffffff;
  line-height: 36px;
  margin: 0 15px 26px;
  padding: 0 14px;
  border-radius: 24px;
}
.channel_item {
  @include px2px(font-size,24);
  border: 1px solid #d3c1e5;
  border-radius: 24px;
  line-height: 48px;
  margin: 0 12px 18px;
  padding: 0 18px;
  color: #ffffff;
}
.search {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 128px;
  background: #bababa;
  @include px2px(font-size,32);
  color: #666666;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .active & {
    background: $themeMain;
    color: $slideBgColor;
  }
}
.search_txt {
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    margin-left: 12px;
  }
}
.search_tip {
  @include px2px(font-size,20);
  color: #8560a9;
  margin-top: 12px;
}
</style>


