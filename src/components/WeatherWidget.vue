<template>
  <div v-if="!data">Loading...</div>
  <div v-else class="weather-widget">
    <div>Weather's Data</div>
    <img alt="weather-icon" width="32" v-bind="imageAttrs">
  </div>
</template>

<script setup>
const API_URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_ICON_URL = 'http://openweathermap.org/img/wn/'
const API_KEY = '330562b28e64c4226fd8313f35896944'

import {computed, onMounted, ref} from "vue";

const data = ref(null)
const imageAttrs = computed(() => {
  const { weather } = data.value
  const srcset = [
    `${API_ICON_URL}${weather[0].icon}.png`,
    // `${API_ICON_URL}${weather[0].icon}@2x.png`,
    // `${API_ICON_URL}${weather[0].icon}@3x.png`,
  ]

  return { src: srcset[0], srcset }
})

const getQueryString = (params) => {
  return '?' + (new URLSearchParams(params)).toString()
}

onMounted(async () => {
  const locale = (navigator?.language).split('-')[0]
  const params = {
    lat: 33.23,
    lon: 42.5,
    appid: API_KEY,
    lang: locale,
  }
  const fetched = await fetch(API_URL + getQueryString(params))
  data.value = await fetched.json()
  console.log('DATA::', data.value)
})
</script>

<style lang="scss" scoped>
.weather-widget {

}
</style>
