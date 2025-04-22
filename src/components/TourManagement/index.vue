<template>
   <div class="tour-management">
     <div class="tour-management__actions">
       <MyButton @click="store.openTourForm()" :mode="'success'">Add new tour</MyButton>
     </div>
     <h2 class="h3">List of available tours:</h2>
     <ToursList :tours="store.tours"></ToursList>
     <ModalWindow v-if="store.isTourFormOpened" @close="store.closeTourForm()">
       <template v-slot:header>
         <h3>
           <template v-if="store.isEditMode">
             Edit tour
           </template>
           <template v-else>
             Add new tour
           </template>
         </h3>
       </template>
       <template v-slot:body>
         <TourEditorForm />
       </template>
     </ModalWindow>
   </div>

</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useToursStore } from '@/stores/tours.ts'
import ToursList from '@/components/ToursList/index.vue'
import TourEditorForm from '@/components/TourEditorForm/index.vue'
import ModalWindow from '@/components/ModalWindow/index.vue'
import MyButton from '@/components/Button/index.vue'

defineOptions({
  name: 'TourManagement',
})

const store = useToursStore()

onMounted(() => {
  store.fetchTours()
})
</script>

<style src="./index.scss" lang="scss" />
