import type { Driver } from '@/types/driver.ts'

export type Tour = {
  id: number
  customerName: string
  shipmentDate: string
  locationFrom: string
  locationTo: string
  assignedDriver: Driver | null
}
