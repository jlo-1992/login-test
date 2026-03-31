export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession()

  if (!loggedIn.value) {
    return navigateTo(`/login?redirectedFrom=${to.fullPath}`)
  }

  // const allowRoles=to.meta.middleware
})
