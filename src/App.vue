
<template>
  <div class="app-container">
    <Header />
    <main id="main" class="main">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header/index.vue'

defineOptions({
  name: 'App',
})

</script>

<style src="./assets/scss/main.scss" lang="scss"/>
