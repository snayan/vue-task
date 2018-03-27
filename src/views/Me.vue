<template>
  <div class="me">
    <top-nav left="#icon-home" @left="navagateToHome" right="#icon-caidan08" />
    <div class="content">
      <div class="info">
        <img class="avator" src="../assets/imgs/action.jpg" />
        <p class="name">Username</p>
        <p class="email">
          <app-icon link="#icon-email" :iconStyle="iconStyle" />
          <span>myusername@gmail.com</span>
        </p>
      </div>
      <nav class="nav">
        <a class="item active">
          <app-icon link="#icon-custom-love" :iconStyle="iconStyle" />
          <span>12 likes</span>
        </a>
        <a class="item">
          <app-icon link="#icon-right" :iconStyle="iconStyle" />
          <span>0 Going</span>
        </a>
        <a class="item">
          <app-icon link="#icon-other" :iconStyle="iconStyle" />
          <span>0 Past</span>
        </a>
      </nav>
      <component :is="co"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppIcon from '@/components/AppIcon.vue';
import TopNav from '@/components/TopNav.vue';
import Action from '@/components/Action.vue';
import px2px from '@/util/px2px.ts';

@Component({
  components: {
    AppIcon,
    TopNav,
    Action,
  },
})
export default class Me extends Vue {
  private co = Action;
  private get iconStyle() {
    return `fontSize:${px2px(36)}`;
  }
  private navagateToHome() {
    this.$router.push({ name: 'home' });
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/theme.scss';
@import '../scss/_px2px.scss';

.me {
  padding-top: 80px;
  background: #fafafa;
  height: 100%;
  box-sizing: border-box;
}
.info {
  padding: 72px 0 48px;
  background: #ffffff;
  text-align: center;
}
.avator {
  width: 144px;
  height: 144px;
  border: 8px solid $topBarBgColor;
  border-radius: 50%;
}
.name {
  @include px2px(font-size,48);
  color: #67616d;
  margin-top: 48px;
  line-height: 62px;
}
.email {
  @include px2px(font-size,28);
  color: $topBarBgColor;
  margin-top: 16px;
  line-height: 36px;
  span {
    margin-left: 12px;
  }
}
.nav {
  overflow: hidden;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  @include px2px(font-size,24);
  color: #8c8c8c;
  background: #ffffff;
  text-align: center;
}
.item {
  width: 33.3333%;
  float: left;
  padding: 32px 0;
  position: relative;
  span {
    margin-left: 12px;
  }
  &.active {
    color: #aecb4f;
  }
  &:after {
    content: '';
    position: absolute;
    top: 32px;
    bottom: 32px;
    width: 1px;
    right: 0;
    background: #e8e8e8;
  }
  &:last-child::after {
    content: none;
  }
}
</style>
