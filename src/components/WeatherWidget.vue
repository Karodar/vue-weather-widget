<template>
  <div v-if="!info">Loading...</div>
  <article v-else class="weather-widget">
    <button class="weather-widget__controls">
      <GearIcon />
    </button>
    <b>{{ countryTitle }}</b>
    <figure class="weather-widget__display">
      <img alt="weather-icon" width="32" v-bind="imageAttrs" />
      <figcaption>7&#176; C</figcaption>
    </figure>
    <p>{{ summaryMessage }}</p>
    <p>
      <span><GeoIcon />{{ windSpeed }}m/s SSE</span>
      <span>{{ pressureMeasure }}hPa</span>
    </p>
    <ul>
      <li><span>Humidity:</span> 97%</li>
      <li><span>Dew point:</span>0&#176; C</li>
      <li><span>Visibility:</span>10.0km</li>
    </ul>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import GeoIcon from '@/assets/geo.svg'
import GearIcon from '@/assets/gear.svg'
import { capitalizeFirstLetter, getQueryString } from '@/utils/serialize'
import { WeatherData } from '@/types/weather.inerface'
import { ImgHTMLAttributes } from 'vue/types/jsx'

const API_URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_ICON_URL = 'http://openweathermap.org/img/wn/'
const API_KEY = '330562b28e64c4226fd8313f35896944'

interface IData {
  info: null | WeatherData
}

export default Vue.extend({
  name: 'weather-widget',
  components: {
    GeoIcon,
    GearIcon,
  },
  data(): IData {
    return {
      info: null,
    }
  },
  computed: {
    imageAttrs(): ImgHTMLAttributes {
      const icon = this.info?.weather[0]?.icon
      const srcset = [
        `${API_ICON_URL}${icon}.png`,
        // `${API_ICON_URL}${weather[0].icon}@2x.png`,
        // `${API_ICON_URL}${weather[0].icon}@3x.png`,
      ]

      return { src: srcset[0], srcset: srcset.join(' ') }
    },
    countryTitle(): string {
      const cityName = this.info?.name
      const countryCode = this.info?.sys?.country

      return `${cityName}, ${countryCode}`
    },
    summaryMessage(): string {
      const feelsMessage = `Feels like ${Math.floor(
        Number(this.info?.main?.feels_like)
      )}.`
      const weatherMessage = capitalizeFirstLetter(
        this.info?.weather[0]?.description as string
      )

      return [feelsMessage, weatherMessage].join('. ')
    },
    windSpeed(): number {
      return Number(this.info?.wind?.speed)
    },
    pressureMeasure(): number {
      return Number(this.info?.main?.pressure)
    },
  },
  methods: {
    async fetchData(): Promise<void> {
      const locale = (navigator?.language).split('-')[0]
      const params = {
        appid: API_KEY,
        lang: locale,
        lat: '33.23',
        lon: '42.5',
        units: 'metric',
      }
      const fetched = await fetch(API_URL + getQueryString(params))
      this.info = await fetched.json()
    },
  },
  async mounted() {
    await this.fetchData()
    console.log('DATA::', this.info)
  },
})
</script>

<style lang="scss" scoped>
.weather-widget {
}
</style>
