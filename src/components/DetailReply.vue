<template>
  <div class="reply" :class="{show}">
    <button class="close" @click.stop="close">
      <app-icon link="#icon-close" :iconStyle="closeStyle" />
    </button>
    <div class="msg">
      <input v-model="msg" :placeholder="tip"/>
    </div>
    <button class="send" @click.stop="send">
      <app-icon link="#icon-send" :iconStyle="sendStyle" />
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop , Vue } from 'vue-property-decorator';
import AppIcon from '@/components/AppIcon.vue';
import {postCommentsByAId} from '@/api/comment';
import px2px from '@/util/px2px.ts';

@Component({
  components: {
    AppIcon,
  },
})
export default class DetailReply extends Vue {
  private msg: string = '';
  @Prop() private show!: boolean;
  @Prop({required: false, default: 'Leave your comment here'}) private tip!: string;
  private get actionId() {
    return this.$route.params.id;
  }
  private get closeStyle() {
    return 'fontSize:' + px2px(48);
  }
  private get sendStyle() {
    return {
      width: px2px(56),
      height: px2px(48),
    };
  }
  private close() {
    this.$emit('close');
  }
  private send() {
    if (this.msg && this.actionId) {
      const cancelLoading = this.$loading();
      postCommentsByAId(this.actionId, this.msg).then(() => {
        this.$emit('send', this.msg);
        cancelLoading();
        this.msg = '';
      }).catch((e: Error) => {
        cancelLoading();
        this.$toast(e.message);
      });
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../scss/theme.scss';
@import '../scss/_px2px.scss';

.reply {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 112px;
  z-index: 3;
  background: $topBarBgColor;
  display: flex;
  align-items: stretch;
  justify-content: center;
  transition: all 0.3s ease;
  transform: translateY(600%);
  z-index: 1;
  &.show {
    transform: translateY(0);
    z-index: 3;
  }
}
.close {
  flex: 0 0 auto;
  margin: 0 11px;
  color: $themeMain;
}
.msg {
  flex: 1 1 auto;
  padding-right: 28px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  input {
    flex: 1 1 auto;
    height: 64px;
    border-radius: 40px;
    padding: 14px 38px;
    box-sizing: border-box;
    @include px2px(font-size,28);
  }
}
.send {
  flex: 0 0 auto;
  width: 128px;
  color: $topBarBgColor;
  background: $themeMain;
}
::-webkit-input-placeholder {
  color: #d3c1e5;
}
:-moz-placeholder {
  color: #d3c1e5;
}
:-ms-input-placeholder {
  color: #d3c1e5;
}
</style>

