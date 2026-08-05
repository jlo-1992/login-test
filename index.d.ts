declare module 'nuxt/schema' {
  interface RuntimeConfig {
    // api url
    apiUrl: string
    // keys
    credentialClientId: string
    credentialClientSecret: string
    credentialAccessToken: string
    passwordClientId: string
    passwordClientSecret: string
    appleClientId: string
    appleClientSecret: string
    facebookClientId: string
    facebookClientSecret: string
    googleClientId: string
    googleClientSecret: string
  }
  interface PublicRuntimeConfig {
    appUrl: string
    mirrorfictionUrl: string
  }
}
// It is always important to ensure you import/export something when augmenting a type
export {}
