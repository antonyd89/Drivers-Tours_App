<template>
  <div class="container not-found-page">
    <div class="container">
      <h1>Sorry,but the page you're looking for doesn't exist.</h1>
      <p>Please, go back to the <RouterLink to="/">Home</RouterLink> page</p>
    </div>
  </div>
</template>
<style scoped lang="scss">
@media (min-width: 1024px) {
  .not-found-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
