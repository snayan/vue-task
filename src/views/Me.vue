<template>
  <div class="me">
    <top-nav left="#icon-home" @left="navagateToHome" right="#icon-caidan08" />
    <div class="content">
      <div class="info">
        <img class="avator" :src="user.avatar" />
        <p class="name">{{user.username}}</p>
        <p class="email">
          <app-icon link="#icon-email" :iconStyle="iconStyle" />
          <span>{{user.email}}</span>
        </p>
      </div>
      <nav class="nav">
        <a class="item" :class="{active:type==='liked'}" @click.stop.prevent="changeTab('liked')">
          <app-icon link="#icon-custom-love" :iconStyle="iconStyle" />
          <span>{{user.likes_count||0}} likes</span>
        </a>
        <a class="item" :class="{active:type==='going'}" @click.stop.prevent="changeTab('going')">
          <app-icon link="#icon-right" :iconStyle="iconStyle" />
          <span>{{user.goings_count||0}} Going</span>
        </a>
        <a class="item" :class="{active:type==='past'}" @click.stop.prevent="changeTab('past')">
          <app-icon link="#icon-other" :iconStyle="iconStyle" />
          <span>{{user.past_count||0}} Past</span>
        </a>
      </nav>
      <div v-if="actions.length">
        <action v-for="value in actions" :key="value.id" :item="value" />
      </div>
      <empty v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AppIcon from '@/components/AppIcon.vue';
import TopNav from '@/components/TopNav.vue';
import Action from '@/components/Action.vue';
import Empty from '@/components/Empty.vue';
import { PREFIX, actions } from '@/store/modules/user/CONSTANTS';
import { User } from '@/store/modules/user/user';
import { Action as ActionType } from '@/store/modules/list/list';
import { getUserActions } from '@/api/user';
import px2px from '@/util/px2px.ts';

type tabType = 'liked' | 'going' | 'past';

@Component({
  components: {
    AppIcon,
    TopNav,
    Action,
    Empty,
  },
})
export default class Me extends Vue {
  private type: tabType = 'liked';
  private actions: ActionType[] = [];
  private get user() {
    return this.$store.state[PREFIX];
  }
  private get iconStyle() {
    return `fontSize:${px2px(36)}`;
  }
  private navagateToHome() {
    this.$router.push({ name: 'home' });
  }
  private created() {
    this.$store.dispatch(actions.getUserInfo);
    this.getTabData();
  }
  private changeTab(type: tabType) {
    this.type = type;
    this.getTabData();
  }
  private getTabData() {
    let cancelLoading = this.$loading();
    getUserActions({ type: this.type })
      .then(
        ({
          events,
          has_more,
        }: {
          events: ActionType[];
          has_more: boolean;
        }) => {
          this.actions = [...events];
          cancelLoading();
        },
      )
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

.me {
  padding-top: 80px;
  background: #fafafa;
  height: 100%;
  box-sizing: border-box;
}
.info {
  padding: 72px 0 48px;
  background: #ffffff;
  text-align: center;
}
.avator {
  width: 144px;
  height: 144px;
  border: 8px solid $topBarBgColor;
  border-radius: 50%;
}
.name {
  @include px2px(font-size,48);
  color: #67616d;
  margin-top: 48px;
  line-height: 62px;
}
.email {
  @include px2px(font-size,28);
  color: $topBarBgColor;
  margin-top: 16px;
  line-height: 36px;
  span {
    margin-left: 12px;
  }
}
.nav {
  overflow: hidden;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  @include px2px(font-size,24);
  color: #8c8c8c;
  background: #ffffff;
  text-align: center;
}
.item {
  width: 33.3333%;
  float: left;
  padding: 32px 0;
  position: relative;
  span {
    margin-left: 12px;
  }
  &.active {
    color: #aecb4f;
  }
  &:after {
    content: '';
    position: absolute;
    top: 32px;
    bottom: 32px;
    width: 1px;
    right: 0;
    background: #e8e8e8;
  }
  &:last-child::after {
    content: none;
  }
}
</style>
