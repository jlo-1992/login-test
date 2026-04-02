// 打 api 前的憑證檢查
import { isExpired } from '#shared/utils/auth.ts'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  // 如果兩個憑證都過期，直接登出
  if (session) {
    if (
      session.token &&
      isExpired(session.token?.accessToken_time) &&
      isExpired(session.token?.refreshToken_time)
    ) {
      await clearUserSession(event)
    } else if (session.token && isExpired(session.token?.accessToken_time)) {
      // 如果只有 access_token 過期，就更新 token
      await setUserSession(event, {
        token: {
          accessToken: `api.accessToken-${session.user?.role}`,
          accessToken_time: expireFromNow(3000),
          refreshToken: `api.refreshToken-${Math.random().toFixed(2)}`,
          refreshToken_time: expireFromNow(6000),
        },
        loggedInAt: Date.now(),
      })
    }
  }
})
