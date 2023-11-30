import compression from 'vite-plugin-compression2'

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
  runtimeConfig: {
    notion: {
      apiSecret: process.env.NOTION_API_SECRET,
      version: process.env.NOTION_API_SECRET,
      noticeDatabaseId: process.env.NOTION_NOTICE_DATABASE_ID,
      noticeCacheDir: process.env.NOTION_NOTICE_CACHE_DIR,
      newsDatabaseId: process.env.NOTION_NEWS_DATABASE_ID,
      newsCacheDir: process.env.NOTION_NEWS_CACHE_DIR,
      pdsDatabaseId: process.env.NOTION_PDS_DATABASE_ID,
      pdsCacheDir: process.env.NOTION_PDS_CACHE_DIR,
      askDatabaseId: process.env.NOTION_ASK_DATABASE_ID,
    },
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

        const newsPage = communityPage.children.find(p => p.name === 'community-news')
        if (newsPage && newsPage.children.length === 1) {
          newsPage.children[0].path = 'news/:id()'
          communityPage.children.push(newsPage.children[0])
          newsPage.children.splice(0, 1)
        }
      }

      const inquiryPage = pages.find(p => p.name === 'inquiry')
      if (inquiryPage) {
        const pdsPage = inquiryPage.children.find(p => p.name === 'inquiry-pds')
        if (pdsPage && pdsPage.children.length === 1) {
          pdsPage.children[0].path = 'pds/:id()'
          inquiryPage.children.push(pdsPage.children[0])
          pdsPage.children.splice(0, 1)
        }
      }
    },
    'vite:extendConfig'(config) {
      config.plugins.push(
        compression({
          include: [/\.(js)$/, /\.(css)$/],
          threshold: 1400,
        }),
      )
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      meta: [{ name: 'viewport', content: 'width=1300,user-scalable=yes' }],
      title: '(주) 프런티어',
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
