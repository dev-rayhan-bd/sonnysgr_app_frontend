import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { useFollowing } from '@/services/hooks/profile/useFollowing'
import FollowingTabs from '@/components/profile/following/FollowingTabs'
import AlertFilterChips from '@/components/profile/following/AlertFilterChips'
import StoreRow from '@/components/profile/following/StoreRow'
import BrandCard from '@/components/profile/following/BrandCard'
import BaseContainer from '@/components/shared/BaseContainer'

export default function FollowingScreen() {
  const router = useRouter()
  const {
    stores, brands,
    activeTab, setActiveTab,
    activeAlertFilters, toggleAlertFilter,
    toggleStoreNotification,
    storeCount, brandCount,
  } = useFollowing()

  return (
    <BaseContainer backgroundColor='#fff'>
      <View className="pt-10">
        {/* Nav */}
        <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100">
          <TouchableOpacity onPress={() => router.back()} className="p-1 mr-3">
            <Feather name="arrow-left" size={22} color="#111827" />
          </TouchableOpacity>
          <Text className="flex-1 text-base font-bold text-gray-900 text-center">Following</Text>
          <TouchableOpacity onPress={() => router.push('/screens/profile/alertPreferencesScreen')}>
            <Feather name="settings" size={20} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <FollowingTabs
          activeTab={activeTab}
          counts={{ Stores: storeCount, Brands: brandCount }}
          onChange={setActiveTab}
        />
      </View>

      {/* Stores */}
      {activeTab === 'Stores' && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <AlertFilterChips active={activeAlertFilters} onToggle={toggleAlertFilter} />
          <View className="bg-white mx-4 rounded-2xl overflow-hidden shadow-sm">
            {stores.map((s, i) => (
              <StoreRow
                key={s.id}
                store={s}
                isLast={i === stores.length - 1}
                onToggleNotif={() => toggleStoreNotification(s.id)}
                onVisit={() => router.push(`/screens/store/storeProfileScreen?id=${s.id}`)}
              />
            ))}
          </View>
        </ScrollView>
      )}

      {/* Brands */}
      {activeTab === 'Brands' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 12 }}>
          <View className="flex-row flex-wrap">
            {brands.map(b => (
              <View key={b.id} style={{ width: '50%' }}>
                <BrandCard brand={b} onPress={() => { }} />
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </BaseContainer>
  )
}