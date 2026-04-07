// app/screens/store/promotionPreviewScreen.tsx
import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { useCreatePromotion } from '@/services/hooks/retailer/promote/useCreatePromotion'
import PromotionPreviewCard from '@/components/retailer/promote/PromotionPreviewCard'
import BaseContainer from '@/components/shared/BaseContainer'
export default function PromotionPreviewScreen() {
  const router = useRouter()
  const {
    title, message, selectedAudience,
    estimatedReach, loading,
    handleSendNow, handleSchedule, handleSaveDraft,
  } = useCreatePromotion()

  return (
  <BaseContainer scrollable backgroundColor='#fff'>
      {/* Nav */}
      <View className="flex-row items-center px-4 py-3 bg-white pt-10">
        <TouchableOpacity onPress={() => router.back()} className="p-1 mr-3">
          <Feather name="arrow-left" size={22} color="#111827" />
        </TouchableOpacity>
        <Text className="flex-1 text-base font-bold text-gray-900">Create Promotion</Text>
        <Text className="text-xs text-gray-400"></Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="pt-6">

          {/* Preview label */}
          <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mb-4">
            Preview
          </Text>

          {/* Phone mockup preview */}
          <View className="bg-gray-900 mx-4 rounded-3xl py-8 items-center mb-6">
            <PromotionPreviewCard
              storeName="Sonny's Kicks"
              title={title}
              message={message}
            />
          </View>

          {/* Send settings */}
          <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mb-3">
            Send Settings
          </Text>

          <View className="flex-row gap-2 px-4 mb-4">
            {[
              { label: 'Send Now',    onPress: () => {} },
              { label: 'Schedule',   onPress: handleSchedule },
              { label: 'Save Draft', onPress: handleSaveDraft },
            ].map((btn, i) => (
              <TouchableOpacity
                key={btn.label}
                onPress={btn.onPress}
                className={`flex-1 py-2.5 rounded-xl items-center ${
                  i === 0 ? 'bg-gray-900' : 'bg-white border border-gray-200'
                }`}
              >
                <Text className={`text-xs font-bold ${i === 0 ? 'text-white' : 'text-gray-700'}`}>
                  {btn.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Sending to */}
          <Text className="text-sm text-gray-500 px-4 mb-6">
            Sending to:{' '}
            <Text className="font-extrabold text-gray-900">{estimatedReach} followers</Text>
          </Text>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-3 bg-white gap-3">
        <TouchableOpacity
          onPress={() => handleSendNow(() => router.push('/screens/retailer/promote/radiusPromotionScreen'))}
          disabled={loading}
          activeOpacity={0.85}
          className="bg-green-500 py-4 rounded-2xl items-center"
        >
          <Text className="text-white text-sm font-extrabold">
            {loading ? 'Sending...' : 'Send Now '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()} className="py-2 items-center">
          <Text className="text-sm text-gray-400 font-semibold">Back to Edit</Text>
        </TouchableOpacity>
      </View>
</BaseContainer>
  )
}