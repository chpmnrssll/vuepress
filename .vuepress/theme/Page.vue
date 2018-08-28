<template>
  <div class="page">
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
    <Content :custom="false"/>
    <slot name="bottom"/>
    <footer class="footer">
      <div class="meta">
        <span class="tags" v-if="this.$page.frontmatter.tags">
          <span>Tags: </span>
          <span v-for="tag in this.$page.frontmatter.tags">{{ tag }}</span>
        </span>
        <span class="lastUpdated" v-if="this.$page.frontmatter.lastUpdated">
          <span class="prefix">{{ lastUpdatedText }}: </span>
          <span class="time">{{ lastUpdated }}</span>
        </span>
      </div>
      <div class="text">{{ this.$site.themeConfig.footer }}</div>
    </footer>
  </div>
</template>

<script>
import { resolvePage, normalize, outboundRE, endingSlashRE } from "./util";

export default {
  props: ["sidebarItems"],
  computed: {
    lastUpdated () {
      if (this.$page.frontmatter.lastUpdated) {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(this.$page.frontmatter.lastUpdated).toLocaleString(this.$lang, options);
      }
    },
    lastUpdatedText () {
      if (typeof this.$themeLocaleConfig.lastUpdated === "string") {
        return this.$themeLocaleConfig.lastUpdated;
      }
      if (typeof this.$site.themeConfig.lastUpdated === "string") {
        return this.$site.themeConfig.lastUpdated;
      }
      return "Last Updated";
    },
    prev () {
      const prev = this.$page.frontmatter.prev;
      if (prev === false) {
        return;
      } else if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path);
      } else {
        return resolvePrev(this.$page, this.sidebarItems);
      }
    },
    next () {
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

  methods: {
  }
};

function resolvePrev (page, items) {
  return find(page, items, -1);
}

function resolveNext (page, items) {
  return find(page, items, 1);
}

function find (page, items, offset) {
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

<style lang="stylus">
@import './styles/config.styl'
@require './styles/wrapper.styl'

.page
  padding-bottom 1rem

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
    .prefix
      color lighten($textColor, 25%)
      font-weight 500
    .time
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
