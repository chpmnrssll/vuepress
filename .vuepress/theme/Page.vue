<template>
  <div class="page">
    <header class="header">
      <section class="background">
        <video class="hero lazyLoad" v-if="this.$page.frontmatter.hero"
          :data-src="$withBase(this.$page.frontmatter.hero)"
          :poster="$withBase(this.$page.frontmatter.poster)"
          :alt="this.$page.frontmatter.altText"
          autoplay loop muted playsinline>
        </video>
        <img class="hero lazyLoad" v-else-if="this.$page.frontmatter.image"
          :data-src="$withBase(this.$page.frontmatter.image)"
          :alt="this.$page.frontmatter.altText">
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
    <Content :custom="false"/>
    <footer class="footer">
      <div class="meta">
        <span class="lastUpdated" v-if="this.$page.frontmatter.lastUpdated">
          {{ lastUpdated }}
        </span>
        <span class="tags" v-if="this.$page.frontmatter.tags">
          <span>Tags: </span>
          <span v-for="tag in this.$page.frontmatter.tags">{{ tag }}</span>
        </span>
      </div>
      <div class="text">{{ this.$site.themeConfig.footer }}</div>
    </footer>
    <slot name="bottom"/>
  </div>
</template>

<script>
import { resolvePage, normalize, outboundRE, endingSlashRE } from "./util";
import { LazyLoader } from "./LazyLoader";
import { autoplay } from './autoplay'
import mediumZoom from 'medium-zoom';

export default {
  props: ["sidebarItems"],
  computed: {
    lastUpdated() {
      if (this.$page.frontmatter.lastUpdated) {
        var options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        };
        return new Date(this.$page.frontmatter.lastUpdated).toLocaleString(
          this.$lang,
          options
        );
      }
    },
    prev() {
      const prev = this.$page.frontmatter.prev;
      if (prev === false) {
        return;
      } else if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path);
      } else {
        return resolvePrev(this.$page, this.sidebarItems);
      }
    },
    next() {
      const next = this.$page.frontmatter.next;
      if (next === false) {
        return;
      } else if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path);
      } else {
        return resolveNext(this.$page, this.sidebarItems);
      }
    }
  },
  mounted() {
    const loader = new LazyLoader();
    loader.watch();
    // autoplay('.lazyLoad');
    mediumZoom('.thumbnail', {
      background: '#000e'
    });
  }
};

function resolvePrev(page, items) {
  return find(page, items, -1);
}

function resolveNext(page, items) {
  return find(page, items, 1);
}

function find(page, items, offset) {
  const res = [];
  items.forEach(item => {
    if (item.type === "group") {
      res.push(...(item.children || []));
    } else {
      res.push(item);
    }
  });
  for (let i = 0; i < res.length; i++) {
    const cur = res[i];
    if (cur.type === "page" && cur.path === page.path) {
      return res[i + offset];
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './styles/config.styl'
@require './styles/wrapper.styl'

.header
  .background
    img
      filter: blur(3px)

.thumbnail
  height 16vh
  max-width 16vw

.tiny
  height 8vh
  max-width 8vw

.page
  padding-bottom 1rem
  .image-m
    object-fit cover
    margin 1rem
    width 33%
    box-shadow 1px 2px 4px $color-primary-darkest

.page-edit
  @extend $wrapper
  overflow auto
  padding-bottom 1rem
  padding-top 1rem
  .edit-link
    display inline-block
    a
      color lighten($textColor, 25%)
      margin-right 0.25rem
  .last-updated
    float right
    font-size 0.9em
    color #aaa
      font-weight 400

.page-nav
  @extend $wrapper
  padding-bottom 0
  padding-top 1rem
  .inner
    border-top 1px solid $borderColor
    margin-top 0
    min-height 2rem
    overflow auto // clear float
    padding-top 1rem
  .next
    float right

@media (max-width: $MQMobile)
  .page-edit
    .edit-link
      margin-bottom .5rem
    .last-updated
      float none
      font-size .8em
      text-align left
</style>
