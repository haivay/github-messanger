<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isAuthorized: false,
      user: {
        name: '',
      }
    }
  },
  methods: {
    logIn() {
      this.user.name = 'Haivay'
      this.isAuthorized = true;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
