export type VipTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum'

export interface EarnAction {
  id: string
  points: number
  label: string
  icon: string // emoji
}

export interface VipBenefit {
  id: string
  icon: string // emoji
  title: string
  description: string
  platinumOnly: boolean
}

export interface TierLevel {
  tier: VipTier
  minPoints: number
  color: string
  emoji: string
}

export interface VipProfile {
  name: string
  memberSince: string
  tier: VipTier
  points: number
  nextTier: VipTier
  nextTierPoints: number
}