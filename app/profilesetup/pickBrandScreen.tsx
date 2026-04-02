import React from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { usePickBrands } from '@/services/hooks/profilesetup/usePickBrands'
import BrandCard from '@/components/profilesetup/BrandCard'
import Button from '@/components/shared/Button'
import BaseContainer from '@/components/shared/BaseContainer'

const NUM_COLUMNS = 3

export default function PickBrandsScreen() {
    const router = useRouter()
    const params = useLocalSearchParams<{ brands?: string }>()

    const {
        brands,
        selectedIds,
        setSelectedIds,
        search,
        setSearch,
        toggleBrand,
        handleContinue,
        loading,
        selectedCount,
    } = usePickBrands()

    // Preselect brands from params
    React.useEffect(() => {
        if (params.brands) {
            const paramIds = params.brands.split(',')
            setSelectedIds(new Set(paramIds))
        }
    }, [params.brands, setSelectedIds])

    const onContinue = () => {
        if (params.brands) {
            // Came from profile edit → save then go back
            handleContinue(() => router.back())
        } else {
            // Came from onboarding → go to next screen
            handleContinue(() => router.push('/tabs/discoverScreen'))
        }
    }

    const rows: typeof brands[] = []
    for (let i = 0; i < brands.length; i += NUM_COLUMNS) {
        rows.push(brands.slice(i, i + NUM_COLUMNS))
    }

    return (
        <BaseContainer backgroundColor="#fff" scrollable>
            <View className="flex-1 justify-center px-6 pt-20">
                <View className="mb-5">
                    <Text className="text-3xl font-extrabold text-gray-900 mb-1">Pick your brands</Text>
                    <Text className="text-sm text-gray-500 leading-5">
                        See drops and restocks from the brands you actually wear.
                    </Text>
                </View>

                <View className="flex-row items-center gap-2 mb-4">
                    <View className="flex-1 flex-row items-center bg-gray-100 rounded-xl px-3 py-2 border border-gray-200">
                        <Text className="text-sm mr-2">🔍</Text>
                        <TextInput
                            className="flex-1 text-sm text-gray-900 p-0"
                            placeholder="Search brands..."
                            placeholderTextColor="#9CA3AF"
                            value={search}
                            onChangeText={setSearch}
                            returnKeyType="search"
                        />
                    </View>
                    {selectedCount > 0 && (
                        <View className="bg-gray-900 rounded-full px-3 py-1">
                            <Text className="text-xs font-bold text-white">{selectedCount} selected</Text>
                        </View>
                    )}
                </View>

                <ScrollView className="mb-4">
                    {rows.map((row, rowIndex) => (
                        <View key={rowIndex} className="flex-row gap-2 mb-2">
                            {row.map(brand => (
                                <BrandCard
                                    key={brand.id}
                                    brand={brand}
                                    selected={selectedIds.has(brand.id)}
                                    onPress={toggleBrand}
                                />
                            ))}
                            {row.length < NUM_COLUMNS &&
                                Array.from({ length: NUM_COLUMNS - row.length }).map((_, i) => (
                                    <View key={`empty-${i}`} className="flex-1" />
                                ))}
                        </View>
                    ))}

                    <View className="flex-row gap-2 mb-2">
                        <TouchableOpacity className="flex-1 aspect-square rounded-xl border border-dashed border-gray-300 bg-gray-100 items-center justify-center gap-1">
                            <Text className="text-lg text-gray-500 font-light">+</Text>
                            <Text className="text-[10px] font-semibold text-gray-500 text-center">More brands</Text>
                        </TouchableOpacity>
                        <View className="flex-1" />
                        <View className="flex-1" />
                    </View>
                </ScrollView>

                <View className="px-5 pb-7 pt-3 items-center gap-2">
                    <Button
                        text={loading ? 'Saving...' : 'Continue'}
                        onPress={onContinue}
                        disabled={selectedCount === 0 || loading}
                        variant="solid"
                        backgroundColor="#111827"
                        height={56}
                        borderRadius={14}
                        fontSize={16}
                        fontWeight="700"
                        opacity={selectedCount === 0 || loading ? 0.5 : 1}
                        style={{ flex: 0, alignSelf: 'stretch' }}
                    />
                    {!params.brands && (
                        <TouchableOpacity
                            className="py-1"
                            onPress={() => router.push('/')}
                            activeOpacity={0.7}
                            disabled={loading}
                        >
                            <Text className="text-xs font-medium text-gray-400">Skip for now</Text>
                        </TouchableOpacity>
                    )}
                    <Text className="text-[11px] text-gray-300 text-center">
                        You can change this anytime in Settings
                    </Text>
                </View>
            </View>
        </BaseContainer>
    )
}