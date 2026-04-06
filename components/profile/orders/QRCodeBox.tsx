// components/store/QRCodeBox.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

interface Props {
  code: string
  onEnlarge?: () => void
  dark?: boolean
}

const QRCodeBox: React.FC<Props> = ({ code, onEnlarge, dark }) => (
  <View className={`items-center ${dark ? '' : 'bg-white rounded-2xl p-5 shadow-sm mx-4'}`}>
    {!dark && <Text className="text-xs text-gray-400 font-semibold mb-4">Your Pickup Code</Text>}

    <TouchableOpacity onPress={onEnlarge} activeOpacity={0.8}>
      <View className={`${dark ? 'w-48 h-48' : 'w-40 h-40'} items-center justify-center bg-white rounded-2xl p-3`}>
        {/* QR placeholder — replace with a real QR lib like react-native-qrcode-svg */}
        <FontAwesome5 name="qrcode" size={dark ? 140 : 110} color="#111827" />
      </View>
    </TouchableOpacity>

    <Text className={`font-extrabold mt-3 tracking-widest ${dark ? 'text-green-400 text-base' : 'text-gray-900 text-base'}`}>
      {code}
    </Text>
    {!dark && (
      <Text className="text-xs text-gray-400 mt-1">Tap to enlarge</Text>
    )}
  </View>
)

export default QRCodeBox