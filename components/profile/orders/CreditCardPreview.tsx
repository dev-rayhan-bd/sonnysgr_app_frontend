// components/store/CreditCardPreview.tsx
import React from 'react'
import { View, Text } from 'react-native'

interface Props {
  number: string
  name: string
  expiry: string
}

const CreditCardPreview: React.FC<Props> = ({ number, name, expiry }) => (
  <View
    className="mx-4 rounded-3xl p-6 mb-6"
    style={{ backgroundColor: '#1a2340', minHeight: 160 }}
  >
    <Text className="text-white/50 text-xs font-bold tracking-widest mb-4">GOSNKR</Text>

    <Text className="text-white text-lg font-bold tracking-widest mb-6">
      {number
        ? number.replace(/\d(?=.)/g, '•').padEnd(19, ' ')
        : '•••• •••• •••• ••••'}
    </Text>

    <View className="flex-row justify-between">
      <View>
        <Text className="text-white/40 text-[10px] font-semibold">CARDHOLDER</Text>
        <Text className="text-white text-sm font-bold mt-0.5">
          {name || 'YOUR NAME'}
        </Text>
      </View>
      <View className="items-end">
        <Text className="text-white/40 text-[10px] font-semibold">EXPIRES</Text>
        <Text className="text-white text-sm font-bold mt-0.5">
          {expiry || 'MM/YY'}
        </Text>
      </View>
    </View>
  </View>
)

export default CreditCardPreview