<template>
  <div class="info">
    <div class="img" v-if="images && images.length">
      <img v-for="item in images" :key="item" :src='item' />
    </div>
    <div class="txt">
      <p>{{description}}</p>
    </div>
    <div class="when">
      <p class="when_title">When</p>
      <div class="when_content">
        <div class="when_start">
          <p class="when_date">
            <app-icon iconStyle="color:#aecb4f;"  link="#icon-right1"/>
            <span>{{beginDate}}</span>
          </p>
          <p class="when_time">{{beginTime.value}}<span>{{beginTime.am?'am':'pm'}}</span></p>
        </div>
        <div class="when_end">
          <p class="when_date">
            <app-icon iconStyle="color:#aecb4f;" link="#icon-left"/>
            <span>{{endDate}}</span>
          </p>
          <p class="when_time">{{endTime.value}}<span>{{endTime.am?'am':'pm'}}</span></p>
        </div>
      </div>
    </div>
    <div class="where">
      <p class="where_title">Where</p>
      <p class="where_location">{{location}}</p>
      <p class="where_address">{{address}}</p>
      <img class="where_img" src="../assets/imgs/gmap.png" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AppIcon from '@/components/AppIcon.vue';
import px2px from '@/util/px2px';
import {toLocalString, toLocalTime} from '@/util/date';

@Component({
  components: {
    AppIcon,
  },
})
export default class DetailInfo extends Vue {
  @Prop({required: false, type: Array}) private images!: string[];
  @Prop({required: true}) private description!: string;
  @Prop({required: true}) private begin!: string;
  @Prop({required: true}) private end!: string;
  @Prop({required: true}) private location!: string;
  @Prop({required: true}) private address!: string;
  private get beginDate() {
    return toLocalString(this.begin);
  }
  private get beginTime() {
    return toLocalTime(this.begin);
  }
  private get endDate() {
    return toLocalString(this.end);
  }
  private get endTime() {
    return toLocalTime(this.end);
  }
}
</script>
<style lang="scss" scoped>
@import '../scss/theme.scss';
@import '../scss/_px2px.scss';

.info {
  padding: 32px;
  border-bottom: 1px solid #e8e8e8;
}
.img {
  overflow-x: scroll;
  display: flex;
  flex-wrap: nowrap;
  margin: 0 -32px;
  img {
    flex: 0 0 auto;
    padding: 0 12px;
    width: 360px;
    height: 200px;
    -webkit-overflow-scrolling: touch;
  }
  img:first-child {
    padding-left: 32px;
  }
  img:last-child {
    padding-right: 32px;
  }
}
.txt {
  @include px2px(font-size,28);
  line-height: 1.2;
  color: #67616d;
  margin: 24px 0;
}
.when,
.where {
  position: relative;
  padding: 32px 0;
  &::before {
    position: absolute;
    content: '';
    left: 0;
    right: -32px;
    height: 2px;
    top: 0;
    background: #e8e8e8;
  }
  &_title {
    @include px2px(font-size,32);
    color: $timeColor;
    padding-left: 16px;
    position: relative;
    margin-bottom: 20px;
    &::before {
      content: '';
      left: 0;
      width: 8px;
      background: $timeColor;
      top: 0;
      bottom: 0;
      position: absolute;
    }
  }
}
.where {
  padding-bottom: 0;
}
.when_content {
  display: flex;
  justify-content: center;
  align-items: stretch;
  @include px2px(font-size,32);
  color: #67616d;
  text-align: center;
}
.when_start {
  flex: 1 1 auto;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: #e8e8e8;
  }
}
.when_end {
  flex: 1 1 auto;
}
.when_date {
  margin-bottom: 12px;
  span {
    margin-left: 8px;
  }
}
.when_time {
  @include px2px(font-size,64);
  color: #aecb4f;
  line-height: 80px;
  span {
    @include px2px(font-size,20);
    margin-left: 20px;
  }
}
.where_location {
  @include px2px(font-size,28);
  color: #67616d;
  margin-bottom: 16px;
}
.where_address {
  @include px2px(font-size,24);
  color: #666666;
  margin-bottom: 16px;
}
.where_img {
  width: 100%;
  border-radius: 24px;
}
</style>

