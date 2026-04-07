<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { data, refresh } = await useFetch('/api/book')
</script>

<template>
  <div class="flex h-150 flex-col items-center justify-center gap-y-3">
    <div>會員專屬頁面</div>
    <UButton to="/">回首頁</UButton>

    <ClientOnly>
      <button class="cursor-pointer" @click="async () => await refresh()">
        換憑證
      </button>
      <div>書代碼 {{ data?.id }}</div>
      <div>書名 {{ data?.title }}</div>
    </ClientOnly>
  </div>
</template>
