const colors = require("vuetify/es5/util/colors").default;

module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  // server: {
  //   port: 8000 // デフォルト: 3000
  // },
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    // title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  // plugins: ["@plugins/vuetify"],
  plugins: [{ src: "@plugins/vuetify", ssr: false }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "nuxt-svg-loader"],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        light: {
          header: "#51bdc7",
          link: "#1976d2"
        },
        dark: {
          header: colors.grey.darken3,
          link: "#91ceff"
        }
      },
      options: {
        customProperties: true
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
