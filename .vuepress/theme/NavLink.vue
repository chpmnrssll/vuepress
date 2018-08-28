<template>
  <router-link v-if="!isExternal(url)" class="nav-link" :to="url" :exact="exact">
    <slot></slot>
  </router-link>
  <a v-else
    class="nav-link external"
    :href="url"
    :target="isMailto(url) || isTel(url) ? null : '_blank'"
    :rel="isMailto(url) || isTel(url) ? null : 'noopener noreferrer'">
    <slot></slot>
    <OutboundLink/>
  </a>
</template>

<script>
import { isExternal, isMailto, isTel, ensureExt } from "./util";

export default {
  props: {
    url: {
      required: true
    }
  },
  computed: {
    link() {
      return ensureExt(this.url);
    },
    exact() {
      if (this.$site.locales) {
        return Object.keys(this.$site.locales).some(
          rootLink => rootLink === this.link
        );
      }
      return this.link === "/";
    }
  },
  methods: {
    isExternal,
    isMailto,
    isTel
  }
};
</script>
