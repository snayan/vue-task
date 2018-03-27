<template>
  <div class="empty" :style="emptyStyle">
    <app-icon link="#icon-notfound" :iconStyle="iconStyle"/>
    <p>{{tip}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AppIcon from '@/components/AppIcon.vue';
import px2px from '@/util/px2px';

@Component({
  components: {
    AppIcon,
  },
})
export default class Empty extends Vue {
  @Prop({default: 'No result found'}) private tip!: string;
  @Prop([Object, String]) private emptyStyle!: null;
  private get iconStyle() {
    return {
      fontSize: px2px(120),
      color: '#D3C1E5',
    };
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/_px2px.scss';
.empty {
  text-align: center;
  @include px2px(font-size,28);
  color: #bababa;
  margin-top: 156px;
  p {
    margin-top: 28px;
  }
}
</style>
