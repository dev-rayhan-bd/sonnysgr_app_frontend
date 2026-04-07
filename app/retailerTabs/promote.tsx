// app/screens/store/promote.tsx
import React from 'react'
import {
    View, Text, TouchableOpacity, ScrollView, TextInput,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { useCreatePromotion } from '@/services/hooks/retailer/promote/useCreatePromotion'
import PromotionTypeCard from '@/components/retailer/promote/PromotionTypeCard'
import AudienceOptionCard from '@/components/retailer/promote/AdvanceOptionCard'
import BaseContainer from '@/components/shared/BaseContainer'
import Button from '@/components/shared/Button'
export default function promote() {
    const router = useRouter()
    const {
        promotionTypes, audienceOptions,
        selectedType, setSelectedType,
        title, setTitle,
        message, setMessage,
        selectedAudience, setSelectedAudience,
        estimatedReach, canPreview,
        handlePreview,
    } = useCreatePromotion()

    return (
        <BaseContainer scrollable backgroundColor='#fff'>
            <View className='pt-10' style={{ paddingBottom: 120 }}>
                <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100">
                    <TouchableOpacity onPress={() => router.back()} className="p-1 mr-3">
                        <Feather name="arrow-left" size={22} color="#111827" />
                    </TouchableOpacity>
                    <Text className="flex-1 text-base font-bold text-gray-900">Create Promotion</Text>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 120 }}
                >
                    <View className="px-4 pt-5">

                        {/* Promotion type */}
                        <Text className="text-base font-extrabold text-gray-900 mb-3">
                            What type of promotion?
                        </Text>
                        {promotionTypes.map((opt, i) => (
                            <PromotionTypeCard
                                key={opt.id}
                                option={opt}
                                selected={selectedType === opt.id}
                                onSelect={() => setSelectedType(opt.id)}
                                isLast={i === promotionTypes.length - 1}
                            />
                        ))}

                        {/* Details */}
                        <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-5 mb-3">
                            Promotion Details
                        </Text>

                        {/* Title */}
                        <View className="bg-white rounded-2xl border border-gray-100 px-4 py-3 mb-2">
                            <TextInput
                                placeholder="e.g. Weekend Flash Sale — 20% Off Jordans"
                                placeholderTextColor="#9CA3AF"
                                value={title}
                                onChangeText={setTitle}
                                maxLength={80}
                                className="text-sm text-gray-900"
                            />
                        </View>
                        <Text className="text-xs text-gray-400 text-right mb-2">{title.length}/80</Text>

                        {/* Message */}
                        <View className="bg-white rounded-2xl border border-gray-100 px-4 py-3 mb-1">
                            <TextInput
                                placeholder="Write your message here... Keep it short and exciting!"
                                placeholderTextColor="#9CA3AF"
                                value={message}
                                onChangeText={setMessage}
                                multiline
                                maxLength={200}
                                style={{ textAlignVertical: 'top', minHeight: 70 }}
                                className="text-sm text-gray-900"
                            />
                        </View>
                        <Text className="text-xs text-gray-400 text-right mb-1">{message.length}/200</Text>
                        <Text className="text-xs text-gray-400 mb-5">📲 Appears as a push notification</Text>

                        {/* Audience */}
                        <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                            Who Gets This?
                        </Text>
                        {audienceOptions.map(opt => (
                            <AudienceOptionCard
                                key={opt.id}
                                option={opt}
                                selected={selectedAudience === opt.id}
                                onSelect={() => setSelectedAudience(opt.id)}
                            />
                        ))}

                        {/* Estimated reach */}
                        <Text className="text-xs text-gray-400 mt-2">
                            Estimated reach: <Text className="text-green-500 font-bold">{estimatedReach} people</Text>
                        </Text>
                    </View>
                </ScrollView>
                <View className="px-10">
                <Button
                    text="Preview & Send"
                    onPress={() =>
                        handlePreview(() =>
                            router.push('/screens/retailer/promote/promotionPreviewScreen')
                        )
                    }
                    disabled={!canPreview}
                    backgroundColor={canPreview ? '#111827' : '#E5E7EB'} // gray-900 / gray-200
                    textColor={canPreview ? '#FFFFFF' : '#9CA3AF'} // white / gray-400
                    borderRadius={16} // matches rounded-2xl
                    paddingVertical={16}
                />
</View>
            </View>
        </BaseContainer>
    )
}