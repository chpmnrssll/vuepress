<template>
  <div class="theme-container">
    <header class="header">
      <section class="background">
        <video class="hero" :poster="$withBase('/assets/backgrounds/deadLinkPoster.jpg')" alt="Dead Link" autoplay loop muted playsinline>
          <source :src="$withBase('/assets/backgrounds/deadLink.mp4')" type="video/mp4">
        </video>
      </section>
      <section class="foreground">
        <h1 class="title">404</h1>
        <div class="tagline">{{ getMsg() }}</div>
      </section>
    </header>
  </div>
</template>

<script>
const msgs = [
  `Something unfortunate has happened.`,
  `It's dangerous to go alone.`,
  `You've found a dead link.`
]

export default {
  methods: {
    getMsg () {
      return msgs[Math.floor(Math.random() * msgs.length)]
    }
  }
}
</script>
