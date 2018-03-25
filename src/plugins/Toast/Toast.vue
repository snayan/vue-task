<template>
  <div class="toast" :class="{showing}">
    <p>{{msg}}</p>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Toast extends Vue {
  private msg: string = '';
  private showTimer: number | null = null;
  private hideTimer: number | null = null;
  private showing: boolean = false;
  public show(msg: string) {
    if (msg) {
      this.msg = msg;
      this.$nextTick(function() {
        this.showTimer = window.setTimeout(() => {
          this.showing = true;
          this.$nextTick(function() {
            this.hideTimer = window.setTimeout(() => {
              this.showing = false;
            }, 1000);
          });
        }, 333);
      });
    }
  }
  private destroyed() {
    if (this.showTimer !== null) {
      window.clearTimeout(this.showTimer);
    }
    if (this.hideTimer !== null) {
      window.clearTimeout(this.hideTimer);
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../scss/_px2px.scss';
@import '../../scss/theme.scss';
.toast {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: -1;
  opacity: 0;
  transform: translateY(-200%);
  transition: all 0.5s ease;
  background: $themeLight;
  @include px2px(font-size,28);
  color: $topBarBgColor;
  text-align: center;
  padding: 16px;
  line-height: 1.2;
  &.showing {
    opacity: 1;
    z-index: 999;
    top: 50%;
  }
}
</style>

