import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useSizeSelection } from '@/services/hooks/profilesetup/useSizeSelection'
import Button from '@/components/shared/Button'
import GenderTabBar from '@/components/profilesetup/GenderTabBar'
import SizeGrid from '@/components/profilesetup/SizeGrid'
import SelectedSizeChips from '@/components/profilesetup/SelectedSizeChips'
import CustomSizeModal from '@/components/profilesetup/CustomizedModal'
import BaseContainer from '@/components/shared/BaseContainer'

export default function SizeScreen() {
    const params = useLocalSearchParams<{ sizes?: string }>()

    const {
        activeTab,
        setActiveTab,
        currentConfig,
        currentSelected,
        selectSize,
        addCustomSize,
        handleContinue,
        allSelectedSizes,
        removeSelectedSize,
        setSelectedSizes, // make sure hook exposes this
        loading,
    } = useSizeSelection()

    const [modalVisible, setModalVisible] = useState(false)

    // Preselect sizes from params
    useEffect(() => {
        if (params.sizes) {
            const paramSizes = params.sizes.split(',')
      setSelectedSizes(paramSizes as any)
        }
    }, [params.sizes, setSelectedSizes])

    const onContinue = () => {
        if (params.sizes) {
            // Came from profile edit → save then go back
            handleContinue(() => router.back())
        } else {
            // Came from onboarding → go to next screen
            handleContinue(() => router.push('/profilesetup/clothingSizeScreen' as any))
        }
    }

    return (
        <BaseContainer backgroundColor="#fff" scrollable>
            <ScrollView
                style={styles.body}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.eyebrow}>Personalize</Text>
                <Text style={styles.heading}>What's your{'\n'}size?</Text>
                <Text style={styles.subheading}>
                    We'll show you only what fits. Set all your sizes below.
                </Text>

                <GenderTabBar activeTab={activeTab} onTabChange={setActiveTab} />

                <SizeGrid
                    unit={currentConfig.unit}
                    sizes={currentConfig.sizes}
                    selectedSize={currentSelected}
                    onSelectSize={selectSize}
                    onAddCustom={() => setModalVisible(true)}
                />

                <SelectedSizeChips
                    selectedSizes={allSelectedSizes}
                    onRemove={removeSelectedSize}
                />
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    text={loading ? 'Saving' : 'Continue'}
                    onPress={onContinue}
                    variant="solid"
                    backgroundColor="#000000"
                    height={56}
                    borderRadius={14}
                    fontSize={17}
                    fontWeight="700"
                    disabled={loading}
                    opacity={loading ? 0.7 : 1}
                    style={{ flex: 0, alignSelf: 'stretch' }}
                />
                {!params.sizes && (
                    <TouchableOpacity
                        style={styles.skipBtn}
                        onPress={() => router.push('/')}
                        activeOpacity={0.7}
                        disabled={loading}
                    >
                        <Text style={styles.skipBtnText}>Skip for now</Text>
                    </TouchableOpacity>
                )}
            </View>

            <CustomSizeModal
                visible={modalVisible}
                activeTab={activeTab}
                onConfirm={addCustomSize}
                onClose={() => setModalVisible(false)}
            />
        </BaseContainer>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    body: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 24,
    },
    eyebrow: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 2,
        color: '#22C55E',
        textTransform: 'uppercase',
        marginBottom: 6,
    },
    heading: {
        fontSize: 32,
        fontWeight: '900',
        color: '#111827',
        lineHeight: 38,
        marginBottom: 10,
    },
    subheading: {
        fontSize: 14,
        color: '#9CA3AF',
        lineHeight: 20,
        marginBottom: 24,
    },
    footer: {
        paddingHorizontal: 20,
        paddingBottom: 28,
        paddingTop: 12,
        gap: 10,
    },
    skipBtn: {
        alignItems: 'center',
        paddingVertical: 4,
    },
    skipBtnText: {
        fontSize: 13,
        color: '#9CA3AF',
        fontWeight: '500',
    },
})
