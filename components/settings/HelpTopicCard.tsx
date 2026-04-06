import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { HelpTopicOption } from '@/services/hooks/settings/useGetHelp'

interface Props {
  option: HelpTopicOption
  onPress: () => void
}

const HelpTopicCard: React.FC<Props> = ({ option, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    className="flex-1 rounded-2xl p-4 min-h-[100px] justify-between"
    style={{ backgroundColor: option.bgColor }}
  >
    {/* Icon */}
    <View
      className="w-8 h-8 rounded-xl items-center justify-center mb-3"
      style={{ backgroundColor: option.iconColor + '20' }}
    >
      <Feather name={option.icon as any} size={16} color={option.iconColor} />
    </View>

    {/* Text */}
    <View>
      <Text className="text-sm font-extrabold text-gray-900 mb-0.5">
        {option.topic}
      </Text>
      <Text className="text-[11px] text-gray-500 leading-4">
        {option.subtitle}
      </Text>
    </View>
  </TouchableOpacity>
)

export default HelpTopicCard