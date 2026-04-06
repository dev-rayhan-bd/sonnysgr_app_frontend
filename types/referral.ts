export type ReferralStatus = 'earned' | 'pending'

export interface ReferralEntry {
  id: string
  name: string
  initials: string
  avatarColor: string
  date: string
  status: ReferralStatus
  amount: number
}

export interface ReferralStats {
  totalEarned: number
  successfulReferrals: number
  processingAmount: number
}

export interface ShareOption {
  id: string
  label: string
  icon: string // Feather icon name
}