<script setup lang="ts">
import 'vue-music-flow/dist/vue-music-flow.css'
import { MusicFlow } from 'vue-music-flow'
import tracks from '#shared/data/tracks.json'
</script>

<template>
  <div class="mt-20 flex h-screen flex-col items-center gap-y-10 bg-black">
    <div class="mt-10 text-7xl font-black text-white">
      Best albums of all time
    </div>

    <UCarousel
      v-slot="{ item }"
      :items="tracks"
      :ui="{ item: 'basis-1/3' }"
      class="w-270"
    >
      <TrackCard :track="item" :tracks="tracks" />
    </UCarousel>

    <MusicFlow
      :options="{
        autoplay: true,
      }"
    />
  </div>
</template>
