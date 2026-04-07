// app/screens/store/radiusPromotionScreen.tsx
import React from 'react'
import {
    View, Text, TouchableOpacity,
    ScrollView, TextInput,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useRadiusPromotion } from '@/services/hooks/retailer/promote/useRadiusPromotion'
import RadiusMap from '@/components/retailer/promote/RadiusMap'
import type { RadiusOption } from '@/services/hooks/retailer/promote/useRadiusPromotion'
import BaseContainer from '@/components/shared/BaseContainer'
const RADIUS_OPTIONS: RadiusOption[] = [5, 10, 25]

export default function RadiusPromotionScreen() {
    const router = useRouter()
    const {
        selectedRadius, setSelectedRadius,
        message, setMessage,
        estimatedCustomers, loading, handleSend,
    } = useRadiusPromotion()

    return (
        <BaseContainer scrollable backgroundColor='#fff'>
            <View className='pt-10'>
                {/* Nav */}
                <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100">
                    <TouchableOpacity onPress={() => router.back()} className="p-1 mr-3">
                        <Feather name="arrow-left" size={22} color="#111827" />
                    </TouchableOpacity>
                    <Text className="flex-1 text-base font-bold text-gray-900">Radius Promotion</Text>
                    <View style={{ width: 30 }} />
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 120 }}
                >
                    <View className="pt-5">

                        {/* Info banner */}
                        <View className="mx-4 mb-4 flex-row items-start gap-2 bg-green-50 border border-green-100 rounded-2xl px-4 py-3">
                            <Ionicons name="location-outline" size={16} color="#22C55E" style={{ marginTop: 1 }} />
                            <Text className="flex-1 text-xs text-green-700 font-medium leading-relaxed">
                                Target nearby customers who haven't followed you yet. Great for foot traffic.
                            </Text>
                        </View>

                        {/* Map visualization */}
                        <RadiusMap radius={selectedRadius} />

                        {/* Radius selector */}
                        <View className="px-4 mt-4">
                            <Text className="text-sm font-bold text-gray-700 mb-3">Target Radius</Text>
                            <View className="flex-row gap-2 mb-3">
                                {RADIUS_OPTIONS.map(r => (
                                    <TouchableOpacity
                                        key={r}
                                        onPress={() => setSelectedRadius(r)}
                                        className={`flex-1 py-2.5 rounded-xl items-center border ${selectedRadius === r
                                                ? 'bg-green-500 border-green-500'
                                                : 'bg-white border-gray-200'
                                            }`}
                                    >
                                        <Text className={`text-sm font-bold ${selectedRadius === r ? 'text-white' : 'text-gray-700'
                                            }`}>
                                            {r} miles
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* Estimated count */}
                            <View className="flex-row items-center gap-2 mb-5">
                                <Ionicons name="people-outline" size={15} color="#22C55E" />
                                <Text className="text-sm text-gray-600">
                                    ~<Text className="font-extrabold text-gray-900">
                                        {estimatedCustomers.toLocaleString()}
                                    </Text> customers in range
                                </Text>
                            </View>

                            {/* Message */}
                            <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                                Promotion Message
                            </Text>

                            <View className="bg-white rounded-2xl border border-gray-100 px-4 py-3 mb-2">
                                <TextInput
                                    placeholder="e.g. Come visit us! 20% off today only"
                                    placeholderTextColor="#9CA3AF"
                                    value={message}
                                    onChangeText={setMessage}
                                    className="text-sm text-gray-700"
                                />
                            </View>

                            <View className="bg-white rounded-2xl border border-gray-100 px-4 py-3 mb-4">
                                <TextInput
                                    placeholder="We're 1.2 miles away and ready for you!"
                                    placeholderTextColor="#9CA3AF"
                                    value={message}
                                    onChangeText={setMessage}
                                    multiline
                                    style={{ textAlignVertical: 'top', minHeight: 50 }}
                                    className="text-sm text-gray-700"
                                />
                            </View>

                            {/* Beta notice */}
                            <View className="flex-row items-center gap-2 bg-gray-100 rounded-xl px-3 py-2.5 mb-2">
                                <Ionicons name="gift-outline" size={14} color="#6B7280" />
                                <Text className="text-xs text-gray-500 flex-1">
                                    Free during beta · Limited to 3/month
                                </Text>
                            </View>
                            <Text className="text-xs text-gray-400 mb-6">
                                Your balance: 2 remaining this month
                            </Text>
                        </View>
                    </View>
                </ScrollView>

                {/* Bottom CTA */}
                <View className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-3 bg-white border-t border-gray-100">
                    <TouchableOpacity
                        onPress={() => handleSend(() => router.push('/retailerTabs/promote'))}
                        disabled={loading}
                        activeOpacity={0.85}
                        className="bg-green-500 py-4 rounded-2xl items-center"
                    >
                        <Text className="text-white text-sm font-extrabold">
                            {loading
                                ? 'Sending...'
                                : `Send to ~${estimatedCustomers.toLocaleString()} people`
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BaseContainer>
    )
}