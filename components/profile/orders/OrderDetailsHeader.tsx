// components/order/OrderDetailHeader.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

interface Props {
  orderNumber: string
  status: string
  cancelledDate: string
  cancelledTime: string
  onCopy: () => void
}

const STATUS_COLOR: Record<string, string> = {
  Cancelled:       '#EF4444',
  'Pick Up Ready': '#22C55E',
  Active:          '#3B82F6',
  Completed:       '#9CA3AF',
  'On Hold':       '#F59E0B',
}

const OrderDetailHeader: React.FC<Props> = ({
  orderNumber, status, cancelledDate, cancelledTime, onCopy,
}) => (
  <View className="bg-red-50 px-4 py-4 border-b border-red-100">
    <View className="flex-row items-center justify-between mb-1">
      <View
        className="px-3 py-1 rounded-full"
        style={{ backgroundColor: (STATUS_COLOR[status] ?? '#9CA3AF') + '20' }}
      >
        <Text
          className="text-xs font-extrabold"
          style={{ color: STATUS_COLOR[status] ?? '#9CA3AF' }}
        >
          {status}
        </Text>
      </View>
      <Text className="text-xs text-gray-400">{cancelledDate} · {cancelledTime}</Text>
    </View>
    <View className="flex-row items-center gap-2 mt-1">
      <Text className="text-xs text-gray-400">{orderNumber}</Text>
      <TouchableOpacity onPress={onCopy}>
        <Feather name="copy" size={13} color="#9CA3AF" />
      </TouchableOpacity>
    </View>
  </View>
)

export default OrderDetailHeader