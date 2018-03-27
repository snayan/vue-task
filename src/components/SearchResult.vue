<template>
  <div class="searchResult">
    <p class="result">
      <span>{{count}} Results</span>
      <button @click.stop="clear">CLEAR SEARCH</button>
    </p>
    <p class="filter">Searched for {{tip}}</p>
  </div>
</template>
<script lang="ts">
import { Component, Prop , Vue } from 'vue-property-decorator';
import {PREFIX} from '@/store/modules/list/CONSTANTS';

@Component
export default class SearchResult extends Vue {
  @Prop({required: true, default: false}) private down!: boolean;
  @Prop({required: true, default: ''}) private tip!: string;
  private get count() {
    return this.$store.state[PREFIX].data.length || 0;
  }
  private clear() {
    this.$emit('clear', this.$el.getBoundingClientRect().height);
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/theme.scss';
@import '../scss/_px2px.scss';

.searchResult {
  background: #faf9fc;
  padding: 28px 54px 22px 32px;
}
.result {
  position: relative;
  line-height: 48px;
  span {
    @include px2px(font-size,32);
    color: $topBarBgColor;
    line-height: 40px;
  }
  button {
    position: absolute;
    right: 0;
    top: 50%;
    height: 48px;
    background: $themeMain;
    @include px2px(font-size,20);
    color: #67616d;
    border-radius: 24px;
    transform: translateY(-50%);
    padding: 0 20px;
  }
}
.filter {
  margin-top: 12px;
  @include px2px(font-size,24);
  color: #67616d;
}
</style>


