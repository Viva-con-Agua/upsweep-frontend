<template>
  <div id="app">
    <UpsweepView poolEventId="test"></UpsweepView>
  </div>
</template>

<script>
/* eslint-disable */

import VcABox from './components/VcABox.vue'
import VcAColumn from './components/VcAColumn.vue'
import VcAFrame from './components/VcAFrame.vue'
import VcAInfoBox from './components/VcAInfoBox.vue'
import UpsweepView from './components/UpsweepView'

export default {
  name: 'app',
  components: {
    UpsweepView
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
