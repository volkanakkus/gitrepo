export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'github-cards',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      },
    ],
    script: [{ src: 'https://buttons.github.io/buttons.js', defer: true }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  publicRuntimeConfig: {
    APIKEY: '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',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '@/plugins/hashids.js' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: '~/components', // will get any components nested in let's say /components/test too
      pathPrefix: false,
    },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },

  proxy: {
    '/github/': {
      target: 'https://api.github.com/',

      pathRewrite: { '^/github/': '' },
    },
    changeOrigin: true,
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
