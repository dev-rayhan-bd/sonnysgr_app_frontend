import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

interface AnalyticsHeaderProps {
    locationLabel?: string;
    brandLabel?: string;
    onLocationPress?: () => void;
    onBrandPress?: () => void;
    onCalendarPress?: () => void;
    onExportPress?: () => void;
}

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({
    locationLabel = 'All Locations',
    brandLabel = 'GoSNKR Sales',
    onLocationPress,
    onBrandPress,
    onCalendarPress,
    onExportPress,
}) => (
    <View style={s.wrapper}>
        <View style={s.header}>
            <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
                <Feather name="arrow-left" size={20} color="#111" />
            </TouchableOpacity>
            <Text style={s.title}>Retailer Analytics</Text>
            <View style={s.headerActions}>
                <TouchableOpacity onPress={onCalendarPress} hitSlop={8}>
                    <Feather name="calendar" size={19} color="#111" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onExportPress} hitSlop={8}>
                    <Feather name="share" size={19} color="#111" />
                </TouchableOpacity>
            </View>
        </View>

        <View style={s.dropdownRow}>
            <TouchableOpacity style={s.dropdown} onPress={onLocationPress} activeOpacity={0.7}>
                <Feather name="home" size={13} color="#6B7280" />
                <Text style={s.dropdownText} numberOfLines={1}>{locationLabel}</Text>
                <Feather name="chevron-down" size={14} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity style={s.dropdown} onPress={onBrandPress} activeOpacity={0.7}>
                <Text style={s.dropdownText} numberOfLines={1}>{brandLabel}</Text>
                <Feather name="chevron-down" size={14} color="#9CA3AF" />
            </TouchableOpacity>
        </View>
    </View>
);

const s = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        paddingBottom: 8,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 12,
        backgroundColor: '#fff',
    },
    backBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '800',
        color: '#111',
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        width: 60,
        justifyContent: 'flex-end',
    },
    dropdownRow: {
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 16,
    },
    dropdown: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#F3F4F6',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 38,
    },
    dropdownText: {
        flex: 1,
        fontSize: 12,
        fontWeight: '600',
        color: '#374151',
    },
});

export default AnalyticsHeader;