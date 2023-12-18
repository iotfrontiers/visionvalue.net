import serveStatic from 'serve-static'

export default defineNitroPlugin(nitro => {
  // nitro.h3App.stack.unshift({
  //   route: '/notion-resources',
  //   handler: fromNodeMiddleware(serveStatic(getNotionResourcePath())),
  // })
})
