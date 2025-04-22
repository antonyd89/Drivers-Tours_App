<template>
  <div class="text-input">
    <label :for="`text-input-${id}`"
           class="text-input__label"
    >
      {{ label}}
    </label>
    <input
      type="text"
      :id="`text-input-${id}`"
      class="text-input__input"
      :value="prop.modelValue"
      @input="inputValidation($event)"
    />
    <p class="text-input__warning" v-if="inputValueIsInvalid">The input field value must consist of letters only.</p>
  </div>
</template>
<script setup lang="ts">
import { getCurrentInstance,ref } from 'vue'
const emit = defineEmits(['update:model-value', 'invalid:input-value'])
const inputValueIsInvalid = ref(false)

const prop = defineProps({
  id: {
    type: String,
    default() {
      return `id-${getCurrentInstance()!.uid.toString()}`
    },
  },
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  onlyLetters: {
    type: Boolean,
    default: false,
  },
})

const inputValidation = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  if (prop.onlyLetters) {
    // make invalid an input if its value consists of numbers
    inputValueIsInvalid.value = /\p{Number}/gu.test(value)

    // Emit the validation state
    emit('invalid:input-value', inputValueIsInvalid.value)
  }

  emit('update:model-value', value)
}

</script>
