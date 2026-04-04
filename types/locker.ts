export type ConditionLabel = 'DS' | 'VNDS' | '9/10' | '8/10' | '7/10' | '6/10' | '5/10'

export interface LockerItem {
  id: string
  name: string
  brand: string
  image: string
  condition: ConditionLabel
  estimatedValue: number
  size?: string
  colorway?: string
  purchaseDate?: string
  notes?: string
}

export interface LockerStats {
  totalPairs: number
  estimatedValue: number
  avgCondition: number
}

export type ViewMode = 'grid' | 'list'

export interface LockerState {
  items: LockerItem[]
  isPublic: boolean
  viewMode: ViewMode
  stats: LockerStats
  isLoading: boolean
  selectedItemId: string | null
  showActionSheet: boolean
}