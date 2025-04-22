<template>
  <div class="modal-window" role="dialog" aria-modal="true">
    <div class="modal-window__overlay" @click="$emit('close')"></div>
    <div class="modal-window__container">
      <div class="modal-window__content">
        <div class="modal-window__header">
          <slot name="header" />
          <MyButton class="modal-window__close"
                    icon
                    @click="$emit('close')"
          >
            <IconCross/>
          </MyButton>
        </div>
        <div class="modal-window__body">
          <slot name="body" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MyButton from '@/components/Button/index.vue'
import IconCross from '@/components/Icons/IconCross.vue'

defineOptions({
  name: 'ModalWindow',
})

defineEmits(['close'])

</script>

<style src="./index.scss" lang="scss" />
