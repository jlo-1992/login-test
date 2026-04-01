import { getExpiredAt } from '#shared/utils/auth'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  if (!session.token?.accessToken && !session.token?.refreshToken) {
    throw createError({ status: 401, statusText: 'Unauthorized' })
  }

  if (session && session.user) {
    const user = session.user

    // 假的 token
    const token = {
      access_token: `access-token-${user.name}`,
      expires_in: 3000,
      refresh_token: `refresh-token-${user.name}-${Math.random()}`,
    }

    // 把更新的資料傳入 session
    await setUserSession(event, {
      user: { ...user },
      token: {
        accessToken: token.access_token,
        accessToken_expiredAt: getExpiredAt(token.expires_in),
        refreshToken: token.refresh_token,
        refreshToken_expiredAt: getExpiredAt(token.expires_in * 2),
      },
      loggedInAt: session.loggedInAt,
    })

    setResponseStatus(event, 204)
    return send(event, null)
  } else {
    // 失敗的話直接登出
    clearUserSession(event)
    setResponseStatus(event, 401)
    return send(event, null)
  }
})
