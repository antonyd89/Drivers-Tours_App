import { ref } from 'vue'
import { defineStore } from 'pinia'
import appSettings from '@/config/appSettings'
import { getRequest } from '@/utils/getRequest.ts'
import localStorage from '@/utils/localStorageService.ts'
import type { Driver } from '@/types/driver.ts'

export const useDriversStore = defineStore('DriversStore', () => {

  const initialDriverState: Driver = {
    id: 0,
    name: '',
    location: '',
  }

  const drivers= ref<Driver[]>([])
  const draftDriver = ref<Driver>({ ...initialDriverState })

  const isEditMode = ref<boolean>(false)
  const isDriverFormOpened = ref<boolean>(false)

  async function fetchDrivers() {
    const driversFromLocalStorage: Driver[] | null = localStorage.getItem('drivers')

    if (driversFromLocalStorage) {
      drivers.value = driversFromLocalStorage
      return
    }

    try {
      const result = await getRequest<Driver[]>(appSettings.driversCollectionURL, appSettings.driversCollectionAccessToken);

      if (result) {
        drivers.value = result
        localStorage.setItem('drivers', result)
      } else {
        drivers.value = []
      }

    } catch (error: unknown) {
      console.error("GET drivers request failed with an error:", error)
      drivers.value = []
    }
  }

  function addDriver() {
    if (
      draftDriver.value.name.trim() !== '' &&
      draftDriver.value.location.trim() !== ''
    ) {
      draftDriver.value.id = Date.now()
      drivers.value.push(draftDriver.value)
      localStorage.setItem('drivers', drivers.value)
    }
  }

  function deleteDriver(driverId: number) {
    const index = drivers.value.findIndex((driver) => driver.id === driverId)
    if (index !== -1) {
      drivers.value.splice(index, 1)
      localStorage.setItem('drivers', drivers.value)
    }
  }

  function updateDriver() {
    const index = drivers.value.findIndex((driver) => driver.id === draftDriver.value.id)
    if (index !== -1) {
      drivers.value.splice(index, 1, { ...draftDriver.value })
      localStorage.setItem('drivers', drivers.value)
    }
  }

  function openDriverForm(driverId?: number) {
    isDriverFormOpened.value = true

    // if driverId passed enable edit mode
    if(driverId) {
      isEditMode.value = true

      const index = drivers.value.findIndex((driver) => driver.id === driverId)
      if (index !== -1) {
        draftDriver.value = { ...drivers.value[index] }
      }
    }
  }

  function closeDriverForm() {
    isDriverFormOpened.value = false
    isEditMode.value = false
    resetDraftDriver()

  }

  function resetDraftDriver() {
    draftDriver.value = structuredClone(initialDriverState)
  }

  return {
    fetchDrivers,
    drivers,
    addDriver,
    deleteDriver,
    updateDriver,
    draftDriver,
    isEditMode,
    isDriverFormOpened,
    openDriverForm,
    closeDriverForm,
  }
})
