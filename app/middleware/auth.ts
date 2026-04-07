export default defineNuxtRouteMiddleware(() => {
  const { loggedIn } = useUserSession()

  // 沒有登入就導向登入頁面
  if (!loggedIn.value) {
    if (import.meta.client) {
      const toast = useToast()
      toast.add({ description: '連線逾時，請重新登入' })
    }
    return navigateTo('/login')
  }
})
