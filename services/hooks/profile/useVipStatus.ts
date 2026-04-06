import { useState } from 'react'
import type { VipProfile, EarnAction, VipBenefit, TierLevel } from '@/types/vip'

// ─── Static Config ────────────────────────────────────────────────────────────
export const TIER_LEVELS: TierLevel[] = [
  { tier: 'Bronze',   minPoints: 0,    color: '#CD7F32', emoji: '🥉' },
  { tier: 'Silver',   minPoints: 500,  color: '#C0C0C0', emoji: '🥈' },
  { tier: 'Gold',     minPoints: 1000, color: '#F59E0B', emoji: '🥇' },
  { tier: 'Platinum', minPoints: 2000, color: '#E2E8F0', emoji: '👑' },
]

const EARN_ACTIONS: EarnAction[] = [
  { id: '1', points: 90,  label: 'Purchase',     icon: '🛍️' },
  { id: '2', points: 20,  label: 'Review',        icon: '⭐' },
  { id: '3', points: 10,  label: 'Daily Login',   icon: '📅' },
  { id: '4', points: 100, label: 'Make a return', icon: '📦' },
  { id: '5', points: 5,   label: 'Any activity',  icon: '⚡' },
  { id: '6', points: 30,  label: 'Promo code',    icon: '🎟️' },
]

const VIP_BENEFITS: VipBenefit[] = [
  { id: '1', icon: '🚀', title: 'Early Access to Drops',       description: 'Lite early access to new releases',                    platinumOnly: false },
  { id: '2', icon: '🎁', title: 'Special Promotions',          description: "Exclusive GoSNKR discounts (some access)",              platinumOnly: false },
  { id: '3', icon: '🏨', title: 'Priority Hotel Privileges',   description: "Hotels Get 15%+ instead of 5% discount",               platinumOnly: false },
  { id: '4', icon: '🔔', title: 'Members-Only Notifications',  description: 'Get notified about special events',                    platinumOnly: false },
  { id: '5', icon: '🏅', title: 'Gold Profile Badge',          description: 'Appear on your profile and locker',                    platinumOnly: false },
  { id: '6', icon: '⚡', title: 'Free Priority Pickup',        description: 'Skip the queue at our participating stores',           platinumOnly: true  },
  { id: '7', icon: '🎧', title: 'Dedicated Support Agent',     description: 'Get direct and fast responses',                       platinumOnly: true  },
  { id: '8', icon: '🔑', title: 'Exclusive Reseller Access',   description: 'Access to the best flipzone',                         platinumOnly: true  },
]

// ─── Mock Profile ─────────────────────────────────────────────────────────────
const MOCK_PROFILE: VipProfile = {
  name: 'Sonny Garcia',
  memberSince: 'Jan 2024',
  tier: 'Gold',
  points: 1720,
  nextTier: 'Platinum',
  nextTierPoints: 2000,
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useVipStatus = () => {
  const [profile] = useState<VipProfile>(MOCK_PROFILE)

  const progressPercent = Math.min(
    (profile.points / profile.nextTierPoints) * 100,
    100,
  )

  const currentTierConfig = TIER_LEVELS.find((t) => t.tier === profile.tier)!
  const nextTierConfig = TIER_LEVELS.find((t) => t.tier === profile.nextTier)!

  return {
    profile,
    progressPercent,
    earnActions: EARN_ACTIONS,
    benefits: VIP_BENEFITS,
    tiers: TIER_LEVELS,
    currentTierConfig,
    nextTierConfig,
  }
}