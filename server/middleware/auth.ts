import { isExpired } from "#shared/utils/auth";

export default defineEventHandler(async (event) => {
  // 一定要加 await 不然無法取得資料
  const session = await getUserSession(event);

  if (session) {
    if (
      // 如果兩種 token 都過期就清空 session 裡的 user 資料
      session.token &&
      isExpired(session.token?.accessToken_expiredAt) &&
      isExpired(session.token?.refreshToken_expiredAt)
    ) {
      await clearUserSession(event);
    } else if (
      session.token &&
      isExpired(session.token?.accessToken_expiredAt)
    ) {
      await clearUserSession(event);
    }
  }
});
