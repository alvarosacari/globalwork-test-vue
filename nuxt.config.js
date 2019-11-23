import colors from 'vuetify/lib/util/colors'
import en from 'vuetify/lib/locale/en'
import es from 'vuetify/lib/locale/es'

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/transition-page.scss',
    '~/assets/scss/sweetalert.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/snackbar.js',
    '~/plugins/api.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'vue-sweetalert2/nuxt'
  ],

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'https://globalwork-test-api.herokuapp.com/api'
  },

  router: {
    base: process.env.DEPLOY_ENV === 'GH_PAGES' ? '/globalwork-test-vue/' : ''
  },

  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.blue,
          accent: colors.amber,
          secondary: colors.blue.darken1,
          success: colors.green,
          info: colors.lightBlue,
          warning: colors.amber,
          error: colors.red
        },
        dark: {
          primary: colors.blue,
          accent: colors.amber,
          secondary: colors.blue.lighten1,
          success: colors.green,
          info: colors.lightBlue,
          warning: colors.amber,
          error: colors.red
        }
      }
    },
    lang: {
      locales: { es, en },
      current: 'es'
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
