module.exports = {
  base: '/aluminium-spider/',
  title: 'Aluminium Spider',
  description: 'VuePress + Github Pages',
  evergreen: true,
  // markdown: {},
  themeConfig: {
    footer: 'Copyright © 2018-present Russell Chapman',
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about/' },
      { text: 'Exterminate', link: '/exterminate/' }
    ],
    serviceWorker: {
      updatPopup: true
    },
    sidebar: [
      '/',
      '/about/',
      '/portfolio/'
    ]
  }
}
