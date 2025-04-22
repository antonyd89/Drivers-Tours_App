<template>
  <div class="driver-management">
    <div class="driver-management__actions">
      <MyButton @click="store.openDriverForm()" :mode="'success'">Add new driver</MyButton>
    </div>
    <h2 class="h3">List of available drivers:</h2>
    <DriversList v-if="store.drivers?.length > 0"
                 :drivers="store.drivers"
    />
    <ModalWindow v-if="store.isDriverFormOpened"
                 @close="store.closeDriverForm()"
    >
      <template v-slot:header>
        <h3>
          <template v-if="store.isEditMode">Edit driver</template>
          <template v-else>Add new driver</template>
        </h3>
      </template>
      <template v-slot:body>
        <DriverEditorForm />
      </template>
    </ModalWindow>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDriversStore } from '@/stores/drivers.ts'
import DriversList from '@/components/DriversList/index.vue'
import DriverEditorForm from '@/components/DriverEditorForm/index.vue'
import ModalWindow from '@/components/ModalWindow/index.vue'
import MyButton from '@/components/Button/index.vue'

defineOptions({
  name: 'DriverManagement',
})

const store = useDriversStore()

onMounted(() => {
  store.fetchDrivers()
})
</script>

<style src="./index.scss" lang="scss" />
