<template>
  <div class="info">
    <div class="img">
      <img src='../assets/imgs/action.jpg' />
      <img src='../assets/imgs/action.jpg' />
      <img src='../assets/imgs/action.jpg' />
      <img src='../assets/imgs/action.jpg' />
    </div>
    <div class="txt">
      <p>
        [No longer than 300 chars] Vivamus sagittis, diam in lobortis, sapien arcu mattis erat, vel aliquet sem urna et risus. Ut feugiat sapien mi potenti. Maecenas et enim odio. Nullam massa metus, varius quis vehicula sed, pharetra mollis erat. In quis viverra velit. Vivamus placerat, est nec hendrerit varius, enim dui hendrerit magna, ut pulvinar nibh lorem vel lacus. Mauris a orci iaculis, hendrerit eros sed, gravida leo. In dictum mauris vel augue varius there is south north asim
      </p>
    </div>
    <div class="when">
      <p class="when_title">When</p>
      <div class="when_content">
        <div class="when_start">
          <p class="when_date">
            <app-icon iconStyle="color:#aecb4f;"  link="#icon-right1"/>
            <span>15 April 2015</span>
          </p>
          <p class="when_time">8:30<span>am</span></p>
        </div>
        <div class="when_end">
          <p class="when_date">
            <app-icon iconStyle="color:#aecb4f;" link="#icon-left"/>
            <span>15 April 2015</span>
          </p>
        </div>
      </div>
    </div>
    <div class="where">
      <p class="where_title">Where</p>
      <p class="where_location">Marina Bay Sands</p>
      <p class="where_address">10 Bayfront Ave, S018956</p>
      <img class="where_img" src="../assets/imgs/gmap.png" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppIcon from '@/components/AppIcon.vue';
import px2px from '@/util/px2px.ts';

@Component({
  components: {
    AppIcon,
  },
})
export default class DetailInfo extends Vue {}
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
    margin: 0 12px;
    width: 360px;
    height: 200px;
    -webkit-overflow-scrolling: touch;
  }
  img:first-child {
    margin-left: 32px;
  }
  img:last-child {
    margin-right: 32px;
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
.where{
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
.where_img{
  width: 100%;
  border-radius: 24px;
}
</style>

