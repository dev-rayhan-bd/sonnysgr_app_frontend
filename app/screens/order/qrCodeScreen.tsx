// app/screens/store/qrCodeScreen.tsx
import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, Animated } from 'react-native'
import { useRouter } from 'expo-router'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useQRCode } from '@/services/hooks/order/useQRCode'
import QRTimer from '@/components/profile/orders/QRTimer'
import BaseContainer from '@/components/shared/BaseContainer'
export default function QRCodeScreen() {
  const router  = useRouter()
  const { display, progress, scanned, refresh, simulateScan } = useQRCode(585)

  // When scanned → navigate to pickup complete
  useEffect(() => {
    if (scanned) {
      const t = setTimeout(() => {
        router.replace('/screens/order/pickupCompletedScreen')
      }, 800) // brief delay so user sees the scanned state
      return () => clearTimeout(t)
    }
  }, [scanned])

  return (
    <View className="flex-1 bg-gray-900">
       <BaseContainer scrollable >
      <View className='pt-10'>

        {/* Top info */}
        <View className="items-center pt-10 pb-6">
          <View className="w-10 h-10 rounded-full bg-green-500 items-center justify-center mb-3">
            <Text className="text-white text-xs font-extrabold">GS</Text>
          </View>
          <Text className="text-white/60 text-xs font-semibold mb-1">Show this to store staff</Text>
          <Text className="text-green-400 text-sm font-extrabold tracking-widest">GS-2024-7843</Text>
        </View>

        {/* QR frame — turns green when scanned */}
        <View
          className={`mx-6 rounded-3xl border-2 overflow-hidden bg-white p-6 items-center transition-all ${
            scanned ? 'border-green-500' : 'border-green-500/30'
          }`}
        >
          {scanned ? (
            // Scanned state — show checkmark overlay
            <View className="w-56 h-56 items-center justify-center">
              <View className="w-24 h-24 rounded-full bg-green-500 items-center justify-center">
                <Ionicons name="checkmark" size={52} color="#fff" />
              </View>
              <Text className="text-gray-900 font-extrabold text-base mt-4">Scanned!</Text>
            </View>
          ) : (
            <FontAwesome5 name="qrcode" size={220} color="#111827" />
          )}
        </View>

        {/* Timer or scanned message */}
        <View className="items-center mt-8">
          {scanned ? (
            <Text className="text-green-400 text-sm font-bold">Pickup confirmed ✓</Text>
          ) : (
            <>
              <Text className="text-white/50 text-xs font-semibold mb-4">Valid for 10 minutes</Text>
              <QRTimer display={display} progress={progress} />
            </>
          )}
        </View>

        {/* Product info */}
        <View className="flex-row items-center justify-center gap-3 mt-8">
          <Text className="text-white text-sm font-bold">Air Jordan 4 'Black Cat'</Text>
          <View className="bg-green-500 px-2 py-0.5 rounded-full">
            <Text className="text-white text-[10px] font-extrabold">10.5</Text>
          </View>
          <Text className="text-white/50 text-sm">Sonny's Kicks</Text>
        </View>

        {/* Simulate scan button — remove in production */}
        {!scanned && (
          <TouchableOpacity
            onPress={simulateScan}
            className="mx-6 mt-8 border border-green-500/40 py-3 rounded-2xl items-center"
          >
            <Text className="text-green-400 text-xs font-semibold">Simulate QR Scan</Text>
          </TouchableOpacity>
        )}

        {!scanned && (
          <TouchableOpacity onPress={refresh} className="items-center mt-4">
            <Text className="text-white/30 text-xs">Having trouble?</Text>
          </TouchableOpacity>
        )}
    </View>
    </BaseContainer>
    </View>
  )
}