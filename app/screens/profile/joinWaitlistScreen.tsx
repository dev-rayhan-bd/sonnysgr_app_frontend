// screens/JoinWaitlistScreen.tsx
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Image,
  ActivityIndicator,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import BaseContainer from '@/components/shared/BaseContainer'
import { useJoinWaitlist, WaitlistProduct } from '@/services/hooks/profile/useJoinWaitlist'
import { WaitlistSteps } from '@/components/profile/waitlist/WishListSteps'
import { NotifyLocationSelector } from '@/components/profile/waitlist/NotifyLocationSelector'

const MOCK_PRODUCT: WaitlistProduct = {
  id: 'mock-1',
  brand: 'JORDAN',
  name: "Air Jordan 4 'Black Cat'",
  size: '10.5',
  gender: "Men's",
  waitingCount: 47,
  demand: 'high',
}

const BENEFITS = [
  'We monitor all nearby stores for your size',
  'You get first-priority notification when restocked',
  'Your spot in line is saved — first joined, first notified',
  'You can cancel anytime',
]

export const JoinWaitlistScreen: React.FC = () => {
  const router = useRouter()

  const params = useLocalSearchParams<{ product?: string }>()
  const product: WaitlistProduct = params.product
    ? (JSON.parse(params.product) as WaitlistProduct)
    : MOCK_PRODUCT

  const {
    notifyLocation,
    alertPriceDrop,
    loading,
    joined,
    handleSelectLocation,
    handleTogglePriceDrop,
    handleChooseStores,
    handleJoinWaitlist,
    handleLeaveWaitlist,
  } = useJoinWaitlist(product)

  // Dynamic values for the demand bar
  const demandColorClass = 
    product.demand === 'high' ? 'bg-red-500' : 
    product.demand === 'medium' ? 'bg-amber-500' : 'bg-green-500';
  
  const demandTextClass = 
    product.demand === 'high' ? 'text-red-500' : 
    product.demand === 'medium' ? 'text-amber-500' : 'text-green-500';

  const progressWidth = Math.min((product.waitingCount / 100) * 100, 100);

  return (
    <BaseContainer scrollable backgroundColor="#fff">
      <View className="flex-1 pt-10">
        
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-50">
          <TouchableOpacity onPress={() => router.back()} className="w-9 items-center">
            <Ionicons name="chevron-back" size={28} color="#1a1a1a" />
          </TouchableOpacity>
          <Text className="text-[17px] font-bold text-gray-900">Join Waitlist</Text>
          <View className="w-9" />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Product Hero */}
          <View className="bg-white rounded-2xl p-5 items-center mb-4 shadow-sm border border-gray-50">
            <View className="bg-red-500 rounded-md px-3 py-1.5 mb-3">
              <Text className="text-white font-black text-[10px] tracking-widest">SOLD OUT</Text>
            </View>

            {product.imageUrl ? (
              <Image
                source={{ uri: product.imageUrl }}
                className="w-36 h-24 mb-3"
                resizeMode="contain"
              />
            ) : (
              <View className="w-36 h-24 items-center justify-center mb-3 bg-gray-100 rounded-xl">
                 <Ionicons name="footsteps-outline" size={48} color="#9ca3af" />
              </View>
            )}

            <Text className="text-lg font-black text-gray-900 text-center mb-1">{product.name}</Text>
            <Text className="text-xs text-gray-400 text-center">
              Size {product.size} {product.gender} — Sold out at all nearby stores
            </Text>
          </View>

          {/* Steps */}
          <WaitlistSteps />

          {/* Benefits Box */}
          <View className="bg-green-50 rounded-xl p-4 mb-4 border border-green-200 gap-y-2">
            {BENEFITS.map((benefit, i) => (
              <View key={i} className="flex-row gap-x-2 items-start">
                <Ionicons name="checkmark-circle" size={16} color="#22c55e" style={{ marginTop: 2 }} />
                <Text className="flex-1 text-[13px] text-green-800 leading-5">{benefit}</Text>
              </View>
            ))}
          </View>

          {/* Demand Bar */}
          <View className="bg-white rounded-xl p-4 mb-5 shadow-sm border border-gray-50 gap-y-1.5">
            <Text className="text-[13px] text-gray-800 font-semibold">
              {product.waitingCount} people are waiting for this size
            </Text>
            <View className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <View 
                className={`h-full rounded-full ${demandColorClass}`} 
                style={{ width: `${progressWidth}%` }} 
              />
            </View>
            {product.demand === 'high' && (
              <View className="flex-row items-center gap-x-1">
                <Ionicons name="flame" size={14} color="#ef4444" />
                <Text className={`text-[12px] font-bold ${demandTextClass}`}>High demand</Text>
              </View>
            )}
          </View>

          {/* Notify Location Selector */}
          <NotifyLocationSelector
            selected={notifyLocation}
            onSelect={handleSelectLocation}
            onChooseStores={handleChooseStores}
          />

          {/* Price Drop Toggle */}
          <View className="flex-row items-center justify-between bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-50">
            <View className="flex-row items-center gap-x-2">
              <Ionicons name="trending-down" size={18} color="#1a1a1a" />
              <Text className="text-sm font-semibold text-gray-900">Also alert me if price drops</Text>
            </View>
            <Switch
              value={alertPriceDrop}
              onValueChange={handleTogglePriceDrop}
              trackColor={{ false: '#e0e0e0', true: '#22c55e' }}
              thumbColor="#fff"
            />
          </View>

          <Text className="text-[11px] text-gray-400 text-center mt-1">Already on 3 other waitlists</Text>
        </ScrollView>

        {/* CTA Button Container */}
        <View className="p-4 bg-white border-t border-gray-100">
          {joined ? (
            <View className="gap-y-2.5">
              <View className="bg-green-50 rounded-xl py-3.5 items-center border-[1.5px] border-green-500 flex-row justify-center gap-x-2">
                <Ionicons name="checkmark-done" size={20} color="#166534" />
                <Text className="text-green-800 font-bold text-sm">
                  You're on the waitlist for Size {product.size}
                </Text>
              </View>
              <TouchableOpacity
                className="rounded-xl py-3 items-center border-[1.5px] border-red-500"
                onPress={handleLeaveWaitlist}
                activeOpacity={0.8}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#ef4444" />
                ) : (
                  <Text className="text-red-500 font-bold text-sm">Leave Waitlist</Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              className={`bg-green-500 rounded-2xl py-4 flex-row items-center justify-center gap-x-2 ${loading ? 'opacity-70' : ''}`}
              onPress={handleJoinWaitlist}
              activeOpacity={0.85}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Ionicons name="notifications" size={20} color="#fff" />
                  <Text className="text-black font-black text-base">
                    Join Waitlist for Size {product.size}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </BaseContainer>
  )
}

export default JoinWaitlistScreen