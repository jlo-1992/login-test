// 打 api 前的憑證檢查
import { isExpired } from '#shared/utils/auth.ts'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  if (!session) {
    throw createError({ status: 401, statusMessage: 'invalid credential' })
  }

  // 如果兩個憑證都過期，直接登出
  if (
    isExpired(session.token?.accessToken_time) &&
    isExpired(session.token?.refreshToken_time)
  ) {
    clearUserSession(event)
  }
})
