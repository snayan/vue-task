<template>
  <div class="home">
    <h4 class="subtitle">FIND THE MOST LOVED ACTIVITIES</h4>
    <h2 class="maintitle">BLACK CAT</h2>
    <div>
      <img  class="icon" src="" />
    </div>
    <div class="sign">
      <form>
        <div class="name">
          <app-icon link="#icon-caidan08" :iconStyle="'fontSize:'+iconSize" />
          <input />
        </div>
        <div class="password">

          <input />
        </div>
        <div class="submit">
          <input type="submit" value="SIGN IN" />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppIcon from '@/components/AppIcon.vue';
import px2px from '@/util/px2px';

@Component({
  components: {
    AppIcon,
  },
})
export default class Home extends Vue {
  private get iconSize() {
    return px2px(32);
  }
}
</script>

<style lang="scss" scoped>
.home {
  background: url('./assets/imgs/sign.jpg') no-repeat;
  background-size: 100% 100%;
  background-position: center;
}
</style>

