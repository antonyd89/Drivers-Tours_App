<template>
  <button
    type="button"
    class="btn"
    :class="{
      [`btn--${mode}`]: mode,
      'btn--disabled': disabled,
      'btn--icon': icon,
    }"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

defineOptions({
  name: 'MyButton',
})

export type ModeType = '' | 'success' | 'warning' | 'danger'

defineProps({
  mode: {
    type: String as PropType<ModeType>,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" src="./index.scss" />
