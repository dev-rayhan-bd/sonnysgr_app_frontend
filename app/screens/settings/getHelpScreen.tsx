import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { HELP_TOPICS,useGetHelp } from '@/services/hooks/settings/useGetHelp'
import HelpTopicCard from '@/components/settings/HelpTopicCard'
import BaseContainer from '@/components/shared/BaseContainer'

const GetHelpScreen: React.FC = () => {
  const router = useRouter()
  const { storeId } = useLocalSearchParams<{ storeId?: string }>()
  const { handleTopicSelect, handleSomethingElse } = useGetHelp(storeId)

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
          Get Help
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      >
        <Text className="text-base font-bold text-gray-900 mb-4">
          What do you need help with?
        </Text>

        {/* 2x2 grid */}
        <View className="gap-3">
          <View className="flex-row gap-3">
            <HelpTopicCard
              option={HELP_TOPICS[0]}
              onPress={() => handleTopicSelect(HELP_TOPICS[0].topic)}
            />
            <HelpTopicCard
              option={HELP_TOPICS[1]}
              onPress={() => handleTopicSelect(HELP_TOPICS[1].topic)}
            />
          </View>
          <View className="flex-row gap-3">
            <HelpTopicCard
              option={HELP_TOPICS[2]}
              onPress={() => handleTopicSelect(HELP_TOPICS[2].topic)}
            />
            <HelpTopicCard
              option={HELP_TOPICS[3]}
              onPress={() => handleTopicSelect(HELP_TOPICS[3].topic)}
            />
          </View>
        </View>

        {/* Something else */}
        <TouchableOpacity
          onPress={handleSomethingElse}
          activeOpacity={0.7}
          className="mt-5 items-center py-2"
        >
          <Text className="text-sm font-semibold text-green-500">
            Something else →
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </BaseContainer>
  )
}

export default GetHelpScreen