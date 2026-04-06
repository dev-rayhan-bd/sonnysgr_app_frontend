import React from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  TextInput, Switch, KeyboardAvoidingView, Platform,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter, useLocalSearchParams } from 'expo-router'
import {
  useReportStore,
  REPORT_TOPICS,
  ReportTopic,
  ContactMethod,
} from '@/services/hooks/store/useReportStore'
import BaseContainer from '@/components/shared/BaseContainer'

// ── Section label ──────────────────────────────────────────
const SectionLabel: React.FC<{ label: string }> = ({ label }) => (
  <Text className="text-xs font-bold text-gray-500 mb-2 mt-5">
    {label}
  </Text>
)

const ReportStoreDetailScreen: React.FC = () => {
  const router = useRouter()
  const { storeId, topic } = useLocalSearchParams<{
    storeId: string
    topic: ReportTopic
  }>()

  const {
    linkedOrderId,
    description, setDescription,
    photos,
    contactMethod, setContactMethod,
    isUrgent, setIsUrgent,
    orders,
    isValid,
    handleChangeTopic,
    handlePickPhoto,
    handleLinkOrder,
    handleSubmit,
  } = useReportStore(storeId)

  // Find topic color/icon
  const topicMeta = REPORT_TOPICS.find(t => t.topic === topic)

  return (
    <BaseContainer backgroundColor="#ffffff">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
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
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        >
          {/* Selected topic pill */}
          <View className="flex-row items-center justify-between bg-red-50 border border-red-100 rounded-2xl px-4 py-3 mb-2">
            <View className="flex-row items-center gap-2 flex-1">
              <Feather
                name={(topicMeta?.icon ?? 'alert-triangle') as any}
                size={15}
                color={topicMeta?.color ?? '#EF4444'}
              />
              <Text
                className="text-sm font-bold flex-1"
                style={{ color: topicMeta?.color ?? '#EF4444' }}
                numberOfLines={1}
              >
                {topic}
              </Text>
            </View>
            <TouchableOpacity onPress={handleChangeTopic}>
              <Text className="text-xs font-semibold text-gray-500 ml-3">Change</Text>
            </TouchableOpacity>
          </View>

          {/* ── RELATED ORDER ── */}
          <SectionLabel label="Related to an order? (recommended)" />
          <View className="bg-white rounded-2xl px-4 shadow-sm overflow-hidden">
            {orders.map((order, i) => (
              <TouchableOpacity
                key={order.id}
                onPress={() => handleLinkOrder(order.id)}
                activeOpacity={0.8}
                className={`flex-row items-center py-3.5 gap-3 ${
                  i < orders.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                {/* Radio */}
                <View
                  className={`w-4 h-4 rounded-full border-2 items-center justify-center ${
                    linkedOrderId === order.id
                      ? 'border-green-500'
                      : 'border-gray-300'
                  }`}
                >
                  {linkedOrderId === order.id && (
                    <View className="w-2 h-2 rounded-full bg-green-500" />
                  )}
                </View>

                <View className="flex-1">
                  <Text className="text-sm font-bold text-gray-900">
                    Order {order.number} · {order.date}
                  </Text>
                  <Text className="text-xs text-gray-400 mt-0.5">{order.itemName}</Text>
                </View>

                <View className="flex-row items-center gap-1">
                  <Text className="text-xs font-semibold text-green-500">Link</Text>
                  <Feather name="chevron-right" size={12} color="#22C55E" />
                </View>
              </TouchableOpacity>
            ))}

            {/* Not related option */}
            <TouchableOpacity
              onPress={() => handleLinkOrder('none')}
              activeOpacity={0.8}
              className="flex-row items-center py-3.5 gap-3"
            >
              <View
                className={`w-4 h-4 rounded-full border-2 items-center justify-center ${
                  linkedOrderId === 'none'
                    ? 'border-green-500'
                    : 'border-gray-300'
                }`}
              >
                {linkedOrderId === 'none' && (
                  <View className="w-2 h-2 rounded-full bg-green-500" />
                )}
              </View>
              <Text className="text-sm text-gray-500">Not related to an order</Text>
            </TouchableOpacity>
          </View>

          {/* ── DESCRIPTION ── */}
          <SectionLabel label="Describe what happened" />
          <View className="bg-white rounded-2xl px-4 py-3 shadow-sm">
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Please describe the issue in detail. Be as specific as possible..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              maxLength={500}
              className="text-sm text-gray-700 leading-5"
              style={{ minHeight: 100 }}
            />
            <Text className="text-[11px] text-gray-300 text-right mt-1">
              {description.length}/500
            </Text>
          </View>

          {/* ── PHOTOS ── */}
          <SectionLabel label="Upload evidence (optional)" />
          <View className="flex-row gap-3">
            {photos.map((photo, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => handlePickPhoto(i)}
                activeOpacity={0.8}
                className="flex-1 aspect-square rounded-xl border border-dashed border-gray-300 bg-gray-50 items-center justify-center"
              >
                {photo ? (
                  <Feather name="check" size={20} color="#22C55E" />
                ) : (
                  <Feather name="camera" size={20} color="#9CA3AF" />
                )}
              </TouchableOpacity>
            ))}
          </View>
          <Text className="text-[11px] text-gray-400 mt-1.5">
            Photos, screenshots, or receipts
          </Text>

          {/* ── CONTACT METHOD ── */}
          <SectionLabel label="How should we contact you?" />
          <View className="flex-row gap-4 bg-white rounded-2xl px-4 py-4 shadow-sm">
            {(['Email', 'In-App'] as ContactMethod[]).map(method => {
              const active = contactMethod === method
              return (
                <TouchableOpacity
                  key={method}
                  onPress={() => setContactMethod(method)}
                  activeOpacity={0.8}
                  className="flex-row items-center gap-2"
                >
                  {/* Radio */}
                  <View
                    className={`w-4 h-4 rounded-full border-2 items-center justify-center ${
                      active ? 'border-green-500' : 'border-gray-300'
                    }`}
                  >
                    {active && (
                      <View className="w-2 h-2 rounded-full bg-green-500" />
                    )}
                  </View>

                  <Text
                    className={`text-sm font-semibold ${
                      active ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    {method}
                  </Text>

                  {/* Beta badge for In-App */}
                  {method === 'In-App' && (
                    <View className="bg-green-500 px-1.5 py-0.5 rounded-md">
                      <Text className="text-[9px] font-bold text-white">beta</Text>
                    </View>
                  )}
                </TouchableOpacity>
              )
            })}
          </View>

          {/* ── IS URGENT ── */}
          <SectionLabel label="Is this urgent?" />
          <View className="flex-row items-center justify-between bg-white rounded-2xl px-4 py-4 shadow-sm">
            <Text className="text-sm text-gray-700">Mark as urgent</Text>
            <Switch
              value={isUrgent}
              onValueChange={setIsUrgent}
              trackColor={{ false: '#E5E7EB', true: '#22C55E' }}
              thumbColor="#ffffff"
            />
          </View>

          {/* Disclaimer */}
          <Text className="text-[11px] text-gray-400 mt-4 leading-4 text-center px-4">
            Your report is confidential. We will review all reports within 24-48 hours.
          </Text>
        </ScrollView>

        {/* Submit button */}
        <View className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-3 bg-white border-t border-gray-100">
          <TouchableOpacity
            onPress={handleSubmit}
            activeOpacity={0.85}
            disabled={!isValid}
            className={`rounded-2xl py-4 items-center ${
              isValid ? 'bg-gray-900' : 'bg-gray-100'
            }`}
          >
            <Text
              className={`text-base font-bold ${
                isValid ? 'text-white' : 'text-gray-400'
              }`}
            >
              {isValid ? 'Submit Report' : 'Complete required fields'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </BaseContainer>
  )
}

export default ReportStoreDetailScreen