<template>
  <div class="drivers-list">
    <CardInfo
      v-for="(driver, index) in drivers"
      :key="driver.id + index"
      @edit="editDriver(driver.id)"
      @delete="deleteDriver(driver.id)"
    >
      <CardInfoField term="Name" :definition="driver.name" />
      <CardInfoField term="Location" :definition="driver.location" />
    </CardInfo>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { useDriversStore } from '@/stores/drivers.ts'
import type { Driver as DriverType } from '@/types/driver.ts'
import CardInfo from '@/components/CardInfo/index.vue'
import CardInfoField from '@/components/CardInfo/CardInfoField/index.vue'


defineOptions({
  name: 'DriversList',
})

const store = useDriversStore()

defineProps({
  drivers: {
    type: Array as PropType<DriverType[]>,
    required: true,
  }
});

const editDriver = (driverId: number) => {
  store.openDriverForm(driverId)
}

const deleteDriver = (driverId: number) => {
  store.deleteDriver(driverId)
}
</script>

