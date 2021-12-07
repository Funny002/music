<template>
  <test></test>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Test                from './view/Test.vue';

export default defineComponent({
  name: 'App',
  components: {Test}
});
</script>
