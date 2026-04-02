<script setup lang="ts">
definePageMeta({
  middleware: 'guest',
})
</script>

<template>
  <div class="flex h-150 flex-col items-center justify-center gap-y-3">
    <div>訪客專屬頁面</div>
    <UButton to="/">回首頁</UButton>
  </div>
</template>
