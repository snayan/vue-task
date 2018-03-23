<template>
  <svg class="icon" aria-hidden="true" :style="iconStyle" >
    <use :xlink:href="link" />
  </svg>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class AppIcon extends Vue {
  @Prop() private link!: string;
  @Prop([String, Object]) private iconStyle!: null;
}
</script>

