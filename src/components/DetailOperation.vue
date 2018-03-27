<template>
  <div class="operation">
    <div class="left">
      <button class="reply" @click.stop.prevent="reply">
        <app-icon link='#icon-xiaoxi' :iconStyle="iconReplyStyle" />
      </button>
      <button class="like" @click.stop.prevent="toggleLike">
        <app-icon :link="hasLike?'#icon-icons-1':'#icon-custom-love'" :iconStyle="iconLikeStyle" />
      </button>
    </div>
    <div class="right" >
      <button class="join" @click.stop.prevent="toggleJoin">
        <app-icon link='#icon-right' :iconStyle="iconJoinStyle" />
        <span>{{hasJoin?'I am going':'Join'}}</span>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AppIcon from '@/components/AppIcon.vue';
import px2px from '@/util/px2px.ts';

@Component({
  components: {
    AppIcon,
  },
})
export default class DetailOperation extends Vue {
  @Prop({required: true, default: false}) private hasJoin!: boolean;
  @Prop({required: true, default: false}) private hasLike!: boolean;
  private get iconReplyStyle() {
    return {
      color: '#000000',
      fontSize: px2px(48),
    };
  }
  private get iconLikeStyle() {
    return {
      color: this.hasLike ? '#D5EF7F' : '#000000',
      fontSize: px2px(48),
    };
  }
  private get iconJoinStyle() {
    return {
      color: this.hasJoin ? '#8560a9' : '#000000',
      fontSize: px2px(48),
    };
  }
  private reply() {
    this.$emit('reply');
  }
  private toggleLike() {
    this.$emit('toggleLike');
  }
  private toggleJoin() {
    this.$emit('toggleJoin');
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
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    margin-left: 24px;
  }
}
</style>


