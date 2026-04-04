// app/screens/discover/setDropReminderScreen.tsx
import React, { useState, useCallback } from 'react'
import {
    View, Text, TouchableOpacity, Image,
    ScrollView, ActivityIndicator,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { useSetDropReminder } from '@/services/hooks/discover/useSetDropReminder'
import Toast from 'react-native-toast-message'
import BaseContainer from '@/components/shared/BaseContainer'
// ─── Mini calendar ────────────────────────────────────────────────────────────

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
]

function buildCalendarDays(year: number, month: number) {
    const firstDay = new Date(year, month, 1).getDay()
    const totalDays = new Date(year, month + 1, 0).getDate()
    const cells: (number | null)[] = Array(firstDay).fill(null)
    for (let d = 1; d <= totalDays; d++) cells.push(d)
    return cells
}

interface CalendarProps {
    selectedDate: string | null
    onSelect: (date: string) => void
}

const MiniCalendar: React.FC<CalendarProps> = ({ selectedDate, onSelect }) => {
    const today = new Date()
    const [year, setYear] = useState(today.getFullYear())
    const [month, setMonth] = useState(today.getMonth())

    const cells = buildCalendarDays(year, month)

    const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

    const prev = () => {
        if (month === 0) { setMonth(11); setYear(y => y - 1) }
        else setMonth(m => m - 1)
    }
    const next = () => {
        if (month === 11) { setMonth(0); setYear(y => y + 1) }
        else setMonth(m => m + 1)
    }

    const toKey = (d: number) =>
        `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

    const isPast = (d: number) => {
        const key = toKey(d)
        return key < todayKey
    }

    return (
        <View className="bg-white rounded-2xl p-4 shadow-sm mx-4 mt-4">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-4">
                <TouchableOpacity onPress={prev} className="p-1">
                    <Feather name="chevron-left" size={20} color="#374151" />
                </TouchableOpacity>
                <Text className="text-base font-bold text-gray-900">
                    {MONTH_NAMES[month]} {year}
                </Text>
                <TouchableOpacity onPress={next} className="p-1">
                    <Feather name="chevron-right" size={20} color="#374151" />
                </TouchableOpacity>
            </View>

            {/* Day labels */}
            <View className="flex-row mb-2">
                {DAYS.map(d => (
                    <Text key={d} className="flex-1 text-center text-[11px] font-semibold text-gray-400">
                        {d}
                    </Text>
                ))}
            </View>

            {/* Cells */}
            <View className="flex-row flex-wrap">
                {cells.map((day, idx) => {
                    if (!day) return <View key={`e-${idx}`} style={{ width: '14.28%' }} />
                    const key = toKey(day)
                    const isToday = key === todayKey
                    const isSel = key === selectedDate
                    const disabled = isPast(day)

                    return (
                        <TouchableOpacity
                            key={key}
                            onPress={() => !disabled && onSelect(key)}
                            disabled={disabled}
                            style={{ width: '14.28%' }}
                            className="items-center py-1"
                        >
                            <View
                                className={`w-8 h-8 rounded-full items-center justify-center
                  ${isSel ? 'bg-green-500' : ''}
                  ${isToday && !isSel ? 'border border-green-400' : ''}`}
                            >
                                <Text
                                    className={`text-sm font-medium
                    ${isSel ? 'text-white' : ''}
                    ${disabled ? 'text-gray-300' : !isSel ? 'text-gray-800' : ''}`}
                                >
                                    {day}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function SetDropReminderScreen() {
    const router = useRouter()
    const params = useLocalSearchParams<{ id: string; brand?: string; name?: string; dropTime?: string; imageUri?: string }>()

    const { selectedDate, loading, selectDate, setReminder } = useSetDropReminder()


    const handleSetReminder = async () => {
        const ok = await setReminder()

        if (ok) {
            Toast.show({
                type: 'success',
                text1: 'Reminder set!',
                text2: 'We’ll notify you before the drop.',
                position: 'top',
                visibilityTime: 2000,
                onHide: () => {
                    router.back()
                },
            })
        }
    }
    const formatDisplay = (key: string) => {
        const [y, m, d] = key.split('-')
        const date = new Date(+y, +m - 1, +d)
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    }

    return (
        <BaseContainer scrollable backgroundColor='#fff'>
            <View className='py-10'>
                <View className="flex-row items-center px-4 py-3 border-b border-gray-100 bg-white">
                    <TouchableOpacity onPress={() => router.back()} className="p-1 mr-3">
                        <Feather name="arrow-left" size={22} color="#111827" />
                    </TouchableOpacity>
                    <Text className="text-base font-bold text-gray-900">Set Drop Reminder</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
                    {/* Product card */}
                    <View className="mx-4 mt-4 bg-white rounded-2xl p-4 flex-row items-center gap-3 shadow-sm">
                        {params.imageUri ? (
                            <Image source={{ uri: params.imageUri }} className="w-16 h-16 rounded-xl bg-gray-100" resizeMode="cover" />
                        ) : (
                            <View className="w-16 h-16 rounded-xl bg-gray-100 items-center justify-center">
                                <Feather name="box" size={24} color="#9CA3AF" />
                            </View>
                        )}
                        <View className="flex-1">
                            {params.brand && (
                                <Text className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                                    {params.brand}
                                </Text>
                            )}
                            <Text className="text-sm font-bold text-gray-900 leading-snug">
                                {params.name ?? 'Upcoming Drop'}
                            </Text>
                            {params.dropTime && (
                                <View className="flex-row items-center gap-1 mt-1">
                                    <Feather name="clock" size={11} color="#22C55E" />
                                    <Text className="text-xs text-green-600 font-medium">{params.dropTime}</Text>
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Instruction */}
                    <Text className="mx-4 mt-5 mb-1 text-sm font-bold text-gray-700">
                        Choose reminder date
                    </Text>
                    <Text className="mx-4 text-xs text-gray-400 mb-1">
                        We'll notify you on the selected day before the drop.
                    </Text>

                    {/* Calendar */}
                    <MiniCalendar selectedDate={selectedDate} onSelect={selectDate} />

                    {/* Selected date pill */}
                    {selectedDate && (
                        <View className="mx-4 mt-3 flex-row items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-2.5">
                            <Feather name="calendar" size={14} color="#22C55E" />
                            <Text className="text-sm text-green-700 font-medium">{formatDisplay(selectedDate)}</Text>
                        </View>
                    )}
                </ScrollView>

                {/* CTA */}
                <View className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-3 bg-gray-50 border-t border-gray-100">
                    <TouchableOpacity
                        onPress={handleSetReminder}
                        disabled={!selectedDate || loading}
                        className={`rounded-2xl py-4 items-center justify-center flex-row gap-2
            ${selectedDate && !loading ? 'bg-green-500' : 'bg-gray-200'}`}
                        activeOpacity={0.85}
                    >
                        {loading
                            ? <ActivityIndicator color="#fff" size="small" />
                            : <>
                                <Feather name="bell" size={16} color={selectedDate ? '#fff' : '#9CA3AF'} />
                                <Text className={`text-sm font-bold ${selectedDate ? 'text-white' : 'text-gray-400'}`}>
                                    Set Reminder
                                </Text>
                            </>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </BaseContainer>
    )
}