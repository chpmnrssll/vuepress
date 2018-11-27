<template>
<div class="theme-container" :class="pageClasses">
  <component v-if="$page.frontmatter.layout" :is="$page.frontmatter.layout" />
  <!-- <div class="custom-layout" v-if="$page.frontmatter.layout">
    <component :is="$page.frontmatter.layout" />
  </div>
  <Home v-else-if="$page.frontmatter.home" />
  <Page v-else>
    <slot name="page-top" slot="top" />
    <slot name="page-bottom" slot="bottom" />
  </Page> -->
</div>
</template>

<script>
import Vue from 'vue';
import Home from './Home.vue';
import Page from './Page.vue';
import Demo from './Demo.vue';
import nprogress from "nprogress";

export default {
  components: {
    Home,
    Page,
    Demo
  },

  computed: {
    pageClasses() {
      return [this.$page.frontmatter.pageClass];
    }
  },

  // data() {
  //   return {
  //     isSidebarOpen: false
  //   };
  // },

  mounted() {
    // configure progress bar
    nprogress.configure({
      showSpinner: false
    });

    this.$router.beforeEach((to, from, next) => {
      // if (to.path !== from.path && !Vue.component(to.name)) {
      //   nprogress.start();
      // }
      nprogress.start();
      next();
    });

    this.$router.afterEach(() => {
      nprogress.done();
    });
  }
};
</script>

<style src="./styles/theme.styl" lang="stylus"></style>
