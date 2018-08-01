<template>
  <div id="app">
    <left-nav></left-nav>
    <quick-pos></quick-pos>
  </div>
</template>


<script>
import LeftNav from '@/components/common/LeftNav.vue';
import QuickPos from '@/components/pages/QuickPos.vue';

export default {
  name: 'App',
  components: {
    LeftNav,
    QuickPos,
  },
}
</script>


<style>
#app {
  overflow: hidden;
  height: 100%;
}
</style>
