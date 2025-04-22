<template>
  <div class="driver-editor-form">
    <TextInput v-model="store.draftDriver.name"
               label="Name"
    />
    <TextInput v-model="store.draftDriver.location"
               @invalid:input-value="validateDriverLocation"
               label="Location"
               only-letters
    />

    <div class="driver-editor-form__bottom">
      <MyButton mode="danger"
                class="driver-editor-form__button"
                @click="cancel"
      >
        Cancel
      </MyButton>
      <MyButton mode="success"
                class="driver-editor-form__button"
                @click="saveDriver"
                :disabled="formIsInvalid"
      >
        Save
      </MyButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDriversStore } from '@/stores/drivers.ts'
import TextInput from '@/components/TextInput/index.vue'
import MyButton from '@/components/Button/index.vue'

defineOptions({
  name: 'DriverEditorForm',
})

const store = useDriversStore()

const formIsInvalid = ref(false)

const allFormFieldsFilled = computed<boolean>(() => {
  return (
    store.draftDriver.name.trim() !== '' &&
    store.draftDriver.location.trim() !== '')
})

function saveDriver() {
  if (allFormFieldsFilled.value) {
    if (store.isEditMode) {
      store.updateDriver()
    } else {
      store.addDriver()
    }

    store.closeDriverForm()
  }
}

function cancel() {
  store.closeDriverForm()
}




function validateDriverLocation(locationIsValid: boolean) {
  formIsInvalid.value = locationIsValid
}
</script>

<style src="./index.scss" lang="scss" />
