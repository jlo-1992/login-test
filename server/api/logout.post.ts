export default defineEventHandler(async (event) => {
  const session = getUserSession(event)

  // 沒有 session，表是沒有登入或 token 已經失效
  if (!session) {
    throw createError({ status: 401, statusText: 'invalid credit' })
  }

  // 清掉前端 session
  await clearUserSession(event)

  setResponseStatus(event, 204)

  return send(event, null)
})
