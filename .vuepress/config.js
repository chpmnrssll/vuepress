module.exports = {
  base: '/aluminum-spider/',
  title: 'Aluminum Spider',
  description: 'VuePress + Github Pages',
  evergreen: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about/' },
      { text: 'Exterminate', link: '/exterminate/' }
    ],
    sidebar: [
      '/',
      '/about/',
      '/exterminate/'
    ]
  }
}
