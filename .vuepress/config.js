module.exports = {
  base: '/aluminium-spider/',
  title: 'Aluminium Spider',
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
