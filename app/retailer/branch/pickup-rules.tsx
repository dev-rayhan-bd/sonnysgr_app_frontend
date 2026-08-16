import React from 'react'
import {
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'
import { usePickupRules } from '@/services/hooks/retailer/home/usePickUpRules'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

type RuleToggleProps = {
  icon: keyof typeof Feather.glyphMap
  title: string
  subtitle: string
  value: boolean
  onChange: (value: boolean) => void
}

const RuleToggle: React.FC<RuleToggleProps> = ({
  icon,
  title,
  subtitle,
  value,
  onChange,
}) => (
  <View className="flex-row items-center gap-3 px-4 py-4">
    <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
      <Feather name={icon} size={17} color="#111827" />
    </View>

    <View className="flex-1 pr-2">
      <Text className="text-sm font-bold text-gray-900">{title}</Text>
      <Text className="text-xs text-gray-400 mt-0.5 leading-4">{subtitle}</Text>
    </View>

    <Switch
      value={value}
      onValueChange={onChange}
      trackColor={{ false: '#E5E7EB', true: '#22C55E' }}
      thumbColor="#FFFFFF"
    />
  </View>
)

const Divider = () => <View className="h-px bg-gray-100 mx-4" />

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text className="text-[10px] font-bold text-gray-400 tracking-[1.4px] uppercase mt-6 mb-2 px-4">
    {children}
  </Text>
)

export default function PickupRulesScreen() {
  const { rules, setField, windowOptions, handleSave } = usePickupRules()

  const toggleBlackoutDay = (day: string) => {
    const exists = rules.blackoutDays.includes(day)
    setField(
      'blackoutDays',
      exists
        ? rules.blackoutDays.filter((current) => current !== day)
        : [...rules.blackoutDays, day],
    )
  }

  return (
    <BaseContainer backgroundColor="#FFFFFF" scrollable>
      <View className="pt-10 pb-12">
        <View className="flex-row items-center px-4 py-4 border-b border-gray-100">
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather name="arrow-left" size={22} color="#111827" />
          </TouchableOpacity>

          <Text className="flex-1 text-center text-lg font-black text-gray-900">
            Pickup Rules
          </Text>

          <TouchableOpacity onPress={handleSave}>
            <Text className="text-sm font-extrabold text-green-500">Save</Text>
          </TouchableOpacity>
        </View>

        <View className="mx-4 mt-4 rounded-2xl bg-green-50 border border-green-100 px-4 py-4 flex-row gap-3">
          <View className="w-9 h-9 rounded-full bg-green-500 items-center justify-center">
            <Feather name="clock" size={16} color="#FFFFFF" />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-bold text-green-900">Custom pickup rules</Text>
            <Text className="text-xs text-green-700 mt-1 leading-5">
              Set how long customers have to collect reserved items and what happens when a pickup is missed.
            </Text>
          </View>
        </View>

        <SectionLabel>Pickup window</SectionLabel>
        <View className="mx-4 rounded-2xl bg-gray-50 p-3">
          <Text className="text-sm font-bold text-gray-900 mb-3">
            Customer has this long to pick up
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {windowOptions.map((option) => {
              const active = rules.pickupWindowHours === option.value
              return (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => setField('pickupWindowHours', option.value)}
                  activeOpacity={0.85}
                  className={`px-4 py-3 rounded-xl border ${
                    active
                      ? 'bg-gray-900 border-gray-900'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <Text
                    className={`text-xs font-bold ${
                      active ? 'text-white' : 'text-gray-600'
                    }`}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        <SectionLabel>Automation</SectionLabel>
        <View className="mx-4 rounded-2xl bg-white border border-gray-100 overflow-hidden">
          <RuleToggle
            icon="rotate-ccw"
            title="Auto-refund deposit"
            subtitle="Refund the hold deposit automatically when the pickup window expires."
            value={rules.autoRefundDeposit}
            onChange={(value) => setField('autoRefundDeposit', value)}
          />
          <Divider />
          <RuleToggle
            icon="bell"
            title="Send pickup reminder"
            subtitle="Remind the customer before their collection window ends."
            value={rules.sendReminder}
            onChange={(value) => setField('sendReminder', value)}
          />
          <Divider />
          <RuleToggle
            icon="refresh-cw"
            title="Auto-restock missed pickups"
            subtitle="Return the item to available inventory after an expired pickup."
            value={rules.autoRestock}
            onChange={(value) => setField('autoRestock', value)}
          />
        </View>

        <SectionLabel>Blackout days</SectionLabel>
        <View className="mx-4 rounded-2xl bg-gray-50 p-4">
          <Text className="text-xs text-gray-500 mb-3 leading-5">
            Select days when customers cannot schedule or complete an in-store pickup.
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {DAYS.map((day) => {
              const active = rules.blackoutDays.includes(day)
              return (
                <TouchableOpacity
                  key={day}
                  onPress={() => toggleBlackoutDay(day)}
                  activeOpacity={0.85}
                  className={`w-[44px] h-[44px] rounded-full items-center justify-center border ${
                    active
                      ? 'bg-gray-900 border-gray-900'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <Text
                    className={`text-[11px] font-bold ${
                      active ? 'text-white' : 'text-gray-600'
                    }`}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        <SectionLabel>Pickup instructions</SectionLabel>
        <View className="mx-4 rounded-2xl bg-gray-50 p-4">
          <TextInput
            value={rules.instructions}
            onChangeText={(value) => setField('instructions', value)}
            placeholder="e.g. Bring your QR code and a valid photo ID. Pickups are available at the front counter."
            placeholderTextColor="#9CA3AF"
            multiline
            textAlignVertical="top"
            maxLength={300}
            className="text-sm text-gray-800 leading-5"
            style={{ minHeight: 112 }}
          />
          <Text className="text-[10px] text-gray-400 text-right mt-2">
            {rules.instructions.length}/300
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleSave}
          activeOpacity={0.85}
          className="mx-4 mt-8 h-14 rounded-2xl bg-gray-900 items-center justify-center"
        >
          <Text className="text-white text-sm font-black">Save Pickup Rules</Text>
        </TouchableOpacity>
      </View>
    </BaseContainer>
  )
}
