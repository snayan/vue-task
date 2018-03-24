<template>
  <nav class="nav">
    <a class="nav_item active">
      <app-icon :iconStyle="iconSize" link="#icon-info"/>
      <span>Details</span>
    </a>
    <a class="nav_item">
      <app-icon :iconStyle="iconSize" link='#icon-group' />
      <span>Participants</span>
    </a>
    <a class="nav_item">
      <app-icon :iconStyle="iconSize" link="#icon-message"/>
      <span>Comments</span>
    </a>
  </nav>
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
export default class DetailNav extends Vue {
  private get iconSize() {
    return `fontSize:${px2px(32)}`;
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/theme.scss';
@import '../scss/_px2px.scss';

.nav {
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  overflow: hidden;
  color: #8c8c8c;
  @include px2px(font-size,24);
}
.nav_item {
  float: left;
  width: 33.3333%;
  position: relative;
  padding: 32px 0;
  text-align: center;
  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 2px;
    height: 22px;
    background: #e8e8e8;
  }
  &.active {
    color: #aecb4f;
  }
  & > span {
    margin-left: 14px;
  }
}
</style>
