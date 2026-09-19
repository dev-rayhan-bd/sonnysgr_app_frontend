import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Animated,
    Keyboard,
    ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const GREEN = '#22C55E';

interface DiscoverFilterProps<FilterCategory extends string> {
    filters: FilterCategory[];
    active: FilterCategory;
    onChange: (filter: FilterCategory) => void;
    greeting: string;
    userName: string;
    onCustomSize?: (size: string) => void;
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
    onCustomSize,
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
        Animated.spring(expandAnim, {
            toValue: 1,
            useNativeDriver: false,
        }).start(() => inputRef.current?.focus());
    };

    const closeCustomInput = () => {
        Keyboard.dismiss();
        Animated.timing(expandAnim, {
            toValue: 0,
            duration: 180,
            useNativeDriver: false,
        }).start(() => {
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

    const inputHeight = expandAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 80],
    });

    const inputOpacity = expandAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0, 1],
    });

    return (
        <View>

            {/* Greeting */}
            <View className=" px-5 pb-3">
                <Text className="text-base text-gray-500">
                    {greeting},{' '}
                    <Text className="text-gray-900 font-bold text-base">
                        {userName} 👋
                    </Text>
                </Text>
            </View>

            {/* Search bar — same style as Search tab, no filter button */}
            <View className="px-4 pb-3 bg-white">
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#F5F5F7',
                        borderRadius: 14,
                        paddingHorizontal: 14,
                        height: 52,
                        borderWidth: 1.5,
                        borderColor: searchValue.length > 0 ? GREEN : 'transparent',
                    }}
                >
                    <Feather
                        name="search"
                        size={20}
                        color="#8A8A9A"
                        style={{ marginRight: 10 }}
                    />
                    <TextInput
                        style={{
                            flex: 1,
                            color: '#0F0F0F',
                            fontSize: 16,
                            fontWeight: '400',
                            height: '100%',
                        }}
                        placeholder="Sneakers, clothing, brands, SKU..."
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
                        <TouchableOpacity
                            onPress={() => onSearchChange?.('')}
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                            <View
                                style={{
                                    width: 22,
                                    height: 22,
                                    borderRadius: 11,
                                    backgroundColor: '#C8C8D8',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Feather name="x" size={14} color="#fff" />
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Pills */}
            <View className="flex-row items-center bg-white">
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="flex-1"
                    contentContainerStyle={{
                        paddingRight: 24,
                        paddingVertical: 12,
                        gap: 10,
                        paddingLeft: 16,
                    }}
                >
                    {filters.map((f) => {
                        const isActive = f === active;
                        const isCustomOpen = f === ('Custom' as FilterCategory) && customExpanded;

                        return (
                            <TouchableOpacity
                                key={f}
                                onPress={() => handlePillPress(f)}
                                activeOpacity={0.8}
                                className={`px-4 py-2 rounded-full
                  ${isCustomOpen ? 'bg-gray-900'
                                        : isActive ? 'bg-green-600'
                                            : 'bg-gray-100'}
                `}
                            >
                                <Text
                                    className={`text-base font-semibold
                    ${isCustomOpen || isActive ? 'text-white' : 'text-gray-700'}
                  `}
                                >
                                    {f}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {/* Custom Input */}
            <Animated.View
                style={{ height: inputHeight, opacity: inputOpacity }}
                className="overflow-hidden px-4 bg-gray-50 border-t border-gray-200"
            >
                <View className="flex-row items-center gap-2 py-3">

                    <TextInput
                        ref={inputRef}
                        value={customValue}
                        onChangeText={(t) => {
                            setCustomValue(t);
                            if (customError) setCustomError('');
                        }}
                        placeholder="e.g. 10.5 or 11W"
                        placeholderTextColor="#9CA3AF"
                        returnKeyType="done"
                        onSubmitEditing={handleCustomConfirm}
                        className={`flex-1 h-11 px-3 rounded-xl text-base font-semibold bg-white border
              ${customError ? 'border-red-500' : 'border-gray-300'}
            `}
                    />

                    <TouchableOpacity
                        onPress={handleCustomConfirm}
                        className="h-11 px-5 rounded-xl bg-gray-900 justify-center items-center"
                    >
                        <Text className="text-white font-bold text-base">Add</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={closeCustomInput}
                        className="h-11 w-11 rounded-xl border border-gray-300 justify-center items-center bg-white"
                    >
                        <Text className="text-gray-500 text-base">✕</Text>
                    </TouchableOpacity>
                </View>

                {!!customError && (
                    <Text className="text-red-500 text-xs ml-1 -mt-1">{customError}</Text>
                )}
            </Animated.View>
        </View>
    );
};

export default DiscoverFilter;