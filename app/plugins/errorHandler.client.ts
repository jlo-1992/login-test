// export default defineNuxtPlugin(() => {
//   const fetch = globalThis.$fetch
//   globalThis.$fetch = fetch.create({
//     onResponseError({ response }) {
//       if (response.status === 401) {
//         navigateTo('/login')
//       }
//     },
//   })
// })
