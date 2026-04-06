import React from 'react'
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Switch,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useSellToStore } from '@/services/hooks/store/useSellToStore'
import ConditionGrid from '@/components/store/ConditionGrid'
import PhotoGrid from '@/components/store/PhotoGrid'
import RadiusPicker from '@/components/store/RadiusPicker'
import BaseContainer from '@/components/shared/BaseContainer'

// ── Section label ──────────────────────────────────────────
const SectionLabel: React.FC<{ label: string }> = ({ label }) => (
    <Text className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-3 mt-6">
        {label}
    </Text>
)

// ── Divider ────────────────────────────────────────────────
const Divider = () => <View className="h-px bg-gray-100 my-1" />

// ── Main screen ────────────────────────────────────────────
const SellToStoreScreen: React.FC = () => {
    const {
        shoeName, setShoeName,
        condition, setCondition,
        price, setPrice,
        photos,
        details, setDetails,
        visible, setVisible,
        radius, setRadius,
        isValid,
        submitted,
        handlePickPhoto,
        handleSubmit,
        goBack,
    } = useSellToStore()

    return (
        <BaseContainer backgroundColor="#fff">
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                {/* Header */}
                <View className="flex-row items-center px-4 pt-12 pb-4 bg-white">
                    <TouchableOpacity
                        onPress={goBack}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Feather name="arrow-left" size={22} color="#111827" />
                    </TouchableOpacity>
                    <Text className="text-lg font-extrabold text-gray-900 ml-3">
                        Sell to a Store
                    </Text>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
                >
                    {/* Info banner */}
                    <View className="bg-green-50 border border-green-200 rounded-2xl p-4 flex-row gap-3 mb-2">
                        <Feather name="info" size={16} color="#22C55E" style={{ marginTop: 1 }} />
                        <Text className="flex-1 text-sm text-green-700 leading-5">
                            Submit a pair you own. Nearby stores can browse and make you an offer.
                        </Text>
                    </View>

                    {/* ── SHOE DETAILS ── */}
                    <SectionLabel label="Shoe Details" />
                    <View className="bg-white rounded-2xl px-4 py-3 shadow-sm gap-3">
                        {/* Shoe name search */}
                        <View className="flex-row items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5">
                            <Feather name="search" size={15} color="#9CA3AF" />
                            <TextInput
                                value={shoeName}
                                onChangeText={setShoeName}
                                placeholder="e.g. Air Jordan 4 'Black Cat'"
                                placeholderTextColor="#9CA3AF"
                                className="flex-1 text-sm text-gray-900"
                            />
                        </View>

                        <Divider />

                        {/* Condition grid */}
                        <ConditionGrid selected={condition} onSelect={setCondition} />

                        <Divider />

                        {/* Price */}
                        <View className="flex-row items-center gap-2 py-1">
                            <Text className="text-lg font-bold text-gray-400">$</Text>
                            <TextInput
                                value={price}
                                onChangeText={setPrice}
                                placeholder="0"
                                placeholderTextColor="#D1D5DB"
                                keyboardType="numeric"
                                className="flex-1 text-2xl font-extrabold text-gray-900"
                            />
                        </View>
                    </View>

                    {/* ── PHOTOS ── */}
                    <SectionLabel label="Photos (Min 1 required)" />
                    <View className="bg-white rounded-2xl p-4 shadow-sm">
                        <PhotoGrid photos={photos} onPick={handlePickPhoto} />
                    </View>

                    {/* ── ADDITIONAL DETAILS ── */}
                    <SectionLabel label="Additional Details" />
                    <TouchableOpacity
                        activeOpacity={0.9}
                        className="bg-white rounded-2xl px-4 py-4 shadow-sm"
                    >
                        <TextInput
                            value={details}
                            onChangeText={setDetails}
                            placeholder="Any additional details about the shoe? (tap to use)"
                            placeholderTextColor="#9CA3AF"
                            multiline
                            numberOfLines={3}
                            textAlignVertical="top"
                            className="text-sm text-gray-700 leading-5"
                            style={{ minHeight: 72 }}
                        />
                    </TouchableOpacity>

                    {/* ── VISIBLE TO STORES ── */}
                    <SectionLabel label="Visible to Stores" />
                    <View className="bg-white rounded-2xl px-4 py-4 shadow-sm gap-4">
                        {/* Toggle row */}
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center gap-2">
                                <Feather name="map-pin" size={15} color="#22C55E" />
                                <Text className="text-sm font-semibold text-gray-800">
                                    Visible to nearby stores
                                </Text>
                            </View>
                            <Switch
                                value={visible}
                                onValueChange={setVisible}
                                trackColor={{ false: '#E5E7EB', true: '#22C55E' }}
                                thumbColor="#ffffff"
                            />
                        </View>

                        {/* Radius options */}
                        {visible && (
                            <RadiusPicker selected={radius} onSelect={setRadius} />
                        )}
                    </View>
                </ScrollView>

                {/* Submit button — fixed at bottom */}
                <View
                    className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-3 bg-white border-t border-gray-100"
                >
                    <TouchableOpacity
                        onPress={handleSubmit}
                        activeOpacity={0.85}
                        disabled={!isValid}
                        className={`rounded-2xl py-4 items-center ${isValid ? 'bg-green-500' : 'bg-gray-200'
                            }`}
                    >
                        <Text
                            className={`text-base font-bold ${isValid ? 'text-white' : 'text-gray-400'
                                }`}
                        >
                            {submitted ? 'Submitted ✓' : 'Submit'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </BaseContainer>
    )
}

export default SellToStoreScreen