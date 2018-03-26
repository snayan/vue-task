<template>
  <div v-if="actionData" class="detail">
    <top-nav left='#icon-home' @left="navagateToHome" right='#icon-caidan08' />
    <div class="short_info">
      <channel  :value='actionData.channel.name'/>
      <h2 class="title">{{actionData.name}}</h2>
      <div class="user">
        <img class="user_img" :src='actionData.creator.avatar' />
        <div class="user_info">
          <span>{{actionData.creator.username}}</span>
          <span>{{actionData.createdAt}}</span>
        </div>
      </div>
    </div>
    <detail-nav />
    <div class="content">
      <detail-info :images="actionData.images" :description="actionData.description" :begin="actionData.begin_time" :end="actionData.end_time" :location="actionData.location" :address="actionData.location_detail"/>
      <detail-participants :goes="actionData.going_count" :likes="actionData.likes_count" />
      <detail-comments />
    </div>
    <detail-operation />
    <detail-reply />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TopNav from '@/components/TopNav.vue';
import Channel from '@/components/Channel.vue';
import AppIcon from '@/components/AppIcon.vue';
import DetailNav from '@/components/DetailNav.vue';
import DetailInfo from '@/components/DetailInfo.vue';
import DetailParticipants from '@/components/DetailParticipants.vue';
import DetailComments from '@/components/DetailComments.vue';
import DetailOperation from '@/components/DetailOperation.vue';
import DetailReply from '@/components/DetailReply.vue';
import { PREFIX } from '@/store/modules/list/CONSTANTS';
import { Action } from '@/store/modules/list/list';
import { getActionById } from '@/api/action';

@Component({
  components: {
    TopNav,
    Channel,
    AppIcon,
    DetailNav,
    DetailInfo,
    DetailParticipants,
    DetailComments,
    DetailOperation,
    DetailReply,
  },
})
export default class Detail extends Vue {
  private actionData: Action | null = null;
  private get actionId() {
    return this.$route.params.id;
  }
  private navagateToHome() {
    this.$router.push({ name: 'home' });
  }
  private created() {
    let data = this.$store.getters[`${PREFIX}/getDetail`](this.actionId);
    if (data && data.id === this.actionId) {
      return (this.actionData = { ...data });
    }
    let cancelLoading = this.$loading();
    getActionById(this.actionId)
      .then(({ event }: { event: Action }) => {
        this.actionData = { ...event };
        cancelLoading();
      })
      .catch((e: Error) => {
        cancelLoading();
        this.$toast(e.message);
      });
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/theme.scss';
@import '../scss/_px2px.scss';

.detail {
  padding-top: 80px;
  padding-bottom: 112px;
}
.short_info {
  padding: 32px;
}
.title {
  @include px2px(font-size,40);
  line-height: 1.2;
  color: $titleColor;
  margin-top: 30px;
}
.user {
  margin-top: 48px;
  height: 72px;
  display: flex;
  align-self: center;
  &_img {
    width: 72px;
    flex: 0 0 auto;
    border-radius: 50%;
    margin-right: 24px;
  }
  &_info {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    span:first-child {
      @include px2px(font-size,28);
      color: #67616d;
    }
    span:last-child {
      @include px2px(font-size,24);
      color: #bababa;
    }
  }
}
.content {
  background: #faf9fc;
}
</style>

