import { useState, useCallback } from 'react'
import * as Clipboard from 'expo-clipboard'
import * as Share from 'expo-sharing'
import type { ReferralEntry, ReferralStats, ShareOption } from '@/types/referral'

// ─── Mock Data ────────────────────────────────────────────────────────────────
const REFERRAL_CODE = 'SONNY10'
const REFERRAL_LINK = `https://gosnkr.com/ref/${REFERRAL_CODE}`

const MOCK_ENTRIES: ReferralEntry[] = [
  { id: '1', name: 'Friend joined GoSNKR', initials: 'A', avatarColor: '#22C55E', date: 'Mar 21', status: 'earned',  amount: 10 },
  { id: '2', name: 'Friend joined GoSNKR', initials: 'J', avatarColor: '#3B82F6', date: 'Mar 18', status: 'earned',  amount: 10 },
  { id: '3', name: 'Friend joined GoSNKR', initials: 'T', avatarColor: '#F97316', date: 'Mar 15', status: 'earned',  amount: 10 },
  { id: '4', name: 'Friend joined GoSNKR', initials: 'C', avatarColor: '#8B5CF6', date: 'Mar 12', status: 'pending', amount: 10 },
]

const MOCK_STATS: ReferralStats = {
  totalEarned: 30,
  successfulReferrals: 3,
  processingAmount: 0,
}

const SHARE_OPTIONS: ShareOption[] = [
  { id: 'whatsapp',  label: 'Share on WhatsApp',     icon: 'message-circle' },
  { id: 'imessage', label: 'Send via iMessage',      icon: 'message-square' },
  { id: 'instagram',label: 'Share to Instagram Story', icon: 'camera' },
  { id: 'copy',     label: 'Copy referral link',     icon: 'link' },
]

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useReferral = () => {
  const [copied, setCopied] = useState(false)
  const [entries] = useState<ReferralEntry[]>(MOCK_ENTRIES)
  const [stats] = useState<ReferralStats>(MOCK_STATS)

  const copyCode = useCallback(async () => {
    await Clipboard.setStringAsync(REFERRAL_CODE)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  const copyLink = useCallback(async () => {
    await Clipboard.setStringAsync(REFERRAL_LINK)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  const handleShareOption = useCallback(async (optionId: string) => {
    const message = `Use my referral code ${REFERRAL_CODE} to join GoSNKR and we both get $10! ${REFERRAL_LINK}`

    switch (optionId) {
      case 'whatsapp':
        // Deep link to WhatsApp
        // Linking.openURL(`whatsapp://send?text=${encodeURIComponent(message)}`)
        break
      case 'imessage':
        // Linking.openURL(`sms:&body=${encodeURIComponent(message)}`)
        break
      case 'instagram':
        // Use expo-sharing or deep link
        break
      case 'copy':
        await copyLink()
        break
    }
  }, [copyLink])

  return {
    referralCode: REFERRAL_CODE,
    referralLink: REFERRAL_LINK,
    copied,
    entries,
    stats,
    shareOptions: SHARE_OPTIONS,
    copyCode,
    copyLink,
    handleShareOption,
  }
}