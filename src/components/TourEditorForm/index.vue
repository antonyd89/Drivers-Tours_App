<template>
  <div class="tour-editor-form">
    <TextInput v-model="toursStore.draftTour.customerName" label="Customer name" />
    <DateInput v-model="toursStore.draftTour.shipmentDate" label="Shipment date" />
    <TextInput
      v-model="toursStore.draftTour.locationFrom"
      @invalid:input-value="validateTourLocation"
      label="Location from"
      only-letters
    />
    <TextInput
      v-model="toursStore.draftTour.locationTo"
      @invalid:input-value="validateTourLocation"
      label="Location to"
      only-letters
    />
    <SelectInput :label="'Assigned driver'" v-model="assignedDriver" :options="drivers">
      <template #no-options>No drivers found for the selected Location From.</template>
    </SelectInput>

    <div class="tour-editor-form__bottom">
      <MyButton mode="danger" @click="toursStore.closeTourForm">Cancel</MyButton>
      <MyButton mode="success" @click="saveTour" :disabled="!allFormFieldsFilled">
        Save Tour
      </MyButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Driver } from '@/types/driver.ts'
import TextInput from '@/components/TextInput/index.vue'
import DateInput from '@/components/DateInput/index.vue'
import SelectInput from '@/components/SelectInput/index.vue'
import MyButton from '@/components/Button/index.vue'
import type { Option } from 'vue3-select-component'
import { useToursStore } from '@/stores/tours.ts'
import { useDriversStore } from '@/stores/drivers.ts'
import debounce from 'lodash.debounce';

defineOptions({
  name: 'TourEditorForm',
})

const toursStore = useToursStore()
const driverStore = useDriversStore()

const oneOfTourLocationsInvalid = ref(false)
const assignedDriver = ref<string | null>(`${toursStore.draftTour.assignedDriver?.id}`)
const drivers = ref<Option<string | null>[]>([])

const getDriversInThisLocation = async (location: string) => {
  if (driverStore.drivers.length === 0) {
    await driverStore.fetchDrivers()

    if (driverStore.drivers.length === 0) {
      drivers.value = []
    }
  }

  drivers.value = driverStore.drivers.reduce(
    (filteredDrivers: Option<string | null>[], driver: Driver) => {
      if (driver.location === location) {
        filteredDrivers.push({ label: driver.name, value: `${driver.id}` })
      }

      return filteredDrivers
    },
    [],
  )
}

const debouncedGetDriversInThisLocation = debounce(async (location: string) => {
  await getDriversInThisLocation(location);
}, 300);

const saveTour = () => {
  if (allFormFieldsFilled.value) {
    if (toursStore.isEditMode) {
      toursStore.updateTour()
    } else {
      toursStore.addTour()
    }

    toursStore.closeTourForm()
  }
}

const validateTourLocation = (locationIsValid: boolean) => {
  oneOfTourLocationsInvalid.value = locationIsValid
}

watch(
  assignedDriver,
  async (newValue) => {
    if (!newValue) {
      toursStore.draftTour.assignedDriver = null
      return
    }

    const driver = drivers.value.find((d) => d.value === newValue)
    if (driver?.value && driver?.label) {
      toursStore.draftTour.assignedDriver = {
        id: Number(driver.value),
        name: driver.label,
        location: toursStore.draftTour.locationFrom,
      }
    }
  },
  { immediate: true, deep: true },
)

watch(
  toursStore.draftTour,
  async ({ locationFrom }) => {
    if (!locationFrom) {
      return []
    }

    debouncedGetDriversInThisLocation(locationFrom)
  },
  { immediate: true, deep: true },
)

watch(drivers, (newValue) => {
  if (newValue.length > 0) {
    assignedDriver.value = `${toursStore.draftTour.assignedDriver?.id}`
  } else {
    assignedDriver.value = ''
  }
})

const allFormFieldsFilled = computed<boolean>(() => {
  return (
    toursStore.draftTour.customerName.trim() !== '' &&
    toursStore.draftTour.shipmentDate.trim() !== '' &&
    toursStore.draftTour.locationFrom.trim() !== '' &&
    toursStore.draftTour.locationTo.trim() !== '' &&
    !oneOfTourLocationsInvalid.value
  )
})
</script>

<style src="./index.scss" lang="scss" />
