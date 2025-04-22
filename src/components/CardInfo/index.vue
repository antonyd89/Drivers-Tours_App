<template>
  <div class="card-info">
    <dl class="card-info__body">
      <slot />
    </dl>
    <MyButton v-on:click="deleteCard"
              class="card-info__delete-button"
              mode="danger"
              icon
    >
      <IconRemove />
    </MyButton>
    <MyButton v-on:click="editCard"
              class="card-info__edit-button"
              mode="warning"
              icon
    >
      <IconPencil />
    </MyButton>
  </div>
</template>

<script setup lang="ts">
import MyButton from '@/components/Button/index.vue'
import IconPencil from '@/components/Icons/IconPencil.vue'
import IconRemove from '@/components/Icons/IconRemove.vue'

defineOptions({
  name: 'CardInfo',
})

const emit = defineEmits(['edit', 'delete'])

function editCard() {
  emit('edit')
}

function deleteCard() {
  emit('delete')
}
</script>

<style src="./index.scss" lang="scss" />
