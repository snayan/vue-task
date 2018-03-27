<template>
  <div class="participants">
    <div class="item go">
      <div class="head">
        <app-icon link="#icon-right" iconStyle="color:#AC8EC9" />
        <span>{{participants.length}} going</span>
      </div>
      <div class="avator">
        <img v-for="item in participants" :key="item.id" :src="item.avatar" />
      </div>
    </div>
    <div class="item  like">
      <div class="head">
        <app-icon link="#icon-custom-love" iconStyle="color:#AC8EC9" />
        <span>{{likes.length}} likes</span>
      </div>
      <div class="avator">
        <img v-for="item in likes" :key="item.id" :src="item.avatar" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppIcon from '@/components/AppIcon.vue';
import { getParticipantsByAId } from '@/api/participant';
import { getLikesByAId } from '@/api/like';
import { User } from '@/store/modules/user/user';

@Component({
  components: {
    AppIcon,
  },
})
export default class DetailParticipants extends Vue {
  private participants: User[] = [];
  private likes: User[] = [];
  private get actionId() {
    return this.$route.params.id;
  }
  private created() {
    getParticipantsByAId(this.actionId)
      .then(({ users }: { users: User[] }) => {
        this.participants = [...users];
      })
      .catch((e: Error) => {
        this.$toast(e.message);
      });
    getLikesByAId(this.actionId)
      .then(({ users }: { users: User[] }) => {
        this.likes = [...users];
      })
      .catch((e: Error) => {
        this.$toast(e.message);
      });
  }
}
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
  min-height: 120px;
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
  flex-wrap: wrap;
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    padding: 12px 7px;
  }
}
</style>
