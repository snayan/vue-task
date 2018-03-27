<template>
  <div class="topNav">
    <ul class="list">
      <li class="item left">
        <app-icon :link="left" :iconStyle="iconSize" @click.native.stop="clickLeft" />
      </li>
      <li class="item center">
        <app-icon link="#icon-cat" :iconStyle="iconSize" @click.native.stop="clickCenter" />
      </li>
      <li class="item right">
        <img :src="avatar" @click.stop="clickRight" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit , Vue } from 'vue-property-decorator';
import AppIcon from './AppIcon.vue';
import {PREFIX} from '@/store/modules/user/CONSTANTS';
import px2px from '@/util/px2px';

@Component({
  components: {
    AppIcon,
  },
})
export default class TopNav extends Vue {
  @Prop({required: true})
  private left!: string;
  @Prop({required: true})
  private right!: string;
  private get iconSize() {
    return px2px(48);
  }
  private get avatar() {
    return this.$store.state[PREFIX].avatar;
  }
  private clickLeft() {
    this.$emit('left');
  }
  private clickCenter() {
    this.$emit('center');
  }
  private clickRight() {
     this.$router.push({ name: 'me' });
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/theme.scss';

.topNav {
  background: $topBarBgColor;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  z-index: 2;
}
.list {
  padding: 0 28px;
  overflow: hidden;
  height: 100%;
}
.item {
  float: left;
  width: 33.3333%;
  height: 100%;
  display: flex;
  align-items: center;
}
.left {
  justify-content: flex-start;
  color: #453257;
}
.center {
  justify-content: center;
  color: $themeMain;
}
.right {
  justify-content: flex-end;
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
}
</style>

