import React from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  TextInput, Switch, KeyboardAvoidingView, Platform,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter, useLocalSearchParams } from 'expo-router'
import {
  useGetHelp,
  HELP_TOPICS,
  RESOLUTION_OPTIONS,
  HelpTopic,
} from '@/services/hooks/settings/useGetHelp'
import ResolutionOption from '@/components/settings/ResulationOption'
import BaseContainer from '@/components/shared/BaseContainer'

// ── Section label ──────────────────────────────────────────
const SectionLabel: React.FC<{ label: string }> = ({ label }) => (
  <Text className="text-xs font-bold text-gray-500 mb-2 mt-5">
    {label}
  </Text>
)

const GetHelpDetailScreen: React.FC = () => {
  const router = useRouter()
  const { topic, storeId } = useLocalSearchParams<{
    topic: HelpTopic
    storeId?: string
  }>()

  const {
    linkedOrderId,
    noOrderNumber,
    description, setDescription,
    photos,
    resolution, setResolution,
    isTimeSensitive, setIsTimeSensitive,
    orders,
    isValid,
    handleChangeTopic,
    handleLinkOrder,
    handleNoOrderNumber,
    handlePickPhoto,
    handleSubmit,
  } = useGetHelp(storeId)

  const topicMeta = HELP_TOPICS.find(t => t.topic === topic)

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
            Get Help
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        >
          {/* Selected topic pill */}
          <View className="flex-row items-center justify-between rounded-2xl px-4 py-3 mb-1"
            style={{ backgroundColor: topicMeta?.bgColor ?? '#F3F4F6' }}
          >
            <View className="flex-row items-center gap-2 flex-1">
              <Feather
                name={(topicMeta?.icon ?? 'help-circle') as any}
                size={15}
                color={topicMeta?.iconColor ?? '#6B7280'}
              />
              <Text
                className="text-sm font-bold flex-1"
                style={{ color: topicMeta?.iconColor ?? '#6B7280' }}
                numberOfLines={1}
              >
                {topic}
              </Text>
            </View>
            <TouchableOpacity onPress={handleChangeTopic}>
              <Text className="text-xs font-semibold text-gray-500 ml-3">Change</Text>
            </TouchableOpacity>
          </View>

          {/* ── LINK TO ORDER ── */}
          <SectionLabel label="Link to an order" />
          <View className="bg-white rounded-2xl px-4 shadow-sm overflow-hidden border border-gray-100">
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
                    linkedOrderId === order.id ? 'border-green-500' : 'border-gray-300'
                  }`}
                >
                  {linkedOrderId === order.id && (
                    <View className="w-2 h-2 rounded-full bg-green-500" />
                  )}
                </View>

                <View className="flex-1">
                  <Text className="text-sm font-bold text-gray-900">
                    Order {order.number}
                  </Text>
                  <Text className="text-xs text-gray-400 mt-0.5">
                    {order.date} · {order.storeName} · ${order.amount}
                  </Text>
                </View>

                {/* Shoe image placeholder */}
                <View className="w-10 h-10 rounded-lg bg-gray-100" />
              </TouchableOpacity>
            ))}
          </View>

          {/* No order number */}
          <TouchableOpacity
            onPress={handleNoOrderNumber}
            activeOpacity={0.7}
            className="flex-row items-center gap-2 mt-2 px-1"
          >
            <View
              className={`w-4 h-4 rounded border ${
                noOrderNumber ? 'bg-green-500 border-green-500' : 'border-gray-300'
              } items-center justify-center`}
            >
              {noOrderNumber && <Feather name="check" size={10} color="#fff" />}
            </View>
            <Text className="text-xs text-gray-500">I don't have an order number</Text>
          </TouchableOpacity>

          {/* ── DESCRIBE ISSUE ── */}
          <SectionLabel label="Describe your issue" />
          <View className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="What happened with your order? When did it occur..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              maxLength={1000}
              className="text-sm text-gray-700 leading-5"
              style={{ minHeight: 100 }}
            />
            <Text className="text-[11px] text-gray-300 text-right mt-1">
              {description.length}/1000
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
                {photo
                  ? <Feather name="check" size={18} color="#22C55E" />
                  : <Feather name="camera" size={18} color="#9CA3AF" />
                }
              </TouchableOpacity>
            ))}
          </View>
          <Text className="text-[11px] text-gray-400 mt-1.5">
            Add receipts, screenshots, or photos
          </Text>

          {/* ── RESOLUTION ── */}
          <SectionLabel label="What resolution are you looking for?" />
          <View className="gap-0">
            {RESOLUTION_OPTIONS.map((opt, i) => (
              <ResolutionOption
                key={opt}
                option={opt}
                selected={resolution === opt}
                onSelect={() => setResolution(opt)}
                isLast={i === RESOLUTION_OPTIONS.length - 1}
              />
            ))}
          </View>

          {/* ── TIME SENSITIVE ── */}
          <SectionLabel label="Is this time-sensitive?" />
          <View className="flex-row items-center justify-between bg-white rounded-2xl px-4 py-4 shadow-sm border border-gray-100">
            <Text className="text-sm text-gray-700">Mark as time-sensitive</Text>
            <Switch
              value={isTimeSensitive}
              onValueChange={setIsTimeSensitive}
              trackColor={{ false: '#E5E7EB', true: '#22C55E' }}
              thumbColor="#ffffff"
            />
          </View>

          {/* Disclaimer */}
          <Text className="text-[11px] text-gray-400 mt-4 leading-4 text-center px-4">
            Typical response: 2–4 hours for order issues · 24–48 hours for disputes.
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
              {isValid ? 'Submit' : 'Complete required fields'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </BaseContainer>
  )
}

export default GetHelpDetailScreen