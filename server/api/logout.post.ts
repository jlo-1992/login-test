export default defineEventHandler(async (event) => {
  const session = getUserSession(event)

  // 沒有使用者資料
  if (!session) return

  // 清除 session 裡的使用者資料
  await clearUserSession(event)

  setResponseStatus(event, 204)
  return send(event, null)
})
