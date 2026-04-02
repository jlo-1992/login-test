import { expireFromNow } from '#shared/utils/auth.ts'

export default eventHandler(async (event) => {
  // 先確認 session 是否有使用者的資料
  const session = await getUserSession(event)
  if (!session.token) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }

  const token = {
    accessToken: `session.token.accessToken-${session.user?.role}`,
    accessToken_time: expireFromNow(3000),
    refreshToken: `session.token.refreshToken-${Math.random().toFixed(2)}`,
    refreshToken_time: expireFromNow(6000),
  }

  await setUserSession(event, {
    token: {
      accessToken: token.accessToken,
      accessToken_time: token.accessToken_time,
      refreshToken: token.refreshToken,
      refreshToken_time: token.refreshToken_time,
    },
    loggedInAt: Date.now(),
  })
})
