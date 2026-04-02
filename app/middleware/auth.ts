export default defineNuxtRouteMiddleware(() => {
  const { loggedIn } = useUserSession()

  // 沒有登入就導向登入頁面
  if (!loggedIn.value) {
    navigateTo('/login')
  }
})
