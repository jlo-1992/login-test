import { appendResponseHeader } from 'h3'
import { isExpired } from '#shared/utils/auth'
import { parse, parseSetCookie, serialize } from 'cookie-es'

export default defineNuxtRouteMiddleware(async () => {
  const nuxtApp = useNuxtApp()

  // Don't run on client hydration when server rendered
  if (
    import.meta.client &&
    nuxtApp.isHydrating &&
    nuxtApp.payload.serverRendered
  )
    return

  const { session, clear, fetch } = useUserSession()

  if (!session.value?.token) return

  const runtimeConfig = useRuntimeConfig()
  const serverEvent = useRequestEvent()

  // 如果access_token跟refresh_token都過期，直接登出
  if (
    isExpired(session.value?.token?.accessToken_expiredAt) &&
    isExpired(session.value?.token?.refreshToken_expiredAt)
  ) {
    console.info('both tokens expired, clearing session')
    await clear()
    return navigateTo('/')
  }

  // 只有 access_token 過期的狀況，更新 token
  if (isExpired(session.value?.token?.accessToken_expiredAt)) {
    // 換新的 refresh token
    console.log('access token expired, refreshing')

    await useRequestFetch()('/api/refresh', {
      method: 'POST',
      onResponse({ response: { headers } }) {
        // Forward the Set-Cookie header to the main server event
        if (import.meta.server && serverEvent) {
          for (const setCookie of headers.getSetCookie()) {
            appendResponseHeader(serverEvent, 'Set-Cookie', setCookie)
            // Update session cookie for next fetch requests
            const { name, value } = parseSetCookie(setCookie)
            if (name === runtimeConfig.session.name) {
              // console.log('updating headers.cookie to', value)
              const cookies = parse(serverEvent.headers.get('cookie') || '')
              // set or overwrite existing cookie
              cookies[name] = value
              // update cookie event header for future requests
              serverEvent.headers.set(
                'cookie',
                Object.entries(cookies)
                  .map(([name, value]) => serialize(name, value))
                  .join('; '),
              )
              // Also apply to serverEvent.node.req.headers
              if (serverEvent.node?.req?.headers) {
                serverEvent.node.req.headers['cookie'] =
                  serverEvent.headers.get('cookie') || ''
              }
            }
          }
        }
      },
    })
    // refresh the session
    await fetch()
  }
})
