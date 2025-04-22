<template>
  <div class="select-input">
    <!-- TODO: Add click event on label to trigger select opening -->
    <label class="select-input__label">
      {{ label}}
    </label>
    <VueSelect
      class="custom-select"
      v-model="selected"
      :options="options"
      @option-selected="selectEvent"
      @option-deselected="deselectEvent"
      placeholder="Select an option"
    >
      <template #no-options>
        <slot name="no-options" />
      </template>
    </VueSelect>
  </div>
</template>
<script setup lang="ts">
import VueSelect, { type Option } from 'vue3-select-component'
import { type PropType, ref } from 'vue'

defineOptions({
  name: 'SelectInput',
})

const emit = defineEmits(['update:model-value', 'invalid:inputValue'])

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, null] as PropType<string | null>,
    default: null,
  },
  options: {
    type: Array as PropType<Option<string | null>[]>,
    required: true,
  },
})

const selected = ref(props.modelValue)

const selectEvent = (option: Option<string | null>) => {
  emit('update:model-value', option.value)
}

const deselectEvent = () => {
  emit('update:model-value', null)
}
</script>
<style src="./index.scss" lang="scss"></style>
