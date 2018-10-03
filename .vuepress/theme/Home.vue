<template>
  <div class="home">
    <header class="header">
      <section class="background">
        <video class="hero" v-if="this.$page.frontmatter.hero" :poster="$withBase(this.$page.frontmatter.poster)" :alt="this.$page.frontmatter.altText" autoplay loop muted playsinline>
          <source :src="$withBase(this.$page.frontmatter.hero)" type="video/mp4">
        </video>
      </section>
      <section class="foreground">
        <h1 class="title" v-if="this.$page.frontmatter.title">
          {{ this.$page.frontmatter.title }}
        </h1>
        <div class="tagline" v-if="this.$page.frontmatter.tagline">
          {{ this.$page.frontmatter.tagline }}
        </div>
      </section>
    </header>
    <main>
      <div class="features">
        <NavLink class="feature" v-for="page in this.$site.pages.filter(page => page.frontmatter.layout === 'page')" :key="page.key" :url="page.path">
          <section class="background">
            <video v-if="page.frontmatter.hero" :poster="$withBase(page.frontmatter.poster)" :alt="page.frontmatter.altText" autoplay loop muted playsinline>
              <source :src="$withBase(page.frontmatter.hero)" type="video/mp4">
            </video>
            <img v-else-if="page.frontmatter.image" :src="$withBase(page.frontmatter.image)" :alt="page.frontmatter.altText">
          </section>
          <section class="foreground">
            <h2 class="title">{{ page.title }}</h2>
            <h3 class="tagline">{{ page.frontmatter.tagline }}</h3>
            <div class="excerpt" v-html="page.excerpt"/>
          </section>
        </NavLink>
        <NavLink class="feature" :url="'/404/'">
          <section class="background">
            <video :poster="$withBase('/assets/backgrounds/deadLinkPoster.jpg')" :alt="'404 Not Found'" autoplay loop muted playsinline>
              <source :src="$withBase('/assets/backgrounds/deadLink.mp4')" type="video/mp4">
            </video>
          </section>
          <section class="foreground">
            <h2 class="title">404</h2>
            <h3 class="tagline">Not Found</h3>
          </section>
        </NavLink>
      </div>
    </main>

    <Content custom/>

    <footer class="footer">
      <div class="text">{{ this.$site.themeConfig.footer }}</div>
    </footer>
  </div>
</template>

<script>
import NavLink from './NavLink.vue'

export default {
  components: { NavLink },
  computed: {
    actionLink () {
      return {
        link: this.$page.frontmatter.actionLink,
        text: this.$page.frontmatter.actionText
      }
    }
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl'

overflow-x hidden
.home
  main
    margin 1rem

  .features
    display grid
    // grid-template-columns repeat(1, 1fr)
    grid-gap 1rem 1rem

  .feature
    box-shadow 1px 2px 8px hsla($primaryColor-h, $primaryColor-s + 30, $primaryColor-l - 40, .5)
    height 0
    padding-top 56.25%
    position relative
    min-width 100%

    &::before
      background radial-gradient(circle at top right, $color-gradient-start, $color-gradient-end)
      content ''
      height 100%
      left 0
      mix-blend-mode color
      opacity .5
      position absolute
      top 0
      width 100%
      z-index -1

    &::after
      background radial-gradient(circle at top right, rgba(255, 255, 255, .95), rgba(255, 255, 255, .35))
      content ''
      height 100%
      left 0
      position absolute
      top 0
      width 100%
      z-index -2

    .background
      height 100%
      left 0
      overflow hidden
      position absolute
      top 0
      width 100%
      z-index -3
      *
        height 100%
        object-fit cover
        width 100%

    .foreground
      display flex
      flex-direction column
      height 100%
      left 0
      position absolute
      top 0
      width 100%
      .title
        border-bottom 1px solid lighten(desaturate($secondaryColor, 20%), 40%)
        color darken(saturate($primaryColor, 30%), 30%)
        font-size 1.25rem
        margin .5rem
        text-align right
        text-shadow 0 0 3px $color-primary-dark, 1px 2px 3px $color-primary-darkest
      .tagline
        color lighten(desaturate($secondaryColor, 20%), 20%)
        font-size .75rem
        font-family 'Teko'
        font-style italic
        font-weight lighter
        margin -.25rem .6rem
        text-align right
        text-shadow 1px 0 3px $color-secondary-dark, 1px 1px 1px $color-secondary-dark
      .excerpt
        color darken(saturate($primaryColor, 30%), 60%)
        margin 0 1rem

// 4k
@media (min-width: $MQDesktop)
  .home
    .features
      grid-template-columns repeat(5, 1fr)

// Dektops
@media (min-width: $MQLaptop) and (max-width: $MQDesktop - 1)
  .home
    .features
      grid-template-columns repeat(4, 1fr)

// Laptops, Desktops
@media (min-width: $MQTabletL) and (max-width: $MQLaptop - 1)
  .home
    .features
      grid-template-columns repeat(3, 1fr)

// Tablets, Ipads (portrait)
@media (min-width: $MQTablet) and (max-width: $MQTabletL - 1)
  .home
    .features
      grid-template-columns repeat(2, 1fr)

// Tablets, Ipads (landscape)
@media (min-width: $MQTablet) and (max-width: $MQTabletL - 1) and (orientation: landscape)
  .home
    .features
      grid-template-columns repeat(2, 1fr)

// Low Resolution Tablets, Mobiles (Landscape)
@media (min-width: $MQMobileL) and (max-width: $MQTablet - 1)
  .home
    .features
      grid-template-columns repeat(2, 1fr)

// Most of the Smartphones Mobiles (Portrait)
@media (min-width: $MQMobile) and (max-width: $MQMobileL - 1)
  .home
    .features
      grid-template-comlumns repeat(1, 1fr)
</style>
