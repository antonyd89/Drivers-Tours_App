<template>
  <div class="tour-list">
    <CardInfo v-for="(tour, index) in tours"
              :key="tour.id + index"
              @edit="editTour(tour.id)"
              @delete="deleteTour(tour.id)"
    >
      <CardInfoField term="Customer Name"
                     :definition="tour.customerName"
      />
      <CardInfoField term="Shipment Date"
                     :definition="tour.shipmentDate"
      />
      <CardInfoField term="Location from"
                     :definition="tour.locationFrom"
      />
      <CardInfoField term="Location to"
                     :definition="tour.locationTo"
      />
      <CardInfoField term="Assigned driver"
                     :definition="tour.assignedDriver ? tour.assignedDriver.name : null"
      />
    </CardInfo>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { useToursStore } from '@/stores/tours.ts'
import type { Tour as TourType } from '@/types/tour.ts'
import CardInfo from '@/components/CardInfo/index.vue'
import CardInfoField from '@/components/CardInfo/CardInfoField/index.vue'

defineOptions({
  name: 'ToursList',
})

const store = useToursStore()

defineProps({
  tours: {
    type: Array as PropType<TourType[]>,
    required: true,
  }
})

const editTour = (tourId: number) => {
  store.openTourForm(tourId)
}

const deleteTour = (tourId: number) => {
  store.deleteTour(tourId)
}
</script>
