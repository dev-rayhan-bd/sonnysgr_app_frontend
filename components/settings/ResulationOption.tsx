import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ResolutionOption as ResolutionType } from '@/services/hooks/settings/useGetHelp'

interface Props {
  option: ResolutionType
  selected: boolean
  onSelect: () => void
  isLast: boolean
}

const ResolutionOption: React.FC<Props> = ({ option, selected, onSelect, isLast }) => (
  <>
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.8}
      className={`flex-row items-center gap-3 py-4 px-4 rounded-2xl ${
        selected ? 'bg-green-50 border border-green-300' : 'bg-white border border-gray-100'
      }`}
    >
      {/* Radio */}
      <View
        className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
          selected ? 'border-green-500' : 'border-gray-300'
        }`}
      >
        {selected && (
          <View className="w-2.5 h-2.5 rounded-full bg-green-500" />
        )}
      </View>

      <Text
        className={`text-sm font-semibold flex-1 ${
          selected ? 'text-green-700' : 'text-gray-800'
        }`}
      >
        {option}
      </Text>
    </TouchableOpacity>

    {!isLast && <View className="h-2" />}
  </>
)

export default ResolutionOption