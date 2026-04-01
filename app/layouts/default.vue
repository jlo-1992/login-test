<script setup lang="ts">
const { loggedIn, clear, user } = useUserSession()

const guest = () => {
  if (loggedIn.value) {
    alert('此為訪客專屬頁面')
  }
}

const logout = async () => {
  await $fetch('/api/logout', {
    method: 'POST',
  })

  await clear()
}
</script>
<template>
  <div>
    <div class="mt-2 flex justify-center gap-x-3">
      <NuxtLink class="button" to="/">回首頁</NuxtLink>
      <NuxtLink class="button" to="/guest-only" @click="guest">
        訪客專屬頁
      </NuxtLink>
      <NuxtLink class="button" to="/member-one">會員一</NuxtLink>
      <NuxtLink class="button" to="/member-two">會員二</NuxtLink>
      <NuxtLink v-if="!loggedIn" class="button" to="/login">登入</NuxtLink>
      <template v-else>
        <UAvatar :src="user?.avatar" />
        <NuxtLink class="button" @click="logout">登出</NuxtLink>
      </template>
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
