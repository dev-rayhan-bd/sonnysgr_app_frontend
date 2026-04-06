import React, { useCallback } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useVipStatus } from '@/services/hooks/profile/useVipStatus'
import VipMemberCard from '@/components/profile/vip/VipMemberCard'
import VipProgressBar from '@/components/profile/vip/VipProgressBar'
import VipEarnPoints from '@/components/profile/vip/VipEarnPoints'
import VipBenefits from '@/components/profile/vip/VipBenefits'
import VipJourney from '@/components/profile/vip/VipJourney'
import BaseContainer from '@/components/shared/BaseContainer'
const VipStatusScreen: React.FC = () => {
    const router = useRouter()
    const {
        profile,
        progressPercent,
        earnActions,
        benefits,
        tiers,
        currentTierConfig,
    } = useVipStatus()

    const handleBack = useCallback(() => {
        if (router.canGoBack()) router.back()
    }, [router])

    return (
        <BaseContainer backgroundColor='#fff'>
            {/* Fixed header */}
            <View className='flex-1 pt-10'>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={handleBack}
                        style={styles.backBtn}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Feather name="chevron-left" size={22} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>VIP Status</Text>
                    <View style={styles.backBtn} />
                </View>

                {/* Scrollable body */}
                <ScrollView
                    style={styles.scroll}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.content}
                >
                    <VipMemberCard profile={profile} tierConfig={currentTierConfig} />

                    <VipProgressBar profile={profile} progressPercent={progressPercent} />

                    <VipEarnPoints actions={earnActions} />

                    <VipBenefits benefits={benefits} currentTier={profile.tier} />

                    <VipJourney tiers={tiers} currentTier={profile.tier} />
                </ScrollView>
            </View>
        </BaseContainer >
    )
}

export default VipStatusScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#0A0A0A',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
    },
    backBtn: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#000',
        letterSpacing: -0.3,
    },
    scroll: {
        flex: 1,
    },
    content: {
        paddingTop: 20,
        flexGrow: 1,
    },
})