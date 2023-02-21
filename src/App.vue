<template>
  <div id="app">
    <WeatherWidget />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import WeatherWidget from './components/WeatherWidget.vue'

export default Vue.extend({
  name: 'App',
  components: {
    WeatherWidget,
  },
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
