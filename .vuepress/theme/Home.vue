<template>
  <div class="home">
    <!-- <header class="header">
      <section class="background">
        <video class="hero lazyLoad" v-if="this.$page.frontmatter.hero"
          :data-src="$withBase(this.$page.frontmatter.hero)"
          :poster="$withBase(this.$page.frontmatter.poster)"
          :alt="this.$page.frontmatter.altText"
          autoplay loop muted playsinline>
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
    </header> -->
    <main>
      <div class="features">
        <NavLink class="feature header" v-for="page in this.$site.pages.filter(page => page.frontmatter.layout === 'page').filter(page => page.frontmatter.tags.includes('Featured'))" :key="page.key" :url="page.path">
          <section class="background">
            <video class="lazyLoad" v-if="page.frontmatter.hero"
              :data-src="$withBase(page.frontmatter.hero)"
              :poster="$withBase(page.frontmatter.poster)"
              :alt="page.frontmatter.altText"
              autoplay loop muted playsinline>
            </video>
            <img class="lazyLoad" v-else-if="page.frontmatter.image"
              :data-src="$withBase(page.frontmatter.image)"
              :alt="page.frontmatter.altText">
          </section>
          <section class="foreground">
            <h2 class="title">{{ page.title }}</h2>
            <div class="tagline">{{ page.frontmatter.tagline }}</div>
            <div class="excerpt" v-html="page.excerpt"/>
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
import NavLink from "./NavLink.vue";
import { LazyLoader } from "./LazyLoader";

export default {
  components: { NavLink },
  computed: {
    actionLink() {
      return {
        link: this.$page.frontmatter.actionLink,
        text: this.$page.frontmatter.actionText
      };
    }
  },
  mounted() {
    const loader = new LazyLoader();
    loader.watch();
  }
};
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
    box-shadow -1px 2px 8px darken(saturate($primaryColor, 40%), 60%)
    height 0
    padding-top 56.25%
    position relative
    min-width 100%

    &::before
      background radial-gradient(circle at top right, $color-gradient-start, $color-gradient-end)

    &::after
      background radial-gradient(circle at top right, rgba(255, 255, 255, .95), rgba(255, 255, 255, .35))

    .background
      height 100%

    .foreground
      .title
        border-bottom 1px solid lighten(desaturate($secondaryColor, 20%), 40%)
        // font-size 1.25rem
      .tagline
        // font-size .75rem
      .excerpt
        color darken(saturate($primaryColor, 30%), 50%)
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
