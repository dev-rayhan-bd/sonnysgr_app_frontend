// ─── Locker Browser (List Screen) ────────────────────────────────────────────
export interface LockerPreview {
  id: string
  username: string
  displayName: string
  avatar?: string         // if null, show initials
  initials: string
  location: string
  totalPairs: number
  estimatedValue: number
  avgCondition: number
  followerCount: number
  isFollowing: boolean
  previewImages: string[] // first 3 shown as thumbnail strip
  memberSince: string
  badge?: 'BESNKR' | 'PRO' | 'VERIFIED'
}

// ─── Public Locker (Detail Screen) ───────────────────────────────────────────
export type FilterLabel = 'All' | 'Deadstock' | '9/10' | '8/10' | '7/10' | 'For Sale'

// Helper so TypeScript knows every FilterLabel key is present
export type FilterCounts = Record<FilterLabel, number>

export interface PublicLockerItem {
  id: string
  name: string
  image: string
  condition: string
  isForSale: boolean
  price?: number
  size?: string
}

export interface PublicLockerProfile {
  id: string
  username: string
  displayName: string
  avatar?: string
  initials: string
  role: string
  location: string
  badge: string
  memberSince: string
  followerCount: number
  isFollowing: boolean
  stats: {
    totalPairs: number
    estimatedValue: number
    avgCondition: number
  }
  items: PublicLockerItem[]
}