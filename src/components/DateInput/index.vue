<template>
  <div class="text-input">
    <label :for="`text-input-${id}`"
           class="text-input__label"
    >
      {{ label}}
    </label>
    <input
      type="date"
      :id="`text-input-${id}`"
      class="text-input__input"
      :min="today"
      :value="inputValue"
      @input="inputDateValidation($event)"
    />
    <p class="text-input__warning" v-if="inputValueIsInvalid">The date must be in a valid format and not earlier than today.</p>
  </div>
</template>
<script setup lang="ts">
import { getCurrentInstance,ref, watch } from 'vue'
import moment from 'moment'
const emit = defineEmits(['update:model-value', 'invalid:input-value'])
const inputValueIsInvalid = ref(false)
const inputValue = ref<string>()

const today = moment().format('YYYY-MM-DD');

const props = defineProps({
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
})

const normalizeDate = (value: string): string => {
  const parsedValue = moment(value, 'YYYY-MM-DD', true);

  // if value is in 'YYYY-MM-DD' format, return it
  if (parsedValue.isValid()) {
    return value;
  }

  const fallbackParsedValue = moment(value, ['DD.MM.YYYY','DD-MM-YYYY'], true);

  // if value is not in 'YYYY-MM-DD', try to parse it to the 'YYYY-MM-DD' format
  if (fallbackParsedValue.isValid()) {
    return fallbackParsedValue.format('YYYY-MM-DD');
  }

  console.log("value passed to the date input has an unknown format: ", value)
  // if none of the options did not help return ''
  return '';
}

watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    inputValue.value = normalizeDate(newValue)
  } else {
    inputValue.value = '';
  }
}, { immediate: true })

const inputDateValidation = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  // Skip validation if the value is empty
  if (!value) {
    inputValueIsInvalid.value = true;
    return;
  }

  emit('update:model-value', value)

  // Check if the entered date is in the 'YYYY-MM-DD' format
  const parsedDate = moment(value, 'YYYY-MM-DD', true);
  if (!parsedDate.isValid()) {
    inputValueIsInvalid.value = true;

    // Emit the validation state
    emit('invalid:input-value', inputValueIsInvalid.value)
    return;
  }

  // Check if the entered date is not earlier than today
  if (parsedDate.isBefore(today)) {
    inputValueIsInvalid.value = true;

    // Emit the validation state
    emit('invalid:input-value', inputValueIsInvalid.value)
    return;
  }

  inputValueIsInvalid.value = false;
}

</script>
