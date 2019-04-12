const pkg = require('./package')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

const configuration = require('./app')

const devMode = process.env.NODE_ENV === 'development'
const prodMode = process.env.NODE_ENV === 'production'
const localMode = process.env.NODE_ENV === 'local'

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: pkg.description}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ],
    script: [
      {src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCShDLpeMA9xrMAL35NNFwitSoAL0QArPc&language=ja&region=JP'}
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {color: '#fff'},

  /*
   ** Global CSS
   */
  css: [
    '~/assets/style/app.styl',
    // SCSS file in the project
    '@/assets/style/scss/main.scss'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/vuetify', '@/plugins/axios', '@/plugins/vuelidate'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/style-resources',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],

  styleResources: {
    // your settings here
    scss: ['./assets/style/scss/_*.scss'] // alternative: scss
  },

  /*
   ** Axios module configuration
   */
  axios: {
    baseURL: prodMode ? configuration.prodBaseUrl : devMode ? configuration.devBaseUrl : configuration.localBaseUrl
  },

  /*
   ** Server config
   */
  server: {
    host: '0.0.0.0' // default: localhost
    // port: 8000, // default: 3000
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    }
  },

  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },

  /*
   ** You can extend webpack config here
   */
  extend(config, ctx) {
    // Doc: https://github.com/mzgoddard/hard-source-webpack-plugin
    const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
    config.plugins.push(new HardSourceWebpackPlugin())
  }
}
