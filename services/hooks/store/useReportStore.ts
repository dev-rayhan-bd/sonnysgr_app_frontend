import { useState, useCallback } from 'react'
import { useRouter } from 'expo-router'
import Toast from 'react-native-toast-message'
export type ReportTopic =
  | 'Fake or Counterfeit Product'
  | 'Fraud or Scam'
  | 'Wrong Item Received'
  | 'Item Misrepresented'
  | 'Staff or Service Issue'
  | 'Other Issue'

export type ContactMethod = 'Email' | 'In-App'

export interface ReportTopicOption {
  topic: ReportTopic
  subtitle: string
  icon: string
  color: string
}

export const REPORT_TOPICS: ReportTopicOption[] = [
  {
    topic: 'Fake or Counterfeit Product',
    subtitle: 'Shoe appears to be replica or not authentic',
    icon: 'alert-triangle',
    color: '#EF4444',
  },
  {
    topic: 'Fraud or Scam',
    subtitle: "Charged but didn't receive, false advertising",
    icon: 'shield-off',
    color: '#F59E0B',
  },
  {
    topic: 'Wrong Item Received',
    subtitle: 'Different shoe or size than what I ordered',
    icon: 'refresh-cw',
    color: '#3B82F6',
  },
  {
    topic: 'Item Misrepresented',
    subtitle: 'Condition worse than described or shown',
    icon: 'eye-off',
    color: '#8B5CF6',
  },
  {
    topic: 'Staff or Service Issue',
    subtitle: 'Unprofessional behaviour, harassment, etc.',
    icon: 'user-x',
    color: '#EC4899',
  },
  {
    topic: 'Other Issue',
    subtitle: 'Something else not covered above',
    icon: 'more-horizontal',
    color: '#6B7280',
  },
]

export interface LinkedOrder {
  id: string
  number: string
  date: string
  itemName: string
}

const MOCK_ORDERS: LinkedOrder[] = [
  {
    id: 'o1',
    number: '#4821',
    date: 'Mar 21',
    itemName: "Air Jordan 4 'Black Cat'",
  },
]

export function useReportStore(storeId: string) {
  const router = useRouter()

  const [selectedTopic, setSelectedTopic] = useState<ReportTopic | null>(null)
  const [linkedOrderId, setLinkedOrderId] = useState<string | null>(null)
  const [description, setDescription] = useState('')
  const [photos, setPhotos] = useState<(string | null)[]>([null, null, null, null])
  const [contactMethod, setContactMethod] = useState<ContactMethod>('In-App')
  const [isUrgent, setIsUrgent] = useState(false)

  const orders = MOCK_ORDERS

  const isValid = true

  const handleTopicSelect = useCallback(
    (topic: ReportTopic) => {
      setSelectedTopic(topic)
      router.push({
        pathname: '/screens/store/reportStoreDetailScreen',
        params: { storeId, topic },
      })
    },
    [storeId, router]
  )

  const handleChangeTopic = useCallback(() => {
    router.back()
  }, [router])

  const handlePickPhoto = useCallback((index: number) => {
    console.log('pick photo at index', index)
  }, [])

  const handleLinkOrder = useCallback((orderId: string) => {
    setLinkedOrderId(prev => (prev === orderId ? null : orderId))
  }, [])

  const handleSubmit = useCallback(() => {
    if (!isValid) return
    console.log('submit report', { storeId, selectedTopic, linkedOrderId, description, contactMethod, isUrgent })
        Toast.show({
        type: 'success',
        text1: 'Report Submitted',
        text2: 'You and owner both will notify after the validation of your report',
        visibilityTime: 2000,
      })
    router.back()
    router.back()
  }, [isValid, storeId, selectedTopic, linkedOrderId, description, contactMethod, isUrgent, router])

  return {
    selectedTopic,
    linkedOrderId,
    description, setDescription,
    photos,
    contactMethod, setContactMethod,
    isUrgent, setIsUrgent,
    orders,
    isValid,
    handleTopicSelect,
    handleChangeTopic,
    handlePickPhoto,
    handleLinkOrder,
    handleSubmit,
  }
}