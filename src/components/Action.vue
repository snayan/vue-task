<template>
  <router-link :to="navagateTo">
      <section class="action">
      <header class="head">
        <img class="avator" :src="item.creator.avatar" />
        <span class="userName">{{item.creator.username}}</span>
        <channel :value="item.channel.name" style="flex:0 0 auto;align-self: flex-end;" />
      </header>
      <div class="info">
        <div class="txt">
          <h2 class="title">{{item.name}}</h2>
          <div class="time">
            <app-icon link="#icon-clock" :iconStyle="clockIconStyle" />
            <p>{{actionTime}}</p>
          </div>
          <p class="content">
            {{item.description}}
          </p>
        </div>
        <div class="img" v-if="item.images && item.images.length">
          <img :src="item.images[0]" />
        </div>
      </div>
      <div class="operation">
        <div class=" item go">
          <app-icon link="#icon-right" :iconStyle="goIconStyle" />
          <span>{{item.me_going?'I am going!':`${item.going_count||0} Going`}}</span>
        </div>
        <div class="item like">
          <app-icon link="#icon-custom-love" :iconStyle="likeIconStyle" />
          <span>{{item.me_likes?'I like it':`${item.likes_count||0} Likes`}}</span>
        </div>
      </div>
    </section>
  </router-link>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AppIcon from '@/components/AppIcon.vue';
import Channel from '@/components/Channel.vue';
import px2px from '@/util/px2px';
import { toLocalString } from '@/util/date';
import { Action } from '@/store/modules/list/list.d.ts';

@Component({
  components: {
    AppIcon,
    Channel,
  },
})
export default class AppAction extends Vue {
  @Prop({ required: true })
  private item!: Action;
  private get userIconStyle() {
    return {
      fontSize: px2px(40),
      flex: '0 0 auto',
    };
  }
  private get clockIconStyle() {
    return {
      fontSize: px2px(24),
      flex: '0 0 auto',
    };
  }
  private get goIconStyle() {
    return {
      fontSize: px2px(24),
      color: this.item.me_going ? '#AECB4F' : '#AC8EC9',
    };
  }
  private get likeIconStyle() {
    return {
      fontSize: px2px(24),
      color: this.item.me_likes ? '#FF5C5C' : '#AC8EC9',
    };
  }
  private get actionTime() {
    return toLocalString(this.item.begin_time) + ' - ' + toLocalString(this.item.end_time);
  }
  private get navagateTo() {
    return '/home/' + this.item.id;
  }
}
</script>
<style lang="scss" scoped>
@import '../scss/theme.scss';
@import '../scss/_px2px.scss';
a {
  text-decoration: none;
}
.action {
  padding: 32px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    left: 32px;
    height: 1px;
    background: #e8e8e8;
  }
}
.head {
  height: 40px;
  display: flex;
  align-items: center;
}
.avator {
  flex: 0 0 auto;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.userName {
  @include px2px(font-size,24);
  line-height: 40px;
  color: #67616d;
  padding-left: 16px;
  flex: 1 1 auto;
}
.info {
  margin-top: 16px;
  display: flex;
}
.txt {
  flex: 1 1 auto;
}
.img {
  flex: 0 0 auto;
  margin-left: 16px;
  & > img {
    width: 128px;
  }
}
.title {
  @include px2px(font-size,36);
  color: $titleColor;
  line-height: 1.2;
}
.time {
  height: 30px;
  display: flex;
  align-items: center;
  color: $timeColor;
  margin-top: 16px;
  & > p {
    flex: 1 1 auto;
    @include px2px(font-size,24);
    margin-left: 10px;
  }
}
.content {
  @include px2px(font-size,28);
  color: $descriptionColor;
  line-height: 1.2;
  margin-top: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.operation {
  margin-top: 24px;
  @include px2px(font-size,24);
  overflow: hidden;
}
.item {
  float: left;
  & > span {
    margin-left: 12px;
  }
}
.like {
  margin-left: 60px;
}
</style>



