// components/store/PaymentCardRow.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import type { SavedCard } from '@/services/hooks/order/usePayment'

const CARD_COLORS: Record<string, string> = {
  visa: '#1A1F71',
  mc:   '#EB001B',
  amex: '#007BC1',
}

const CARD_LABELS: Record<string, string> = {
  visa: 'VISA',
  mc:   'MC',
  amex: 'AMEX',
}

interface Props {
  card: SavedCard
  selected: boolean
  onSelect: () => void
}

const PaymentCardRow: React.FC<Props> = ({ card, selected, onSelect }) => (
  <TouchableOpacity
    onPress={onSelect}
    activeOpacity={0.8}
    className={`flex-row items-center px-4 py-4 rounded-2xl mb-3 border ${
      selected ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-white'
    }`}
  >
    {/* Card brand badge */}
    <View
      className="w-10 h-7 rounded items-center justify-center mr-3"
      style={{ backgroundColor: CARD_COLORS[card.type] }}
    >
      <Text className="text-white text-[10px] font-extrabold">{CARD_LABELS[card.type]}</Text>
    </View>

    <View className="flex-1">
      <Text className="text-sm font-bold text-gray-900">
        •••• •••• •••• {card.last4}
      </Text>
      <Text className="text-xs text-gray-400 mt-0.5">Expires {card.expiry}</Text>
    </View>

    {/* Radio */}
    <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
      selected ? 'border-green-500' : 'border-gray-300'
    }`}>
      {selected && <View className="w-2.5 h-2.5 rounded-full bg-green-500" />}
    </View>
  </TouchableOpacity>
)

export default PaymentCardRow