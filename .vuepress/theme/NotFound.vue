<template>
  <div class="theme-container">
    <header class="header gradientOverlay">
      <img class="image" src="/aluminium-spider/assets/deadLink.gif" alt="Dead Link">
      <h1 class="title">404</h1>
      <p class="tagline">{{ getMsg() }}</p>
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
