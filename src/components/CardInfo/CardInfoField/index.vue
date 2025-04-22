<template>
  <div class="card-info-field">
    <dt class="card-info-field__term">{{ term }}:</dt>
    <dd class="card-info-field__definition">{{ normalizedDefinition }}</dd>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'

defineOptions({
  name: 'CardInfoField',
})

const props = defineProps({
  term: {
    type: String,
    required: true,
  },
  definition: {
    type: [String, null] as PropType<string | null>,
    required: true,
  },
})

const normalizedDefinition = computed(() => {
  return props.definition?.trim() ? props.definition : 'n/a';
})
</script>

<style src="./index.scss" lang="scss" />
