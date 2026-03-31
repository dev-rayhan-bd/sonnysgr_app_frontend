// app/profilesetup/pickBrandsScreen.tsx
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native'
import { router } from 'expo-router'
import { usePickBrands } from '@/services/hooks/profilesetup/usePickBrands'
import BrandCard from '@/components/profilesetup/BrandCard'
import Button from '@/components/shared/Button'
import BaseContainer from '@/components/shared/BaseContainer'
const NUM_COLUMNS = 3

export default function PickBrandsScreen() {
    const {
        brands,
        selectedIds,
        search,
        setSearch,
        toggleBrand,
        handleContinue,
        loading,
        selectedCount,
    } = usePickBrands()

    const onContinue = () => {
        handleContinue(() => router.push('/tabs/discoverScreen'))
    }

    // Chunk brands into rows of 3
    const rows: typeof brands[] = []
    for (let i = 0; i < brands.length; i += NUM_COLUMNS) {
        rows.push(brands.slice(i, i + NUM_COLUMNS))
    }

    return (
        <BaseContainer backgroundColor="#fff" scrollable>
            <View className="flex-1 justify-center px-6 pt-20">
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.heading}>Pick your brands</Text>
                    <Text style={styles.subheading}>
                        See drops and restocks from the brands you actually wear.
                    </Text>
                </View>

                {/* Search + selected badge */}
                <View style={styles.searchRow}>
                    <View style={styles.searchBox}>
                        <Text style={styles.searchIcon}>🔍</Text>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search brands..."
                            placeholderTextColor="#9CA3AF"
                            value={search}
                            onChangeText={setSearch}
                            returnKeyType="search"
                        />
                    </View>
                    {selectedCount > 0 && (
                        <View style={styles.selectedBadge}>
                            <Text style={styles.selectedBadgeText}>{selectedCount} selected</Text>
                        </View>
                    )}
                </View>

                {/* Brand grid */}
                <View style={styles.grid}>
                    {rows.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.row}>
                            {row.map(brand => (
                                <BrandCard
                                    key={brand.id}
                                    brand={brand}
                                    selected={selectedIds.has(brand.id)}
                                    onPress={toggleBrand}
                                />
                            ))}
                            {/* Fill empty cells in last row */}
                            {row.length < NUM_COLUMNS &&
                                Array.from({ length: NUM_COLUMNS - row.length }).map((_, i) => (
                                    <View key={`empty-${i}`} style={styles.emptyCell} />
                                ))}
                        </View>
                    ))}

                    {/* More brands button */}
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.moreBrandsBtn} activeOpacity={0.7}>
                            <Text style={styles.moreBrandsIcon}>+</Text>
                            <Text style={styles.moreBrandsText}>More brands</Text>
                        </TouchableOpacity>
                        <View style={styles.emptyCell} />
                        <View style={styles.emptyCell} />
                    </View>
                </View>


                {/* Sticky footer */}
                <View style={styles.footer}>
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

                    <TouchableOpacity
                        style={styles.skipBtn}
                        onPress={() => router.push('/')}
                        activeOpacity={0.7}
                        disabled={loading}
                    >
                        <Text style={styles.skipText}>Skip for now</Text>
                    </TouchableOpacity>

                    <Text style={styles.hint}>
                        You can change this anytime in Settings
                    </Text>
                </View>
            </View>
        </BaseContainer>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 28,
        paddingBottom: 16,
    },

    // Header
    header: {
        marginBottom: 20,
    },
    heading: {
        fontSize: 28,
        fontWeight: '900',
        color: '#111827',
        marginBottom: 6,
    },
    subheading: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
    },

    // Search
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
    },
    searchBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 8,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    searchIcon: {
        fontSize: 14,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#111827',
        padding: 0,
    },
    selectedBadge: {
        backgroundColor: '#111827',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    selectedBadgeText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#FFFFFF',
    },

    // Grid
    grid: {
        gap: 10,
    },
    row: {
        flexDirection: 'row',
        gap: 10,
    },
    emptyCell: {
        flex: 1,
    },

    // More brands
    moreBrandsBtn: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 14,
        backgroundColor: '#F9FAFB',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
        borderStyle: 'dashed',
    },
    moreBrandsIcon: {
        fontSize: 22,
        color: '#6B7280',
        fontWeight: '300',
    },
    moreBrandsText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#6B7280',
        textAlign: 'center',
    },

    // Footer
    footer: {
        paddingHorizontal: 20,
        paddingBottom: 28,
        paddingTop: 12,
  
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        gap: 8,
    },
    skipBtn: {
        paddingVertical: 4,
    },
    skipText: {
        fontSize: 13,
        color: '#9CA3AF',
        fontWeight: '500',
    },
    hint: {
        fontSize: 11,
        color: '#D1D5DB',
        textAlign: 'center',
    },
})