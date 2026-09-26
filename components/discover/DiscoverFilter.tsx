import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Animated,
    Keyboard,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const GREEN = '#22C55E';

export type FeedTab = 'For You' | 'Following';

interface DiscoverFilterProps<FilterCategory extends string> {
    filters: FilterCategory[];
    active: FilterCategory;
    onChange: (filter: FilterCategory) => void;
    greeting: string;
    userName: string;
    feedTab: FeedTab;
    onFeedTabChange: (tab: FeedTab) => void;
    mySizes?: string;
    onCustomSize?: (size: string) => void;
    onFiltersPress?: () => void;
    searchValue?: string;
    onSearchChange?: (text: string) => void;
    onSearchSubmit?: () => void;
}

const DiscoverFilter = <FilterCategory extends string>({
    filters,
    active,
    onChange,
    greeting,
    userName,
    feedTab,
    onFeedTabChange,
    mySizes = 'US 10, M',
    onCustomSize,
    onFiltersPress,
    searchValue = '',
    onSearchChange,
    onSearchSubmit,
}: DiscoverFilterProps<FilterCategory>) => {
    const [customExpanded, setCustomExpanded] = useState(false);
    const [customValue, setCustomValue] = useState('');
    const [customError, setCustomError] = useState('');
    const expandAnim = useRef(new Animated.Value(0)).current;
    const inputRef = useRef<TextInput>(null);

    const openCustomInput = () => {
        setCustomExpanded(true);
        setCustomError('');
        Animated.spring(expandAnim, { toValue: 1, useNativeDriver: false }).start(() => inputRef.current?.focus());
    };

    const closeCustomInput = () => {
        Keyboard.dismiss();
        Animated.timing(expandAnim, { toValue: 0, duration: 180, useNativeDriver: false }).start(() => {
            setCustomExpanded(false);
            setCustomValue('');
            setCustomError('');
        });
    };

    const handleCustomConfirm = () => {
        const trimmed = customValue.trim();
        if (!trimmed) {
            setCustomError('Enter a size');
            return;
        }
        onCustomSize?.(trimmed);
        onChange('Custom' as FilterCategory);
        closeCustomInput();
    };

    const handlePillPress = (f: FilterCategory) => {
        if (f === ('Custom' as FilterCategory)) {
            customExpanded ? closeCustomInput() : openCustomInput();
            return;
        }
        if (customExpanded) closeCustomInput();
        onChange(f);
    };

    const inputHeight = expandAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 80] });
    const inputOpacity = expandAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0, 1] });

    return (
        <View style={{ backgroundColor: '#fff' }}>
            {/* Greeting */}
            <View style={{ paddingHorizontal: 20, paddingTop: 4, paddingBottom: 10 }}>
                <Text style={{ fontSize: 17, color: '#111827' }}>
                    Hey <Text style={{ fontWeight: '700', color: '#111827' }}>{userName}</Text>
                    {' 👋'}
                </Text>
            </View>

            {/* For You / Following pill toggle */}
            <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: '#F3F4F6',
                        borderRadius: 24,
                        padding: 4,
                    }}
                >
                    {(['For You', 'Following'] as FeedTab[]).map((tab) => {
                        const isActive = tab === feedTab;
                        return (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => onFeedTabChange(tab)}
                                activeOpacity={0.8}
                                style={{
                                    flex: 1,
                                    paddingVertical: 10,
                                    borderRadius: 20,
                                    alignItems: 'center',
                                    backgroundColor: isActive ? '#111827' : 'transparent',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: '700',
                                        color: isActive ? '#fff' : '#6B7280',
                                    }}
                                >
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>

            {/* Search bar */}
            <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#F5F5F7',
                        borderRadius: 14,
                        paddingHorizontal: 14,
                        height: 46,
                        borderWidth: 1.5,
                        borderColor: searchValue.length > 0 ? GREEN : 'transparent',
                    }}
                >
                    <Feather name="search" size={18} color="#8A8A9A" style={{ marginRight: 10 }} />
                    <TextInput
                        style={{ flex: 1, color: '#0F0F0F', fontSize: 15, fontWeight: '400', height: '100%' }}
                        placeholder="Search sneakers, clothing, stores"
                        placeholderTextColor="#AFAFBF"
                        value={searchValue}
                        onChangeText={onSearchChange}
                        onSubmitEditing={onSearchSubmit}
                        returnKeyType="search"
                        cursorColor={GREEN}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    {searchValue.length > 0 && (
                        <TouchableOpacity onPress={() => onSearchChange?.('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                            <View
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 10,
                                    backgroundColor: '#C8C8D8',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Feather name="x" size={12} color="#fff" />
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Category pills: All / Sneakers / Clothing / Men / Women */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ flex: 1 }}
                    contentContainerStyle={{ paddingRight: 24, paddingBottom: 10, gap: 8, paddingLeft: 20 }}
                >
                    {filters.map((f) => {
                        const isActive = f === active;
                        const isCustomOpen = f === ('Custom' as FilterCategory) && customExpanded;

                        return (
                            <TouchableOpacity
                                key={f}
                                onPress={() => handlePillPress(f)}
                                activeOpacity={0.8}
                                style={{
                                    paddingHorizontal: 16,
                                    paddingVertical: 8,
                                    borderRadius: 20,
                                    backgroundColor: isCustomOpen ? '#111827' : isActive ? GREEN : '#F3F4F6',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: '600',
                                        color: isCustomOpen || isActive ? '#fff' : '#374151',
                                    }}
                                >
                                    {f}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {/* Custom size input */}
            <Animated.View
                style={{
                    height: inputHeight,
                    opacity: inputOpacity,
                    overflow: 'hidden',
                    paddingHorizontal: 20,
                    backgroundColor: '#F9FAFB',
                    borderTopWidth: customExpanded ? 1 : 0,
                    borderColor: '#E5E7EB',
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 12 }}>
                    <TextInput
                        ref={inputRef}
                        value={customValue}
                        onChangeText={(t) => { setCustomValue(t); if (customError) setCustomError(''); }}
                        placeholder="e.g. 10.5 or 11W"
                        placeholderTextColor="#9CA3AF"
                        returnKeyType="done"
                        onSubmitEditing={handleCustomConfirm}
                        style={{
                            flex: 1,
                            height: 44,
                            paddingHorizontal: 12,
                            borderRadius: 12,
                            fontSize: 15,
                            fontWeight: '600',
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            borderColor: customError ? '#EF4444' : '#D1D5DB',
                        }}
                    />
                    <TouchableOpacity
                        onPress={handleCustomConfirm}
                        style={{ height: 44, paddingHorizontal: 20, borderRadius: 12, backgroundColor: '#111827', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={closeCustomInput}
                        style={{ height: 44, width: 44, borderRadius: 12, borderWidth: 1, borderColor: '#D1D5DB', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}
                    >
                        <Text style={{ color: '#6B7280', fontSize: 15 }}>✕</Text>
                    </TouchableOpacity>
                </View>
                {!!customError && <Text style={{ color: '#EF4444', fontSize: 11, marginLeft: 4, marginTop: -6 }}>{customError}</Text>}
            </Animated.View>

            {/* My sizes + Filters row */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderTopWidth: 1,
                    borderTopColor: '#F3F4F6',
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Feather name="user" size={14} color="#6B7280" />
                    <Text style={{ fontSize: 13, color: '#6B7280', fontWeight: '500' }}>
                        My sizes: <Text style={{ fontWeight: '700', color: '#374151' }}>{mySizes}</Text>
                    </Text>
                </View>
                <TouchableOpacity onPress={onFiltersPress} activeOpacity={0.7} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Feather name="sliders" size={14} color={GREEN} />
                    <Text style={{ fontSize: 13, fontWeight: '700', color: GREEN }}>Filters</Text>
                    <Feather name="chevron-down" size={14} color={GREEN} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DiscoverFilter;