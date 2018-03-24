<template>
  <div class="participants">
    <div class="item go">
      <div class="head">
        <app-icon link="#icon-right" iconStyle="color:#AC8EC9" />
        <span>34 going</span>
      </div>
      <div class="avator">
        <img src="../assets/imgs/action.jpg" />
        <img src="../assets/imgs/action.jpg" />
        <img src="../assets/imgs/action.jpg" />
        <img src="../assets/imgs/action.jpg" />
      </div>
    </div>
    <div class="item  like">
      <div class="head">
        <app-icon link="#icon-custom-love" iconStyle="color:#AC8EC9" />
        <span>7 likes</span>
      </div>
      <div class="avator">
        <img src="../assets/imgs/action.jpg" />
        <img src="../assets/imgs/action.jpg" />
        <img src="../assets/imgs/action.jpg" />
        <img src="../assets/imgs/action.jpg" />
      </div>
    </div>
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
export default class DetailParticipants extends Vue {}
</script>

<style lang="scss" scoped>
@import '../scss/_px2px.scss';

.participants {
  @include px2px(font-size,24);
  color: #67616d;
  padding: 0 32px;
  border-bottom: 1px solid #e8e8e8;
}
.item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
}
.go {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    right: -32px;
    left: 0;
    height: 1px;
    bottom: 0;
    background: #e8e8e8;
  }
}
.head {
  flex: 0 0 auto;
  width: 140px;
  margin-right: 34px;
  span {
    margin-left: 10px;
  }
}
.avator {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin: 0 7px;
  }
}
</style>
