// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  modules: ['@invictus.codes/nuxt-vuetify', 'nuxt-swiper'],
  // spaLoadingTemplate: true,
  routeRules: {
    '/**': { ssr: false },
  },
  typescript: {
    strict: false,
  },
  hooks: {
    'pages:extend'(pages) {
      const communityPage = pages.find(p => p.name === 'community')
      if (communityPage) {
        const noticePage = communityPage.children.find(p => p.name === 'community-notice')
        if (noticePage && noticePage.children.length === 1) {
          noticePage.children[0].path = 'notice/:id()'
          communityPage.children.push(noticePage.children[0])
          noticePage.children.splice(0, 1)
        }
      }

      console.warn('pages', pages)
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      meta: [{ name: 'viewport', content: 'width=1300,user-scalable=yes' }],
    },
  },
  vuetify: {
    moduleOptions: {
      // styles: {
      //   configFile: '~/assets/main.scss',
      // },
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: 'dark',
      },
    },
  },
})
