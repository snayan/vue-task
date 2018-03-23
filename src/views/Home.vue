<template>
  <div class="home">
    <top-nav left="#icon-search"  right="#icon-caidan08" />
    <action />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TopNav from '@/components/TopNav.vue';
import Action from '@/components/Action.vue';

@Component({
  components: {
    TopNav,
    Action,
  },
})
export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
.home {
  padding-top: 80px;
}
</style>

