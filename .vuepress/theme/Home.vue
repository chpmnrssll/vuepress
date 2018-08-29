<template>
  <div class="home">
    <header class="header gradientOverlay">
      <img class="image" v-if="this.$page.frontmatter.image"
        :src="$withBase(this.$page.frontmatter.image)"
        :alt="$withBase(this.$page.frontmatter.altText || 'Header Image')">
      <h1 class="title" v-if="this.$page.frontmatter.title">
        {{ this.$page.frontmatter.title }}
      </h1>
      <p class="tagline" v-if="this.$page.frontmatter.tagline">
        {{ this.$page.frontmatter.tagline }}
      </p>
    </header>
    <main>
      <div class="features">
        <NavLink class="feature" v-for="page in this.$site.pages.filter(page => page.frontmatter.layout === 'page')" :key="page.key" :url="page.path">
          <img class="image" :src="$withBase(page.frontmatter.image)" :alt="page.frontmatter.altText">
          <h2>{{ page.title }}</h2>
          <h3>{{ page.frontmatter.tagline }}</h3>
          <div v-html="page.excerpt"/>
        </NavLink>
        <NavLink class="feature" :url="'/404/'">
          <h2>404</h2>
          <p>Error Page</p>
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

.home
  main
    margin 0 2rem
    padding 2rem 0
  .features
    align-content stretch
    align-items flex-start
    display flex
    flex-wrap wrap
    justify-content space-around
  .feature
    box-shadow 1px 2px 8px hsla($color-primary-hue, $color-primary-saturation + 30, $color-primary-lightness - 40, .5)
    flex-basis 30%
    flex-grow 1
    height 30vh
    margin .5rem .2rem
    max-width 30%
    padding .4rem
    position relative
    h2
      color darken(saturate($color-primary, 30%), 30%)
      font-size 1.25rem
      font-weight 500
      margin 0
      padding-bottom 0
    h3
      color lighten(desaturate($color-secondary, 20%), 20%)
      font-size .75rem
      font-weight 500
      margin 0
      padding-bottom 0
    p
      color darken(saturate($color-primary, 60%), 60%)
    &::before
      background radial-gradient(circle at top left, $color-gradient-start, $color-gradient-end)
      content ''
      height 100%
      left 0
      mix-blend-mode color
      opacity .25
      position absolute
      top 0
      width 100%
      z-index -1
    &::after
      background radial-gradient(circle at top left, rgba(255, 255, 255, 1), rgba(255, 255, 255, .5))
      content ''
      height 100%
      left 0
      position absolute
      top 0
      width 100%
      z-index -2
    .image
      left 0
      height 100%
      object-fit cover
      position absolute
      top 0
      width 100%
      z-index -3

@media (max-width: $MQMobile)
  .home
    .features
      flex-direction column
    .feature
      max-width 100%
      padding 0 2.5rem

@media (max-width: $MQMobileNarrow)
  .home
    .feature
      h2
        font-size 1.25rem
</style>
