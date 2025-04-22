import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getRequest } from '@/utils/getRequest.ts'
import appSettings from '@/config/appSettings'
import type { Tour } from '@/types/tour.ts'
import localStorage from '@/utils/localStorageService.ts'
import type { Driver } from '@/types/driver.ts'

export const useToursStore = defineStore('ToursStore', () => {
  const initialTourState: Tour = {
    id: 0,
    shipmentDate: '',
    customerName: '',
    locationFrom: '',
    locationTo: '',
    assignedDriver: null,
  }

  const tours= ref<Tour[]>([])
  const draftTour = ref<Tour>(structuredClone(initialTourState))

  const isEditMode = ref<boolean>(false)
  const isTourFormOpened = ref<boolean>(false)

  async function fetchTours() {
    const toursFromLocalStorage: Tour[] | null = localStorage.getItem('tours')

    if (toursFromLocalStorage) {
      tours.value = toursFromLocalStorage
      return
    }

    try {
      const result = await getRequest<Tour[]>(appSettings.toursCollectionURL, appSettings.toursCollectionAccessToken);

      if (result) {
        tours.value = result
        localStorage.setItem('tours', result)
      } else {
        tours.value = []
      }

    } catch (error: unknown) {
      console.error("GET tours request failed with an error:", error)
      tours.value = []
    }
  }

  function addTour() {
    if (
      draftTour.value.customerName.trim() !== '' &&
      draftTour.value.shipmentDate.trim() !== '' &&
      draftTour.value.locationFrom.trim() !== '' &&
      draftTour.value.locationTo.trim() !== ''
    ) {
      draftTour.value.id = Date.now()
      tours.value.push(draftTour.value)
      localStorage.setItem('tours', tours.value)
    }
  }

  function deleteTour(tourId: number) {
    const index = tours.value.findIndex((tour) => tour.id === tourId)
    if (index !== -1) {
      tours.value.splice(index, 1)
      localStorage.setItem('tours', tours.value)
    }
  }

  function updateTour() {
    const index = tours.value.findIndex((tour) => tour.id === draftTour.value.id)
    if (index !== -1) {
      tours.value.splice(index, 1, { ...draftTour.value })
      localStorage.setItem('tours', tours.value)
    }
  }

  function openTourForm(tourId?: number) {
    isTourFormOpened.value = true

    // if tourId passed enable edit mode
    if (tourId) {
      isEditMode.value = true

      const index = tours.value.findIndex((tour) => tour.id === tourId)
      if (index !== -1) {
        draftTour.value = { ...tours.value[index] }
      }
    }
  }

  function closeTourForm() {
    isTourFormOpened.value = false
    isEditMode.value = false
    resetDraftTour()
  }

  function resetDraftTour() {
    draftTour.value = structuredClone(initialTourState)
  }

  function assignDriverToDraftTour(driver: Driver) {
    draftTour.value.assignedDriver = driver
  }

  function unassignDriverFromTour() {
    draftTour.value.assignedDriver = null
  }

  return {
    fetchTours,
    tours,
    addTour,
    deleteTour,
    updateTour,
    draftTour,
    isEditMode,
    isTourFormOpened,
    openTourForm,
    closeTourForm,
    assignDriverToDraftTour,
    unassignDriverFromTour
  }
})
