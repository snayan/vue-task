<template>
  <ul class="comments">
    <li class="item" v-for="item in comments" :key="item.id">
      <img class="avator" :src="item.user.avatar" />
      <div class="txt">
        <p class="user">{{item.user.username}}<span>{{item.create_time}}</span></p>
        <p class="msg">{{item.comment}}</p>
      </div>
      <a class="reply" @click.stop.prevent="reply(item.user)">
        <app-icon link="#icon-reply" :iconStyle="iconStyle" />
      </a>
    </li>
  </ul>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AppIcon from '@/components/AppIcon.vue';
import { User } from '@/store/modules/user/user';
import px2px from '@/util/px2px.ts';

interface Comment {
  id: number;
  create_time: string;
  comment: string;
  user: User;
}

@Component({
  components: {
    AppIcon,
  },
})
export default class DetailComments extends Vue {
  @Prop({required: true, default: [], type: Array}) private comments!: Comment[];
  private get actionId() {
    return this.$route.params.id;
  }
  private get iconStyle() {
    return {
      fontSize: px2px(48),
      color: '#D5EF7F',
      verticalAlign: 'text-top',
    };
  }
  private reply(user: User) {
    this.$emit('reply', user);
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

