import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { ReportTopicOption } from '@/services/hooks/store/useReportStore'

interface Props {
  option: ReportTopicOption
  onPress: () => void
  isLast: boolean
}

const ReportTopicRow: React.FC<Props> = ({ option, onPress, isLast }) => (
  <>
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      className="flex-row items-center gap-4 py-4"
    >
      {/* Icon circle */}
      <View
        className="w-10 h-10 rounded-full items-center justify-center shrink-0"
        style={{ backgroundColor: option.color + '15' }}
      >
        <Feather name={option.icon as any} size={18} color={option.color} />
      </View>

      {/* Text */}
      <View className="flex-1">
        <Text className="text-sm font-bold text-gray-900">{option.topic}</Text>
        <Text className="text-xs text-gray-400 mt-0.5 leading-4">{option.subtitle}</Text>
      </View>

      {/* Arrow */}
      <Feather name="chevron-right" size={16} color="#D1D5DB" />
    </TouchableOpacity>

    {!isLast && <View className="h-px bg-gray-100 ml-14" />}
  </>
)

export default ReportTopicRow