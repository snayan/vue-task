<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PREFIX, actions } from '@/store/modules/user/CONSTANTS';

@Component
export default class App extends Vue {
  private created() {
    let user = this.$store.state[PREFIX];
    if (!user || !user.id) {
      this.$store.dispatch(actions.getUserInfo);
    }
  }
}
</script>

