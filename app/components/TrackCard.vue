<script lang="ts" setup>
import type { Track } from '#shared/types/track'

// @click="onPlayAsPlaylist(tracks, track)"

defineProps<{ track: Track; tracks: Track[] }>()

const { isTrackPlaying, onPlayAsPlaylist } = useMusicFlow()

</script>

<template>
  <div class="flex size-88 flex-col items-center rounded-md bg-gray-900 p-2">
    <!-- <button class="cursor-pointer hover:text-red-500" type="button">
      {{ isTrackPlaying(track.id) ? 'Pause' : 'Play' }}
    </button> -->
    <div
      class="group relative cursor-pointer"
      @click="onPlayAsPlaylist(tracks, track)"
    >
      <div
        class="absolute flex h-full w-full items-center justify-center rounded-md bg-gray-800 opacity-0 transition-opacity duration-300 group-hover:opacity-80"
      >
        <Icon
          name="material-symbols:play-circle-outline"
          size="70"
          class="text-white"
        ></Icon>
      </div>
      <img :src="track.artwork" :alt="track.title" class="size-71 rounded-md" />
    </div>
    <div class="mt-1 text-[18px] text-white">{{ track.title }}</div>
    <div class="text-[18px] text-gray-500">{{ track.artist }}</div>
  </div>
</template>

<style></style>
