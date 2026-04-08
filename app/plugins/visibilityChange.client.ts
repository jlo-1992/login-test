export default defineNuxtPlugin(() => {
  const isVisible = ref(true)

  document.addEventListener('visibilitychange', async () => {
    isVisible.value = document.visibilityState === 'visible'
    const { fetch } = useUserSession()
    // 切換分頁自動登入與登出
    if (isVisible.value) {
      await $fetch('/api/me')
        .then(fetch)
        .catch(() => {
          reloadNuxtApp()
        })
    }

    // 只有自動登出
    // if ((loggedIn.value, isVisible.value)) {
    //   await $fetch('/api/me')
    //     .then(fetch)
    //     .catch(() => {
    //       reloadNuxtApp()
    //     })
    // }

    // 只有自動登入
    // if (!loggedIn.value && isVisible.value) {
    //   await $fetch('/api/me')
    //     .then(fetch)
    //     .catch(() => {
    //       reloadNuxtApp()
    //     })
    // }
  })
})
