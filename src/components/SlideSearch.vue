<template>
  <div class="slideSearch" :class="{active}">
    <div class="date">
      <p><span class="title">DATE</span></p>
      <div class="list">
        <span class="item date_item" :class="{active:time && time.value==='all'}" @click.stop="changeTime('all','ANYTIME')">ANYTIME</span>
        <span class="item date_item" :class="{active:time && time.value==='today'}" @click.stop="changeTime('today','TODAY')">TODAY</span>
        <span class="item date_item" :class="{active:time && time.value==='tomrrow'}"  @click.stop="changeTime('tomrrow','TOMORROW')">TOMORROW</span>
        <span class="item date_item" :class="{active:time && time.value==='week'}" @click.stop="changeTime('week','THIS WEEK')">THIS WEEK</span>
        <span class="item date_item" :class="{active:time && time.value==='month'}" @click.stop="changeTime('month','THIS MONTH')">THIS MONTH</span>
        <span class="item date_item" :class="{active:time && time.value==='later'}" @click.stop="changeTime('later','LATER')">LATER</span>
      </div>
    </div>
    <div class="channel">
      <p><span class="title">CHANNEL</span></p>
      <div class="list">
        <span class="item channel_item" :class="{active:channel && channel.value==='all'}" @click.stop="changeChannel('all','ALl Channel')">All</span>
        <span class="item channel_item" :class="{active:channel && channel.value==='1'}" @click.stop="changeChannel('1','Channel 1')">Channel 1</span>
        <span class="item channel_item" :class="{active:channel && channel.value==='2'}" @click.stop="changeChannel('2','Channel 2')">Channel 2</span>
        <span class="item channel_item" :class="{active:channel && channel.value==='3'}" @click.stop="changeChannel('3','Channel 3')">Channel 3</span>
        <span class="item channel_item" :class="{active:channel && channel.value==='4'}" @click.stop="changeChannel('4','Channel 4')">Channel 4</span>
        <span class="item channel_item" :class="{active:channel && channel.value==='5'}" @click.stop="changeChannel('5','Short')">Short</span>
        <span class="item channel_item" :class="{active:channel && channel.value==='6'}" @click.stop="changeChannel('6','Short')">Short</span>
        <span class="item channel_item" :class="{active:channel && channel.value==='7'}" @click.stop="changeChannel('7','Channel 4')">Channel 4</span>
        <span class="item channel_item" :class="{active:channel && channel.value==='8'}" @click.stop="changeChannel('8','Channel 4')">Channel 4</span>
        <span class="item channel_item" :class="{active:channel && channel.value==='9'}" @click.stop="changeChannel('9','Channel 4')">Channel 4</span>
        <span class="item channel_item" :class="{active:channel && channel.value==='10'}" @click.stop="changeChannel('10','Channel Long Name')">Channel Long Name</span>
        <span class="item channel_item" :class="{active:channel && channel.value==='11'}" @click.stop="changeChannel('11','Channel 1')">Channel 1</span>
      </div>
    </div>
    <div class="search">
      <div class="search_btn" type="button" >
        <p>
          <app-icon link="#icon-search"  />
          SEARCH
        </p>
        <p class="search_tip" v-if="active">{{searchTip}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppIcon from '@/components/AppIcon.vue';
import px2px from '@/util/px2px.ts';

interface Filter {
  name: string;
  value: string;
}

@Component({
  components: {
    AppIcon,
  },
})
export default class SlideSearch extends Vue {
  private time: Filter | null = null;
  private channel: Filter | null = null;
  private changeTime(value: string, name: string) {
    if (!this.time) {
      this.time = { name: '', value: '' };
    }
    this.time = this.time.value === value ? null : { name, value };
  }
  private changeChannel(value: string, name: string) {
    if (!this.channel) {
      this.channel = { name: '', value: '' };
    }
    this.channel = this.channel.value === value ? null : { name, value };
  }
  private get active() {
    return !!(this.time || this.channel);
  }
  private get searchTip() {
    let val = '';
    if (
      this.time &&
      this.time.value === 'all' &&
      this.channel &&
      this.channel.value === 'all'
    ) {
      return 'All activities';
    }
    if (this.channel && this.channel.value) {
      val = this.channel.name;
      if (this.time && this.time.value) {
        val += ' from ';
      }
    }
    if (this.time && this.time.value) {
      val += this.time.name;
    }
    return val;
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
.search_tip {
  @include px2px(font-size,20);
  color: #8560a9;
  margin-top: 12px;
}
</style>


