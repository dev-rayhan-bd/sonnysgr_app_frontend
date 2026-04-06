import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useRouter, useLocalSearchParams } from 'expo-router'
import {
  REPORT_TOPICS,
  useReportStore,
} from '@/services/hooks/store/useReportStore'
import ReportTopicRow from '@/components/store/ReportTopicRow'
import BaseContainer from '@/components/shared/BaseContainer'

const ReportStoreScreen: React.FC = () => {
  const router = useRouter()
  const { storeId, storeName, storeAddress } =
    useLocalSearchParams<{
      storeId: string
      storeName: string
      storeAddress: string
    }>()

  const { handleTopicSelect } = useReportStore(storeId)

  return (
    <BaseContainer backgroundColor="#ffffff">
      {/* Header */}
      <View className="flex-row items-center px-4 pt-12 pb-4 bg-white border-b border-gray-100">
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="arrow-left" size={22} color="#111827" />
        </TouchableOpacity>
        <Text className="text-lg font-extrabold text-gray-900 ml-3">
          Report Store
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      >
        {/* Store card */}
        <View className="flex-row items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3 mb-6 shadow-sm">
          <View className="w-10 h-10 rounded-xl bg-green-500 items-center justify-center">
            <Text className="text-white text-sm font-extrabold">
              {storeName?.slice(0, 2).toUpperCase() ?? 'ST'}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-sm font-bold text-gray-900">{storeName}</Text>
            <Text className="text-xs text-gray-400 mt-0.5">{storeAddress}</Text>
          </View>
          {/* Verified badge */}
          <View className="flex-row items-center gap-1 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
            <Ionicons name="checkmark-circle" size={12} color="#22C55E" />
            <Text className="text-[11px] font-bold text-green-600">Verified</Text>
          </View>
        </View>

        {/* Topic list */}
        <Text className="text-base font-extrabold text-gray-900 mb-3">
          What are you reporting?
        </Text>

        <View className="bg-white rounded-2xl px-4 shadow-sm">
          {REPORT_TOPICS.map((option, i) => (
            <ReportTopicRow
              key={option.topic}
              option={option}
              isLast={i === REPORT_TOPICS.length - 1}
              onPress={() => handleTopicSelect(option.topic)}
            />
          ))}
        </View>
      </ScrollView>
    </BaseContainer>
  )
}

export default ReportStoreScreen