<script setup lang="ts"></script>
<template>
  <div>
    <div class="mt-2 flex justify-center gap-x-3">
      <NuxtLink class="button" to="/">回首頁</NuxtLink>
      <NuxtLink class="button" to="/guest-only">訪客專屬頁</NuxtLink>
      <NuxtLink class="button" to="/member-one">會員一</NuxtLink>
      <NuxtLink class="button" to="/member-two">會員二</NuxtLink>
      <NuxtLink class="button" to="/login">登入</NuxtLink>
    </div>
    <slot />
  </div>
</template>

<style scoped>
@reference '~/assets/css/main.css';
.button {
  @apply rounded-md bg-amber-500 p-1 px-2.5;
}
</style>
