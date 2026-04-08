<script lang="ts" setup>
const { session, loggedIn } = useUserSession()

const countDown = ref(0)
const tokenTime = computed(() => session.value?.token?.refreshToken_time ?? 0)
let timer: NodeJS.Timeout | null = null

const updateCountDown = () => {
  if (!tokenTime.value) return

  const now = Date.now()
  const timeDifference = Math.floor((tokenTime.value - now) / 1000)

  countDown.value = timeDifference > 0 ? timeDifference : 0

  if (countDown.value <= 0 && timer) {
    clearInterval(timer)
  }
}

onMounted(() => {
  updateCountDown()
  timer = setInterval(updateCountDown, 1000)
})

watch(tokenTime, () => {
  updateCountDown()
})

watch(loggedIn, () => {
  updateCountDown()
  countDown.value = 0
})
</script>

<template>
  <div>
    <ClientOnly>
      <div>{{ countDown }}</div>
    </ClientOnly>
  </div>
</template>

<style scoped></style>
