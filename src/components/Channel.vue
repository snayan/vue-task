<template>
  <span class="channel" :style="css">{{value}}</span>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Channel extends Vue {
  @Prop({required: true}) private value!: string;
  @Prop([Object, String]) private css!: string;
}
</script>

<style lang="scss" scoped>
@import '../scss/theme.scss';
@import '../scss/_px2px.scss';

.channel {
  @include px2px(font-size,24);
  border: 1px solid $channelColor;
  border-radius: 20px;
  color: $timeColor;
  height: 40px;
  line-height: 40px;
  max-width: 248px;
  // display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  padding: 0 20px;
}
</style>
