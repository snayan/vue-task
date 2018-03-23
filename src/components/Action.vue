<template>
  <section class="action">
    <header class="head">
      <app-icon link="#icon-caidan08" :iconStyle="userIconStyle"  />
      <span class="userName">Username</span>
      <channel value="Channel name" style="flex:0 0 auto;align-self: flex-end;" />
    </header>
    <div class="info">
      <div class="txt">
        <h2 class="title">Activity Title Name Make it Longer May Longer than One Line</h2>
        <div class="time">
          <app-icon link="#icon-clock" :iconStyle="clockIconStyle" />
          <p>14 May 2016 12:22 - 14 May 2016 18:00</p>
        </div>
        <p class="content">
          [No longer than 300 chars] Vivamus sagittis, diam in lobortis, sapien arcu mattis erat, vel aliquet sem urna et risus. Ut feugiat sapien mi potenti...
        </p>
      </div>
      <div class="img">
        <img src="../assets/imgs/action.jpg" />
      </div>
    </div>
    <div class="operation">
      <div class=" item go">
        <app-icon link="#icon-right" />
        <span>I am going!</span>
      </div>
      <div class="item like">
        <app-icon link="#icon-custom-love" />
        <span>I like it</span>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AppIcon from '@/components/AppIcon.vue';
import Channel from '@/components/Channel.vue';
import px2px from '@/util/px2px';

@Component({
  components: {
    AppIcon,
    Channel,
  },
})
export default class AppAction extends Vue {
  private get userIconStyle() {
    return {
      fontSize: px2px(40),
      flex: '0 0 auto',
    };
  }
  private get clockIconStyle() {
    return {
      fontSize: px2px(24),
      flex: '0 0 auto',
    };
  }
}
</script>
<style lang="scss" scoped>
@import '../scss/theme.scss';
@import '../scss/_px2px.scss';
.action {
  padding: 32px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    left: 32px;
    height: 1px;
    background: #e8e8e8;
  }
}
.head {
  height: 40px;
  display: flex;
  align-items: center;
}
.userName {
  @include px2px(font-size,24);
  line-height: 40px;
  color: #67616d;
  padding-left: 16px;
  flex: 1 1 auto;
}
.info {
  margin-top: 16px;
  display: flex;
}
.txt {
  flex: 1 1 auto;
}
.img {
  flex: 0 0 auto;
  margin-left: 16px;
  & > img {
    width: 128px;
  }
}
.title {
  @include px2px(font-size,36);
  color: $titleColor;
  line-height: 1.2;
}
.time {
  height: 30px;
  display: flex;
  align-items: center;
  color: $timeColor;
  margin-top: 16px;
  & > p {
    flex: 1 1 auto;
    @include px2px(font-size,24);
    margin-left: 10px;
  }
}
.content {
  @include px2px(font-size,28);
  color: $descriptionColor;
  line-height: 1.2;
  margin-top: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.operation {
  margin-top: 24px;
  @include px2px(font-size,24);
  overflow: hidden;
}
.item {
  float: left;
  & > span {
    margin-left: 12px;
  }
}
.like {
  margin-left: 60px;
}
</style>



