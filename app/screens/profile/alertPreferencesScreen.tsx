// app/screens/discover/alertPreferencesScreen.tsx
import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, Switch, SafeAreaView } from 'react-native'
import { useRouter } from 'expo-router'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useAlertPreferences } from '@/services/hooks/profile/useAlertPreferences'
import GlobalAlertRow from '@/components/profile/following/GlobarAlertRow'
import StoreAlertRow from '@/components/profile/following/StoreAlertRow'
import BaseContainer from '@/components/shared/BaseContainer'
export default function AlertPreferencesScreen() {
    const router = useRouter()
    const { globals, stores, quietHours, setQuietHours, toggleGlobal, toggleStoreExpand, toggleStoreAlert } = useAlertPreferences()

    return (
        <BaseContainer scrollable backgroundColor='#fff'>
            <View className='pt-10'>
                <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100">
                    <TouchableOpacity onPress={() => router.back()} className="p-1 mr-3">
                        <Feather name="arrow-left" size={22} color="#111827" />
                    </TouchableOpacity>
                    <Text className="text-base font-bold text-gray-900">Alert Preferences</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

                    {/* Info banner */}
                    <View className="mx-4 mt-4 flex-row items-start gap-3 bg-green-50 border border-green-100 rounded-2xl p-4">
                        <Ionicons name="notifications-outline" size={18} color="#22C55E" style={{ marginTop: 1 }} />
                        <Text className="flex-1 text-xs text-green-700 font-medium leading-relaxed">
                            Control which alerts you get from each store. Never miss a drop.
                        </Text>
                    </View>

                    {/* ALL STORES */}
                    <Text className="mx-4 mt-5 mb-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        All Stores
                    </Text>
                    <View className="bg-white mx-4 rounded-2xl overflow-hidden shadow-sm">
                        {globals.map((g, i) => (
                            <GlobalAlertRow
                                key={g.id}
                                alert={g}
                                onToggle={() => toggleGlobal(g.id)}
                                isLast={i === globals.length - 1}
                            />
                        ))}
                    </View>

                    {/* Size filter notice */}
                    <View className="mx-4 mt-3 flex-row items-center gap-1.5">
                        <Ionicons name="resize-outline" size={13} color="#9CA3AF" />
                        <Text className="text-xs text-gray-400 flex-1">
                            Size filter: Alerts are showing items in Size 10.5 only.{' '}
                            <Text className="text-green-600 font-semibold">Change in size settings →</Text>
                        </Text>
                    </View>

                    {/* PER STORE */}
                    <Text className="mx-4 mt-5 mb-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Per Store
                    </Text>
                    <View className="bg-white mx-4 rounded-2xl overflow-hidden shadow-sm">
                        {stores.map((s, i) => (
                            <StoreAlertRow
                                key={s.storeId}
                                store={s}
                                onToggleExpand={() => toggleStoreExpand(s.storeId)}
                                onToggleAlert={alertId => toggleStoreAlert(s.storeId, alertId)}
                                isLast={i === stores.length - 1}
                            />
                        ))}
                    </View>

                    {/* QUIET HOURS */}
                    <Text className="mx-4 mt-5 mb-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Quiet Hours
                    </Text>
                    <View className="bg-white mx-4 rounded-2xl overflow-hidden shadow-sm">
                        <View className="flex-row items-center px-4 py-3.5 gap-3">
                            <View className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center">
                                <Ionicons name="moon-outline" size={18} color={quietHours ? '#22C55E' : '#9CA3AF'} />
                            </View>
                            <View className="flex-1">
                                <Text className="text-sm font-bold text-gray-900">Quiet Hours</Text>
                                <Text className="text-xs text-gray-400 mt-0.5">10 PM – 8 AM</Text>
                            </View>
                            <Switch
                                value={quietHours}
                                onValueChange={setQuietHours}
                                trackColor={{ false: '#E5E7EB', true: '#22C55E' }}
                                thumbColor="#fff"
                            />
                        </View>
                    </View>

                </ScrollView>
            </View>
        </BaseContainer>
    )
}