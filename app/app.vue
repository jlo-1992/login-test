<script setup lang="ts">
const toast = useToast()
const route = useRoute()

watch(route, (newVal) => {
  if (newVal.fullPath === '/login') {
    toast.add({ description: '連線逾時，請重新登入' })
  }
})
</script>

<template>
  <UApp :toaster="{ position: 'top-center' }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
