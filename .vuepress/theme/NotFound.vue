<template>
  <div class="theme-container">
    <div class="content">
      <h1>404</h1>
      <blockquote>{{ getMsg() }}</blockquote>
      <img src="/aluminium-spider/assets/deadLink.gif" alt="Dead Link">
      <router-link to="/">Home</router-link>
    </div>
  </div>
</template>

<script>
const msgs = [
  `Game Over.`,
  `Not another one.`,
  `Looks like we've got a dead link.`
]

export default {
  methods: {
    getMsg () {
      return msgs[Math.floor(Math.random() * msgs.length)]
    }
  }
}
</script>
