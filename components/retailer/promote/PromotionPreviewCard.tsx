// components/store/promotion/PromotionPreviewCard.tsx
import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface Props {
  storeName: string
  title: string
  message: string
}

const PromotionPreviewCard: React.FC<Props> = ({ storeName, title, message }) => (
  <View
    className="bg-gray-900 rounded-2xl overflow-hidden mx-4"
    style={{ maxWidth: 220, alignSelf: 'center' }}
  >
    {/* Notch sim */}
    <View className="bg-black px-3 py-2 flex-row items-center gap-2">
      <View className="w-6 h-6 rounded-full bg-green-500 items-center justify-center">
        <Text className="text-white text-[8px] font-extrabold">SK</Text>
      </View>
      <Text className="text-white text-xs font-semibold">{storeName}</Text>
    </View>

    {/* Notification bubble */}
    <View className="bg-white/10 mx-3 my-2 rounded-xl px-3 py-2.5">
      <Text className="text-white text-xs font-extrabold mb-0.5" numberOfLines={1}>
        {title || 'Your promotion title'}
      </Text>
      <Text className="text-white/70 text-[11px]" numberOfLines={2}>
        {message || 'Your message here...'}
      </Text>
    </View>
  </View>
)

export default PromotionPreviewCard