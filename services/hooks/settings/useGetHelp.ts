import { useState, useCallback } from 'react'
import { useRouter } from 'expo-router'
import Toast from 'react-native-toast-message'
export type HelpTopic =
  | 'Order Issue'
  | 'Refund / Dispute'
  | 'Hold Problem'
  | 'Pickup Issue'
  | 'Something Else'

export type ResolutionOption =
  | 'Full refund'
  | 'Partial refund'
  | 'Store credit'
  | 'Just want it resolved'

export interface HelpTopicOption {
  topic: HelpTopic
  subtitle: string
  icon: string
  bgColor: string
  iconColor: string
}

export const HELP_TOPICS: HelpTopicOption[] = [
  {
    topic: 'Order Issue',
    subtitle: 'Wrong item, not received, etc.',
    icon: 'shopping-bag',
    bgColor: '#EFF6FF',
    iconColor: '#3B82F6',
  },
  {
    topic: 'Refund / Dispute',
    subtitle: 'Payment issues, overcharge',
    icon: 'refresh-ccw',
    bgColor: '#FFF1F2',
    iconColor: '#F43F5E',
  },
  {
    topic: 'Hold Problem',
    subtitle: 'Hold cancelled, deposit issue',
    icon: 'pause-circle',
    bgColor: '#FFFBEB',
    iconColor: '#F59E0B',
  },
  {
    topic: 'Pickup Issue',
    subtitle: 'Late pickup, store closed, etc.',
    icon: 'map-pin',
    bgColor: '#F0FDF4',
    iconColor: '#22C55E',
  },
]

export const RESOLUTION_OPTIONS: ResolutionOption[] = [
  'Full refund',
  'Partial refund',
  'Store credit',
  'Just want it resolved',
]

export interface LinkedOrder {
  id: string
  number: string
  date: string
  storeName: string
  amount: number
}

const MOCK_ORDERS: LinkedOrder[] = [
  {
    id: 'o1',
    number: '#4821',
    date: 'Mar 21',
    storeName: "Sonny's Kicks",
    amount: 140,
  },
]

export function useGetHelp(storeId?: string) {
  const router = useRouter()

  const [selectedTopic, setSelectedTopic] = useState<HelpTopic | null>(null)
  const [linkedOrderId, setLinkedOrderId] = useState<string | null>(null)
  const [noOrderNumber, setNoOrderNumber] = useState(false)
  const [description, setDescription] = useState('')
  const [photos, setPhotos] = useState<(string | null)[]>([null, null, null, null])
  const [resolution, setResolution] = useState<ResolutionOption>('Full refund')
  const [isTimeSensitive, setIsTimeSensitive] = useState(false)

  const orders = MOCK_ORDERS

  const isValid = true

  const handleTopicSelect = useCallback(
    (topic: HelpTopic) => {
      setSelectedTopic(topic)
      router.push({
        pathname: '/screens/settings/getHelpDetailScreen',
        params: { topic, storeId: storeId ?? '' },
      })
    },
    [router, storeId]
  )

  const handleSomethingElse = useCallback(() => {
    handleTopicSelect('Something Else')
  }, [handleTopicSelect])

  const handleChangeTopic = useCallback(() => {
    router.back()
  }, [router])

  const handleLinkOrder = useCallback((orderId: string) => {
    setLinkedOrderId(prev => (prev === orderId ? null : orderId))
    setNoOrderNumber(false)
  }, [])

  const handleNoOrderNumber = useCallback(() => {
    setNoOrderNumber(prev => !prev)
    setLinkedOrderId(null)
  }, [])

  const handlePickPhoto = useCallback((index: number) => {
    console.log('pick photo', index)
  }, [])

  const handleSubmit = useCallback(() => {
    if (!isValid) return
     Toast.show({
    type: 'success',
    text1: 'Application Submitted',
    text2: 'We Will contact with you soon after analysis your report',
    visibilityTime: 2000,
  })
    router.back()
    router.back()
  }, [isValid, storeId, selectedTopic, linkedOrderId, description, resolution, isTimeSensitive, router])

  return {
    selectedTopic,
    linkedOrderId,
    noOrderNumber,
    description, setDescription,
    photos,
    resolution, setResolution,
    isTimeSensitive, setIsTimeSensitive,
    orders,
    isValid,
    handleTopicSelect,
    handleSomethingElse,
    handleChangeTopic,
    handleLinkOrder,
    handleNoOrderNumber,
    handlePickPhoto,
    handleSubmit,
  }
}