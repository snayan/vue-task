<template>
  <div class="operation">
    <div class="left">
      <button class="reply">
        <app-icon link='#icon-xiaoxi' :iconStyle="iconStyle" />
      </button>
      <button class="like">
        <app-icon link='#icon-custom-love' :iconStyle="iconStyle" />
      </button>
    </div>
    <div class="right">
      <button class="join">
        <app-icon link='#icon-right' :iconStyle="iconStyle" />
        <span>Join</span>
      </button>
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
export default class DetailOperation extends Vue {
  private get iconStyle() {
    return {
      color: '#000000',
      fontSize: px2px(48),
    };
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/theme.scss';
@import '../scss/_px2px.scss';

.operation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 112px;
  overflow: hidden;
  z-index: 2;
}
.left {
  float: left;
  width: 56.25%;
  height: 100%;
  background: $topBarBgColor;
  button {
    width: 50%;
    height: 100%;
  }
}
.right {
  float: left;
  width: 43.75%;
  height: 100%;
  background: $themeMain;
  button {
    width: 100%;
    height: 100%;
  }
}
.join {
  @include px2px(font-size,28);
  color: #788c36;
}
</style>


