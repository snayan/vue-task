<template>
  <ul class="comments">
    <li class="item">
      <img class="avator" src="../assets/imgs/action.jpg" />
      <div class="txt">
        <p class="user">Little Prince<span>9 hours ago</span></p>
        <p class="msg">Nullam ut tincidunt nunc. Petus lacus, commodo eget justo ut, rutrum varius nunc.</p>
      </div>
      <a class="reply">
        <app-icon link="#icon-reply" :iconStyle="iconStyle" />
      </a>
    </li>
    <li class="item">
      <img class="avator" src="../assets/imgs/action.jpg" />
      <div class="txt">
        <p class="user">Little Prince<span>9 hours ago</span></p>
        <p class="msg">Nullam ut tincidunt nunc. Petus lacus, commodo eget justo ut, rutrum varius nunc.</p>
      </div>
      <a class="reply">
        <app-icon link="#icon-reply" :iconStyle="iconStyle" />
      </a>
    </li>
  </ul>
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
export default class DetailComments extends Vue {
  private get iconStyle() {
    return {
      fontSize: px2px(48),
      color: '#D5EF7F',
    };
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/_px2px.scss';

.comments {
  padding: 32px;
}
.item {
  padding: 16px 0;
  display: flex;
}
.avator {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  flex: 0 0 auto;
  margin-right: 24px;
}
.txt {
  flex: 1 1 auto;
}
.reply {
  flex: 0 0 auto;
}
.user {
  @include px2px(font-size,24);
  color: #8560a9;
  margin-bottom: 8px;
  span {
    @include px2px(font-size,20);
    color: #bababa;
    margin-left: 24px;
  }
}
.msg {
  @include px2px(font-size,28);
  color: #67616d;
  line-height: 1.2;
}
</style>

