// screens/WantedPairsScreen.tsx
import React from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

import { useWantedPairs } from '@/services/hooks/profile/useWantedPairs'
import { SneakerCard } from '@/components/profile/waitlist/SneakerCard'
import { FilterTabs } from '@/components/profile/waitlist/FilterTabs'
import BaseContainer from '@/components/shared/BaseContainer'

export const WantedPairsScreen: React.FC = () => {
  const router = useRouter()

  const {
    pairs,
    allPairs,
    activeTab,
    setActiveTab,
    stats,
    toggleAlert,
    handleInfoPress,
    handleAvailableNowPress,
    handleCardPress,
    manageAlerts,
  } = useWantedPairs(router)

  return (
    <BaseContainer scrollable backgroundColor="#fff">
      <View className="flex-1 pt-10">
        
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-50">
          <TouchableOpacity onPress={() => router.back()} className="w-9 items-center">
            <Ionicons name="chevron-back" size={28} color="#1a1a1a" />
          </TouchableOpacity>
          
          <Text className="text-[17px] font-bold text-gray-900">Wanted Pairs</Text>
          
          <TouchableOpacity onPress={handleInfoPress} className="w-9 items-center">
            <Ionicons name="information-circle-outline" size={22} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* Info Banner */}
        <View className="flex-row items-center bg-green-50 mx-4 mt-3 mb-1 rounded-xl p-3 border border-green-200 gap-x-3">
          <Ionicons name="notifications" size={18} color="#22c55e" />
          <Text className="flex-1 text-[12px] text-green-800 leading-4 font-medium">
            Mark a sneaker as Wanted and we'll alert you the moment it's back in your size at a
            nearby store.
          </Text>
          <TouchableOpacity>
            <Ionicons name="close" size={18} color="#166534" />
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View className="flex-row bg-white mx-4 my-3 rounded-xl py-4 items-center shadow-sm border border-gray-100">
          <View className="flex-1 items-center">
            <Text className="text-2xl font-black text-gray-900">{stats.wanted}</Text>
            <Text className="text-[11px] text-gray-400 mt-0.5 font-bold uppercase tracking-wider">Wanted</Text>
          </View>
          
          <View className="w-[1px] h-8 bg-gray-100" />
          
          <View className="flex-1 items-center">
            <Text className="text-2xl font-black text-green-500">{stats.availableNow}</Text>
            <Text className="text-[11px] text-gray-400 mt-0.5 font-bold uppercase tracking-wider">In Stock</Text>
          </View>
          
          <View className="w-[1px] h-8 bg-gray-100" />
          
          <View className="flex-1 items-center">
            <Text className="text-2xl font-black text-gray-900">{stats.watching}</Text>
            <Text className="text-[11px] text-gray-400 mt-0.5 font-bold uppercase tracking-wider">Watching</Text>
          </View>
        </View>

        {/* Filter Tabs */}
        <FilterTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          availableCount={allPairs.length}
        />

        {/* List */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        >
          {pairs.length === 0 ? (
            <View className="items-center pt-20 gap-y-3">
              <MaterialCommunityIcons name="shoe-sneaker" size={64} color="#e5e7eb" />
              <View className="items-center">
                <Text className="text-lg font-bold text-gray-900">No pairs here</Text>
                <Text className="text-[13px] text-gray-400 text-center px-10 mt-1">
                  {activeTab === 'All'
                    ? 'Add sneakers to your Wanted list to start tracking stock nearby.'
                    : `No pairs match the "${activeTab}" filter right now.`}
                </Text>
              </View>
            </View>
          ) : (
            pairs.map(pair => (
              <SneakerCard
                key={pair.id}
                pair={pair}
                onPress={handleCardPress}
                onAvailableNowPress={handleAvailableNowPress}
                onToggleAlert={toggleAlert}
                onManageAlerts={manageAlerts}
              />
            ))
          )}
        </ScrollView>

      </View>
    </BaseContainer>
  )
}

export default WantedPairsScreen