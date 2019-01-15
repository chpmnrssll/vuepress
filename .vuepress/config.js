module.exports = {
  base: '/vuepress/',
  title: 'VuePress Portfolio Site',
  description: 'VuePress + Github Pages',
  evergreen: true,
  // markdown: {},
  themeConfig: {
    footer: 'Copyright © 2018-present Russell Chapman',
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about/' },
      { text: 'Portfolio', link: '/portfolio/' }
    ],
    serviceWorker: {
      updatePopup: true
    },
    sidebar: [
      '/',
      '/about/',
      '/portfolio/'
    ]
  }
}
