<template>
  <div class="loading" :class="{showing}">
    <app-icon link="#icon-loading" :iconStyle="iconStyle" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppIcon from '@/components/AppIcon.vue';

@Component({
  components: {
    AppIcon,
  },
})
export default class Loading extends Vue {
  private showing: boolean = false;
  private get iconStyle() {
    return {
      width: '100%',
      height: '100%',
      display: this.showing ? 'block' : 'none',
      animation: this.showing
        ? 'circle_rotating 1.2s linear infinite forwards'
        : 'none',
    };
  }
  public show() {
    this.showing = true;
    return () => {
      this.showing = false;
    };
  }
}
</script>
<style lang="scss" scoped>
@import '../../scss/theme.scss';
@import '../../scss/_px2px.scss';

.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: $themeMain;
  width: 64px;
  height: 64px;
}
</style>

