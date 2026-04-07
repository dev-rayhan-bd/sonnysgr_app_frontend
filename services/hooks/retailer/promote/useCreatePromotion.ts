// services/hooks/store/useCreatePromotion.ts
import { useState, useCallback } from 'react'
import Toast from 'react-native-toast-message'

export type PromotionType = 'Flash Sale' | 'New Arrivals' | 'Restock Alert' | 'Exclusive Drop' | 'General Announcement'

export type AudienceType = 'All my followers' | 'Nearby customers' | 'My size audience'

export interface PromotionTypeOption {
  id: PromotionType
  icon: string
  description: string
  color: string
  bgColor: string
}

export interface AudienceOption {
  id: AudienceType
  icon: string
  description: string
  count: number
  color: string
}

const PROMOTION_TYPES: PromotionTypeOption[] = [
  { id: 'Flash Sale',           icon: '⚡',  description: 'Limited-time discount on selected pairs', color: '#F59E0B', bgColor: '#FEF3C7' },
  { id: 'New Arrivals',         icon: '📦',  description: 'Tell customers about fresh inventory',    color: '#3B82F6', bgColor: '#EFF6FF' },
  { id: 'Restock Alert',        icon: '🔔',  description: 'Notify your followers a size is back',    color: '#8B5CF6', bgColor: '#F5F3FF' },
  { id: 'Exclusive Drop',       icon: '🔴',  description: 'Announce a special or limited release',   color: '#EF4444', bgColor: '#FEF2F2' },
  { id: 'General Announcement', icon: '📣',  description: 'Event, holiday hours, store news',        color: '#F97316', bgColor: '#FFF7ED' },
]

const AUDIENCE_OPTIONS: AudienceOption[] = [
  { id: 'All my followers',  icon: '👥', description: 'Everyone who follows your store (156 people)', count: 156, color: '#22C55E' },
  { id: 'Nearby customers',  icon: '📍', description: 'Users within 5 miles (est. 2,400)',            count: 2400, color: '#EF4444' },
  { id: 'My size audience',  icon: '👟', description: 'Customers who saved sizes you carry',          count: 89,   color: '#9CA3AF' },
]

export function useCreatePromotion() {
  const [selectedType,     setSelectedType]     = useState<PromotionType | null>(null)
  const [title,            setTitle]            = useState('')
  const [message,          setMessage]          = useState('')
  const [selectedAudience, setSelectedAudience] = useState<AudienceType>('All my followers')
  const [loading,          setLoading]          = useState(false)

  const selectedAudienceData = AUDIENCE_OPTIONS.find(a => a.id === selectedAudience)
  const estimatedReach       = selectedAudienceData?.count ?? 0

  const canPreview = selectedType !== null && title.length > 0 && message.length > 0

  const handlePreview = useCallback((onNext: () => void) => {
    if (!canPreview) {
      Toast.show({ type: 'error', text1: 'Incomplete', text2: 'Please fill in all fields' })
      return
    }
    onNext()
  }, [canPreview])

  const handleSendNow = useCallback(async (onSuccess: () => void) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    Toast.show({
      type: 'success',
      text1: 'Promotion Sent!',
      text2: `Sent to ${estimatedReach} followers`,
    })
    onSuccess()
  }, [estimatedReach])

  const handleSchedule = useCallback(() => {
    Toast.show({ type: 'info', text1: 'Schedule', text2: 'Scheduling feature coming soon' })
  }, [])

  const handleSaveDraft = useCallback(() => {
    Toast.show({ type: 'success', text1: 'Draft Saved', text2: 'Your promotion has been saved' })
  }, [])

  return {
    promotionTypes: PROMOTION_TYPES,
    audienceOptions: AUDIENCE_OPTIONS,
    selectedType, setSelectedType,
    title, setTitle,
    message, setMessage,
    selectedAudience, setSelectedAudience,
    estimatedReach,
    canPreview,
    loading,
    handlePreview,
    handleSendNow,
    handleSchedule,
    handleSaveDraft,
  }
}