import { appendResponseHeader } from 'h3'
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
  // Ignore if no tokens
  if (!session.value?.token) return

  const serverEvent = useRequestEvent()
  const runtimeConfig = useRuntimeConfig()
  const { accessToken_time, refreshToken_time } = session.value.token

  // 如果兩個 token 都過期，直接登出
  if (isExpired(accessToken_time) && isExpired(refreshToken_time)) {
    console.info('both tokens expired, clearing session')
    await clear()
    return navigateTo('/login')
  }

  // 只有 access token 過期，更新 token
  else if (isExpired(accessToken_time)) {
    console.info('access token expired, refreshing')
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
