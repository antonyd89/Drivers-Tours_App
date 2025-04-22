<template>
  <nav class="navigation">
    <RouterLink class="navigation__link" to="/">Home</RouterLink>
    <RouterLink class="navigation__link" to="/drivers">Drivers</RouterLink>
    <RouterLink class="navigation__link" to="/tours">Tours</RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style src="./index.scss" lang="scss" />

